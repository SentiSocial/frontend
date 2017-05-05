import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Card from 'views/Card'
import Tweet from 'views/types/tweet.js'

export default class TweetCard extends Component {
  static propTypes = {
    tweet: PropTypes.instanceOf(Tweet).isRequired
  }

  constructor (props) {
    super(props)

    this.createTweetEmbed = this.createTweetEmbed.bind(this)
  }

  componentDidMount () {
    this.createTweetEmbed()
  }

  createTweetEmbed () {
    const embedId = this.props.tweet.embed_id
    const options = {
      align: 'center'
    }
    window.twttr.widgets.createTweetEmbed(embedId, this.div, options)
  }

  render () {
    return (
      <Card>
        <div ref={div => { this.div = div }} />
      </Card>
    )
  }
}
