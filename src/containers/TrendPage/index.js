import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import style from './style.scss'
const s = name => style[name] || name
import KeywordCloud from '../../components/KeywordCloud'
import ArticleCard from '../../components/ArticleCard'
import TweetCard from '../../components/TweetCard'
import RelativeTime from '../../components/RelativeTime'
import { fetchTrend } from '../../actions.js'

class TrendPage extends Component {
  componentDidMount () {
    this.fetchData()
    setInterval(this.fetchData.bind(this), 60000)
  }

  fetchData() {
    const {
      name,
      fetchTrend,
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
      articles,
      tweets,
      keywords
    } = trend

    const sentiment_class = sentiment_score > 0.25
      ? 'positive'
      : (
        sentiment_score < 0.25
        ? 'negative'
        : 'neutral'
      )

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
          <div className={s('trendpage--wordcloud')}>
            <KeywordCloud
              id="worldcloud"
              keywords={keywords.map(keyword => ({
                text: keyword.word,
                size: 10 + keyword.occurences,
              }))}
            />
          </div>
        </div>

        <div className={s('trendpage--cardlayout')}>
          {articles.map(article => <ArticleCard {...article} />)}
        </div>

        <div className={s('card')}>
          <h2 className={s('trendpage--heading')}>
            People are feeling
          </h2>
          <p className={s('trendpage--sentiment') + ' ' + s('trendpage--' + sentiment_class)}>
            {sentiment_description}
          </p>
          <p className={s('trendpage--sentiment-number')}>{sentiment_score}</p>
        </div>

        <div className={s('trendpage--cardlayout')}>
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
