import {News, NewsPacket} from './news';
import {Tweet, TweetPacket} from './tweet';

export interface ContentPacket {
  news: NewsPacket[];
  tweets: TweetPacket[];
  remaining: number;
};

/**
 * SpecificContent is an implementation of the specific content packet received
 * from the endpoint. This class is used solely for the purpose of encapsulating
 * the operations on the data.
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
    this.news = packet.news.map(news => new News(news));
    this.tweets = packet.tweets.map(tweet => new Tweet(tweet));
    this.remaining = packet.remaining;
  }
}
