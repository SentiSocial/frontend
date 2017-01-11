import {Promise} from 'promise-polyfill';
import 'whatwg-fetch';

import {networkBusDebug, DEBUG} from './network-bus-debug';

import {Trends} from './trends';
import {Content} from './content';
import {SpecificTrends} from './specific-trends';
import {SpecificContent} from './specific-content';

import {News} from './components/news';
import {Tweet} from './components/tweet';

const api = 'http://neptune.gunshippenguin.com:8080/v1';

const endpoints = {
  alltrends: () => `/alltrends`,
  trend: name => `/trend/${name}`,
  alltrendsContent: page => `/alltrends/content?page=${page}`,
  trendContent: (name, page) => `/trend/${name}/content?page=${page}`
};

if (!window['Promise']) window['Promise'] = Promise;

function handleJSON(response) {
   return response.json();
}

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
    if (DEBUG) {
      callback(null, networkBusDebug.getTrends);
      return;
    }
    const endpoint = endpoints.alltrends();
    const url = `${api}${endpoint}`;
    window['fetch'](url)
      .then(handleJSON,  error => callback(error, undefined))
      .then(function(response) {
        response = new Trends(response);
        callback(undefined, response);
      });
  }

  /**
   * Requests and parses the content from the REST API.
   * @author Omar Chehab
   */
  static getContent(callback: (error, response: Content) => void,
    page: number) {
      if (DEBUG) {
        callback(null, networkBusDebug.getContent);
        return;
      }
    const endpoint = endpoints.alltrendsContent(page);
    const url = `${api}${endpoint}`;
    window['fetch'](url)
      .then(handleJSON, error => callback(error, undefined))
      .then(function(response: ContentPacket) {
        response.news = response.news.map(news => new News(news));
        response.tweets = response.tweets.map(tweet => new Tweet(tweet));
        response = new Content(response);
        callback(undefined, response);
      });
  }

  /**
   * Requests and parses the specific trends from the REST API.
   * @author Omar Chehab
   */
  static getSpecificTrends(callback: (error, response: SpecificTrends) => void,
    name: string) {
    if (DEBUG) {
      callback(null, networkBusDebug.getSpecificTrends);
      return;
    }
    name = encodeURIComponent(name);
    const endpoint = endpoints.trend(name);
    const url = `${api}${endpoint}`;
    console.log(url);
    window['fetch'](url)
      .then(handleJSON, error => callback(error, undefined))
      .then(function(response) {
        response = new SpecificTrends(response);
        callback(undefined, response);
      });
  }

  /**
   * Requests and parses the specific content from the REST API.
   * @author Omar Chehab
   */
  static getSpecificContent(callback: (error, response: SpecificContent) => void,
    name: string, page: number) {
    if (DEBUG) {
      callback(null, networkBusDebug.getSpecificContent);
      return;
    }
    name = encodeURIComponent(name);
    const endpoint = endpoints.trendContent(name, page);
    const url = `${api}${endpoint}`;
    window['fetch'](url)
      .then(handleJSON, error => callback(error, undefined))
      .then(function(response) {
        response.news = response.news.map(news => new News(news));
        response.tweets = response.tweets.map(tweet => new Tweet(tweet));
        response = new SpecificContent(response);
        callback(undefined, response);
      });
  }
}