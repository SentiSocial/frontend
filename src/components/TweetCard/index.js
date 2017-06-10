import {h, Component} from 'preact'
import style from './style.scss'
const s = name => style[name] || name

export default class TweetCard extends Component {
  componentDidMount () {
    this.createTweetEmbed()
  }

  createTweetEmbed = () => {
    const {
      embed_id
    } = this.props
    const options = {
      align: 'center'
    }
    window.twttr.widgets.createTweetEmbed(embed_id, this.div, options)
  }

  render () {
    return (
      <div className={s('card')}>
        <div ref={div => { this.div = div }}/>
      </div>
    )
  }
}
