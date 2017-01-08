import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TweetEmbed from 'react-tweet-embed';

import {Tweet} from './tweet';

interface TweetComponentProps {
  tweet: Tweet;
};

export class TweetComponent extends
  React.Component<TweetComponentProps, undefined> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card col-xs-12">
        <TweetEmbed id={`${this.props.tweet.id}`} />
      </div>
    );
  }
}
