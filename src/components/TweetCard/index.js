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
      align: 'center',
    }
    
    window.twttr.widgets.createTweetEmbed(embed_id, this.div, options)
      .then(this.restyleTweet)
  }

  restyleTweet = () => {
    // TODO change margin to 0
    // HACK: Injects css into the shadowroot of the embed.
    const widgetCSS = `
      .EmbeddedTweet, .EmbeddedTweet-tweet {
        border: 0!important;
        border-radius: 2px!important;
      }
    `;
    var style = document.createElement("style");
    style.innerHTML = widgetCSS;
    style.type = "text/css"
    this.div.firstChild.shadowRoot.appendChild(style)
  }

  render () {
    return (
      <div className={s('card') + ' ' + s('card--responsive')} style={{ padding: 0 }}>
        <div ref={div => { this.div = div }}/>
      </div>
    )
  }
}
