import {moment} from '../classes/helpers';

export interface ContentArticlesPacket {
  articles: ArticlePacket[];
}

export interface ArticlePacket {
   _id: string;
   title: string;
   source: string;
   timestamp: number; // unix
   link: string; // url
   media?: string; // url
   description: string;
};

/**
 * News is an implementation of the news packet received from the endpoint.
 * This class is used solely for the purpose of encapsulating the operations
 * on the data.
 * @author Omar Chehab
 */
export class Article implements ArticlePacket {
  _id: string;
  title: string;
  link: string;
  timestamp: number; // unix
  source: string; // url
  media?: string; // url
  description: string;
  type: string;

  /**
   * @author Omar Chehab
   */
  constructor(packet: ArticlePacket) {
    this._id = packet._id;
    this.title = packet.title;
    this.link = packet.link;
    this.timestamp = moment(packet.timestamp * 1000).fromNow();
    this.source = packet.source;
    this.media = packet.media;
    this.description = packet.description;
    this.type = 'Article';
  }
}
