import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TweetEmbed from 'react-tweet-embed';

/**
 * Tweet is an implementation of the tweet packet received from the endpoint.
 * This class is used solely for the purpose of encapsulating the operations
 * on the data.
 * @author Omar Chehab
 */
export class Tweet implements TweetPacket {
  id: string;

  /**
   * @author Omar Chehab
   */
  constructor(packet: TweetPacket) {
    this.id = packet.id;
  }
}

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
