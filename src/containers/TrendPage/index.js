import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import style from './style.scss'
const s = name => style[name] || name

import ArticleCard from '../../components/ArticleCard'
import TweetCard from '../../components/TweetCard'
import RelativeTime from '../../components/RelativeTime'
import { fetchTrend } from '../../actions.js'

class TrendPage extends Component {
  componentDidMount () {
    const {
      name,
      fetchTrend
    } = this.props
    fetchTrend(name)
  }

  render () {
    const { trend } = this.props
    if (!trend) {
      return null
    }

    const {
      name,
      locations,
      tracking_since,
      sentiment_description,
      sentiment_score,
      keywords,
      articles,
      tweets
    } = trend

    let largestOccurences
    if (keywords.length) {
      largestOccurences = keywords[0].occurences
    }
    return (
      <div className={s('trendpage')}>
        <div className={s('card')}>
          <div>
            <h1 style={{display: 'inline-block'}}>
              {name}
            </h1>
            <span style={{float: 'right'}}>
              <RelativeTime value={tracking_since} />
            </span>
          </div>
          {locations.map(country =>
            <img src={`/assets/graphics/flags/${country}.png`}
              style={{display: 'inline-block'}}
            />
          )}
        </div>

        <div className={s('card')}>
          <h2 className={s('trendpage--heading')}>
            People are saying
          </h2>
          <div style={{
            textAlign: 'center',
            lineHeight: 1,
            width: 334,
            maxWidth: '100%',
            margin: 'auto'
          }}>
            {keywords.map(keyword =>
              <span style={{
                fontSize: Math.max(Math.round((keyword.occurences / largestOccurences) * 32), 8)
              }}>
                {` ${keyword.word} `}
              </span>
            )}
          </div>
        </div>

        <div className={s('trendpage--responsive-cards')}>
          {articles.map(article => <ArticleCard {...article} />)}
        </div>

        <div className={s('card')}>
          <h2 className={s('trendpage--heading')}>
            People are feeling
          </h2>
          <p>{sentiment_score}</p>
          <p>{sentiment_description}</p>
        </div>
        
        <div className={s('trendpage--responsive-cards')}>
          {tweets.map(tweet => <TweetCard {...tweet} />)}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    trend: state.trend
  }),
  dispatch => ({
    fetchTrend: trendName => dispatch(fetchTrend(trendName))
  })
)(TrendPage)
