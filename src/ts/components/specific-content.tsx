import {SpecificContentPacket} from './network-bus';

import {News} from './news';
import {Tweet} from './tweet';

export interface SpecificContentPacket {
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
export class SpecificContent implements SpecificContentPacket {
  news: News[];
  tweets: Tweet[];
  remaining: number;

  /**
   * @author Omar Chehab
   */
  constructor(packet: SpecificContentPacket) {
    this.news = packet.news;
    this.tweets = packet.tweets;
    this.remaining = packet.remaining;
  }
}
