import * as React from 'react'

import Card from 'views/components/cards/card.js'
import Tweet from 'views/types/tweet.js'

export default class TweetCard extends React.Component {
  constructor (props) {
    super(props)

    this.createTweetEmbed = this.createTweetEmbed.bind(this)
  }

  componentDidMount () {
    this.createTweetEmbed()
  }

  createTweetEmbed () {
    const embed_id = this.props.tweet.embed_id
    const options = {
      align: 'center'
    }
    window.twttr.widgets.createTweetEmbed(embed_id, this.div, options)
  }

  render () {
    return (
      <Card>
        <div ref={div => this.div = div} />
      </Card>
    )
  }
}

TweetCard.propTypes = {
  tweet: React.PropTypes.instanceOf(Tweet).isRequired
}
