/**
 * Promise polyfill
 */
import {Promise} from 'promise-polyfill';
if (!window['Promise']) window['Promise'] = Promise;
/**
 * Fetch polyfill
 */
import 'whatwg-fetch';

const DEBUG = false;
import {networkBusDebug} from './network-bus-debug';

import {AllTrends, AllTrendsPacket} from '../classes/alltrends';
import {Trend, TrendPacket} from '../classes/trend';
import {Content, ContentPacket} from '../classes/content';

const api = 'http://neptune.gunshippenguin.com:8080/v1';

const endpoints = {
  alltrends: () => `/alltrends`,
  alltrendsContent: page => `/alltrends/content?page=${page}`,
  trend: name => `/trend/${name}`,
  trendContent: (name, page) => `/trend/${name}/content?page=${page}`
};


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
  static fetchAllTrends(callback: (error, response: AllTrends) => void) {
    if (DEBUG) {
      callback(undefined, new AllTrends(networkBusDebug.fetchAllTrends));
      return;
    }
    const endpoint = endpoints.alltrends();
    const url = `${api}${endpoint}`;
    window['fetch'](url)
      .then(handleJSON,  error => callback(error, undefined))
      .then(function(response: AllTrendsPacket) {
        response = new AllTrends(response);
        callback(undefined, response);
      });
  }

  /**
   * Requests and parses the content from the REST API.
   * @author Omar Chehab
   */
  static fetchAllTrendsContent(callback: (error, response: Content) => void,
    page: number) {
      if (DEBUG) {
        callback(undefined, new Content(networkBusDebug.fetchAllTrendsContent));
        return;
      }
    const endpoint = endpoints.alltrendsContent(page);
    const url = `${api}${endpoint}`;
    window['fetch'](url)
      .then(handleJSON, error => callback(error, undefined))
      .then(function(response: ContentPacket) {
        response = new Content(response);
        callback(undefined, response);
      });
  }

  /**
   * Requests and parses the specific trends from the REST API.
   * @author Omar Chehab
   */
  static fetchTrend(callback: (error, response: Trend) => void,
    name: string) {
    if (DEBUG) {
      callback(undefined, new Trend(networkBusDebug.fetchTrend));
      return;
    }
    name = encodeURIComponent(name);
    const endpoint = endpoints.trend(name);
    const url = `${api}${endpoint}`;
    window['fetch'](url)
      .then(handleJSON, error => callback(error, undefined))
      .then(function(response: TrendPacket) {
        response = new Trend(response);
        callback(undefined, response);
      });
  }

  /**
   * Requests and parses the specific content from the REST API.
   * @author Omar Chehab
   */
  static fetchTrendContent(callback: (error, response: Content) => void,
    name: string, page: number) {
    if (DEBUG) {
      callback(undefined, new Content(networkBusDebug.fetchTrendContent));
      return;
    }
    name = encodeURIComponent(name);
    const endpoint = endpoints.trendContent(name, page);
    const url = `${api}${endpoint}`;
    window['fetch'](url)
      .then(handleJSON, error => callback(error, undefined))
      .then(function(response: ContentPacket) {
        response = new Content(response);
        callback(undefined, response);
      });
  }
}
