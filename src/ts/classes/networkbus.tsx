import 'whatwg-fetch';
import {Promise} from 'promise-polyfill';
if (!window['Promise']) window['Promise'] = Promise;

import {AllTrends, AllTrendsPacket} from '../types/alltrends';
import {Trend, TrendPacket} from '../types/trend';
import {Tweet, ContentTweetsPacket} from '../types/tweet';
import {Article, ContentArticlesPacket} from '../types/article';


const APIURL = 'http://neptune.gunshippenguin.com:8080';
const VERSION = 'v1';
export {APIURL, VERSION};

const endpoints = {
  alltrends: () => `${APIURL}/${VERSION}/alltrends`,
  trend: (name) => `${APIURL}/${VERSION}/trend/${name}`,
  trendTweets: (name, max_id, limit) => {
    limit = limit === undefined ? '' : `?limit=${limit}`;
    max_id = max_id === undefined ? '' : `&max_id=${max_id}`;
    return `${APIURL}/${VERSION}/trend/${name}/tweets${limit}${max_id}`;
  },
  trendArticles: (name, max_id, limit) => {
    limit = limit === undefined ? '' : `?limit=${limit}`;
    max_id = max_id === undefined ? '' : `&max_id=${max_id}`;
    return `${APIURL}/${VERSION}/trend/${name}/articles${limit}${max_id}`;
  }
};

/**
 * NetworkBus class handles all communications with the REST API.
 * @author Omar Chehab
 */
export class NetworkBus {

  /**
   * Requests and parses all trends from the REST API.
   * @author Omar Chehab
   */
  static fetchAllTrends(callback: (error, response: AllTrends) => void) {
    const endpoint = endpoints.alltrends();

    window['fetch'](endpoint)

      .then(handleJSON, error => callback(error, undefined))

      .then(function(response: AllTrendsPacket) {
        response = new AllTrends(response);

        callback(undefined, response);
      });
  }

  /**
   * Requests and parses a specific trend from the REST API.
   * @author Omar Chehab
   */
  static fetchTrend(callback: (error, response: Trend) => void,
    name: string) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trend(name);

    window['fetch'](endpoint)

      .then(handleJSON, error => callback(error, undefined))

      .then(function(response: TrendPacket) {
        response = new Trend(response);

        callback(undefined, response);
      });
  }

  /**
   * Requests and parses a specific trend's tweet feed
   * @author Omar Chehab
   */
  static fetchTrendTweets(callback: (error, response: Tweet[]) => void,
    name: string, max_id: string, limit: number) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trendTweets(name, max_id, limit);

    window['fetch'](endpoint)

      .then(handleJSON, error => callback(error, undefined))

      .then(function(response: ContentTweetsPacket) {
        const tweets = response.tweets
          .map(article => new Tweet(article));

        callback(undefined, tweets);
      });
  }

  /**
   * Requests and parses a specific trend's article feed
   * @author Omar Chehab
   */
  static fetchTrendArticles(callback: (error, response: Article[]) => void,
    name: string, max_id: string, limit: number) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trendArticles(name, max_id, limit);

    window['fetch'](endpoint)

      .then(handleJSON, error => callback(error, undefined))

      .then(function(response: ContentArticlesPacket) {
        const articles = response.articles
          .map(article => new Article(article));

        callback(undefined, articles);
      });
  }
}

function handleJSON(response) {
   return response.json();
}
