import {News} from './news';
import {Tweet} from './tweet';

export interface ContentPacket {
  news: NewsPacket[];
  tweets: TweetPacket[];
  remaining: number;
};

/**
 * Content is an implementation of the content packet received from the endpoint.
 * This class is used solely for the purpose of encapsulating the operations
 * on the data.
 * @author Omar Chehab
 */
export class Content implements ContentPacket {
  news: News[];
  tweets: Tweet[];
  remaining: number;

  /**
   * @author Omar Chehab
   */
  constructor(packet: ContentPacket) {
    this.news = packet.news;
    this.tweets = packet.tweets;
    this.remaining = packet.remaining;
  }
}
