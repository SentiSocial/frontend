/*
interface ContentTweetsPacket {
  tweets: TweetPacket[];
}

interface TweetPacket {
  _id: string;
  embed_id: string;
}; */

/**
 * Tweet is an implementation of the tweet packet received from the endpoint.
 *
 * _id: string;
 * embed_id: string;
 * type: string;
 */
export default class Tweet {
  constructor (packet) {
    this._id = packet._id
    this.embed_id = packet.embed_id
    this.type = 'Tweet'
  }
}
