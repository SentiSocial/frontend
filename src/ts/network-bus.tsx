import {Promise} from 'promise-polyfill';
if (!window['Promise']) window['Promise'] = Promise;
import 'whatwg-fetch';

import {Trends} from './trends';
import {Content} from './content';
import {SpecificTrends} from './specific-trends';
import {SpecificContent} from './specific-content';

import {News} from './news';
import {Tweet} from './tweet';

const APIURL = 'http://neptune.gunshippenguin.com:8080/v1';
const ENDPOINTS = {
  trends: '/trends',
  specificTrends: '/trends/{id}',
  content: '/content?page={page}',
  specificContent: '/content/{id}?page={page}'
};

/**
 * NetworkBus class handles all communications with the REST API.
 * @author Omar Chehab
 */
export class NetworkBus {

  /**
   * Requests and parses the trends from the REST API.
   * @author Omar Chehab
   */
  static getTrends(callback: (error, response: Trends) => void) {
    const endpoint = ENDPOINTS.trends;
    const url = `${APIURL}${endpoint}`;
    window['fetch'](url)
      .then(function(response) {
        return response.json();
      }, function(error) {
        callback(error, undefined);
      })
      .then(function(response) {
        response = new Trends(response);
        callback(undefined, response);
      });
      console.log('getTrends', url);
  }

  /**
   * Requests and parses the content from the REST API.
   * @author Omar Chehab
   */
  static getContent(callback: (error, response: Content) => void,
    page: number) {
    const endpoint = ENDPOINTS.content
      .replace(/{page}/, `${page}`);
    const url = `${APIURL}${endpoint}`;
    window['fetch'](url)
      .then(function(response) {
        return response.json();
      }, function(error) {
        callback(error, undefined);
      })
      .then(function(response: ContentPacket) {
        response.news = response.news.map(news => new News(news));
        response.tweets = response.tweets.map(tweet => new Tweet(tweet));
        response = new Content(response);
        callback(undefined, response);
      });
      console.log('getContent', url);
  }

  /**
   * Requests and parses the specific trends from the REST API.
   * @author Omar Chehab
   */
  static getSpecificTrends(callback: (error, response: SpecificTrends) => void,
    id: number) {
    const endpoint = ENDPOINTS.specificTrends
      .replace(/{id}/, `${id}`);
    const url = `${APIURL}${endpoint}`;
    window['fetch'](url)
      .then(function(response) {
        return response.json();
      }, function(error) {
        callback(error, undefined);
      })
      .then(function(response) {
        response = new SpecificTrends(response);
        callback(undefined, response);
      });
      console.log('getSpecificTrends', url);
  }

  /**
   * Requests and parses the specific content from the REST API.
   * @author Omar Chehab
   */
  static getSpecificContent(callback: (error, response: SpecificContent) => void,
    id: number, page: number) {
    const endpoint = ENDPOINTS.specificContent
      .replace(/{id}/, `${id}`)
      .replace(/{page}/, `${page}`);
    const url = `${APIURL}${endpoint}`;
    window['fetch'](url)
      .then(function(response) {
        return response.json();
      }, function(error) {
        callback(error, undefined);
      })
      .then(function(response) {
        response.news = response.news.map(news => new News(news));
        response.tweets = response.tweets.map(tweet => new Tweet(tweet));
        response = new SpecificContent(response);
        callback(undefined, response);
      });
      console.log('getSpecificContent', url);
  }
}

// Endpoint Interfaces

export interface TrendsPacket {
  trends: TrendPacket[]
};

export interface ContentPacket {
  news: NewsPacket[];
  tweets: TweetPacket[];
  remaining: number;
};

export interface SpecificTrendsPacket {
  name: string;
  history: {
    start: number;
    end: number;
    data: SpecificTrendsDataPacket[];
  }
};

export interface SpecificContentPacket {
  news: NewsPacket[];
  tweets: TweetPacket[];
  remaining: number;
};

// Interfaces used by Endpoint Interfaces

export interface TrendPacket {
  id: number;
  name: string;
  sentiment: number;
}

export interface SpecificTrendsDataPacket {
  sentiment: number;
  volume: number;
};

export interface NewsPacket {
  title: string;
  source: string;
  timestamp: number; // unix
  link: string; // url
  media?: string; // url
  description: string;
};

export interface TweetPacket {
  id: number;
};
