import * as React from 'react'
import './tweet.scss'

import TweetEmbed from 'react-tweet-embed'

import Card from 'views/components/cards/card.js'
import Tweet from 'views/types/tweet.js'

export default function TweetCard (props) {
  return (
    <Card>
      <TweetEmbed id={`${props.tweet.embed_id}`}/>
    </Card>
  )
}

TweetCard.propTypes = {
  tweet: React.PropTypes.instanceOf(Tweet).isRequired
}
