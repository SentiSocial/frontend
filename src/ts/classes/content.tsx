import {Article, ArticlePacket} from './article';
import {Tweet, TweetPacket} from './tweet';

export interface TrendTweetsPacket {
  tweets: TweetPacket[];
};

export interface TrendArticlesPacket {
  articles: ArticlePacket[];
};


/**
 * SpecificContent is an implementation of the specific content packet received
 * from the endpoint. This class is used solely for the purpose of encapsulating
 * the operations on the data.
 * @author Omar Chehab
 */
export class Content implements TrendTweetsPacket, TrendArticlesPacket {
  articles: Article[];
  tweets: Tweet[];

  /**
   * @author Omar Chehab
   */
  constructor(packet: TrendTweetsPacket&TrendArticlesPacket) {
    this.articles = packet.articles.map(news => new Article(article));
    this.tweets = packet.tweets.map(tweet => new Tweet(tweet));
  }
}
