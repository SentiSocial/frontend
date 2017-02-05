export interface ContentTweetsPacket {
  tweets: TweetPacket[];
}

export interface TweetPacket {
  _id: string;
  embed_id: string;
};

/**
 * Tweet is an implementation of the tweet packet received from the endpoint.
 * This class is used solely for the purpose of encapsulating the operations
 * on the data.
 * @author Omar Chehab
 */
export class Tweet implements TweetPacket {
  _id: string;
  embed_id: string;
  type: string;

  /**
   * @author Omar Chehab
   */
  constructor(packet: TweetPacket) {
    this._id = packet._id;
    this.embed_id = packet.embed_id;
    this.type = 'Tweet';
  }
}
