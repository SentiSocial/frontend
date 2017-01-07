import {Promise} from 'promise-polyfill';
import {fetch} from 'whatwg-fetch';

import {News} from './news';
import {Tweet} from './tweet';

const APIURL = 'https://rhysre.net/v1';
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
  static getTrends(callback: (response: TrendsPacket) => void) {
    const endpoint = ENDPOINTS.trends;
    const url = `${APIURL}${endpoint}`;
    console.log('getTrends', url);
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        callback(response);
      });
  }

  /**
   * Requests and parses the specific trends from the REST API.
   * @author Omar Chehab
   */
  static getSpecificTrends(callback: (response: SpecificTrendsPacket) => void,
    id: number) {
    const endpoint = ENDPOINTS.specificTrends
      .replace(/{id}/, `${id}`);
    const url = `${APIURL}${endpoint}`;
    console.log('getSpecificTrends', url);
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        callback(response);
      });
  }

  /**
   * Requests and parses the content from the REST API.
   * @author Omar Chehab
   */
  static getContent(callback: (response: ContentPacket) => void,
    page: number) {
    const endpoint = ENDPOINTS.content
      .replace(/{page}/, `${page}`);
    const url = `${APIURL}${endpoint}`;
    console.log('getContent', url);
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(response: ContentPacket) {
        response.news = response.news.map(news => new News(news));
        response.tweets = response.tweets.map(tweet => new Tweet(tweet));
        callback(response);
      });
  }

  /**
   * Requests and parses the specific content from the REST API.
   * @author Omar Chehab
   */
  static getSpecificContent(callback: (response: SpecificContentPacket) => void,
    id: number, page: number) {
    const endpoint = ENDPOINTS.specificContent
      .replace(/{id}/, `${id}`)
      .replace(/{page}/, `${page}`);
    const url = `${APIURL}${endpoint}`;
    console.log('getSpecificContent', url);
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        response.news = response.news.map(news => new News(news));
        response.tweets = response.tweets.map(tweet => new Tweet(tweet));
        callback(response);
      });
  }
}

// Endpoint Interfaces

export interface TrendsPacket {
  id: number;
  name: string;
  sentiment: number;
};

export interface SpecificTrendsPacket {
  name: string;
  history: {
    start: number;
    end: number;
    data: SpecificTrendsDataPacket[];
  }
};

export interface ContentPacket {
  news: NewsPacket[];
  tweets: TweetPacket[];
  remaining: number;
};

export interface SpecificContentPacket {
  news: NewsPacket[];
  tweets: TweetPacket[];
  remaining: number;
};

// Interfaces used by Endpoint Interfaces

export interface SpecificTrendsDataPacket {
  sentiment: number;
  volume: number;
};

export interface NewsPacket {
  title: string;
  timestamp: number; // unix
  source: string; // url
  media?: string; // url
  description: string;
};

export interface TweetPacket {
  id: number;
};
