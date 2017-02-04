import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TweetEmbed from 'react-tweet-embed';

import {Card} from './card';
import {Tweet} from '../../classes/tweet';

interface TweetCardProps {
  tweet: Tweet;
};

export class TweetCard extends
  React.Component<TweetCardProps, undefined> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <TweetEmbed id={`${this.props.tweet.embed_id}`} />
      </Card>
    );
  }
}
