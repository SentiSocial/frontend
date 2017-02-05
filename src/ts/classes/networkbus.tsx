import {AllTrends, AllTrendsPacket} from '../types/alltrends';
import {Trend, TrendPacket} from '../types/trend';
import {Tweet, ContentTweetsPacket} from '../types/tweet';
import {Article, ContentArticlesPacket} from '../types/article';


const APIURL = 'http://neptune.gunshippenguin.com:8080';
const VERSION = 'v1';
export {APIURL, VERSION};

const endpoints = {
  alltrends: () => `${APIURL}/${VERSION}/alltrends`,
  trend: (name: string) => `${APIURL}/${VERSION}/trend/${name}`,
  trendTweets: (name: string, limit: number, max_id?: string) => {
    max_id = max_id === undefined ? '' : `&max_id=${max_id}`;
    return `${APIURL}/${VERSION}/trend/${name}/tweets?limit=${limit}${max_id}`;
  },
  trendArticles: (name: string, limit: number, max_id?: string) => {
    max_id = max_id === undefined ? '' : `&max_id=${max_id}`;
    return `${APIURL}/${VERSION}/trend/${name}/articles?limit=${limit}${max_id}`;
  }
};

/**
 * NetworkBus class handles all communications with the REST API.
 * @author Omar Chehab
 */
export class NetworkBus {
  fetch;

  /**
   * Pass window['fetch'] for use in production
   * @param {function} fetch dependency injection
   * @author Omar Chehab
   */
  constructor(fetch) {
    this.fetch = fetch;
  }

  /**
   * Requests and parses all trends from the REST API.
   * @param {function} callback (error, response) => void
   * @author Omar Chehab
   */
  fetchAllTrends(callback: (error, response: AllTrends) => void) {
    const endpoint = endpoints.alltrends();

    this.fetch(endpoint)

      .then(handleJSON, error => callback(error, undefined))

      .then(function(response: AllTrendsPacket) {
        response = new AllTrends(response);

        callback(undefined, response);
      });
  }

  /**
   * Requests and parses a specific trend from the REST API.
   * @param {function} callback (error, response) => void
   * @param {string} name trend name from #fetchAllTrends reponse
   * @author Omar Chehab
   */
  fetchTrend(callback: (error, response: Trend) => void,
    name: string) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trend(name);

    this.fetch(endpoint)

      .then(handleJSON, error => callback(error, undefined))

      .then(function(response: TrendPacket) {
        response = new Trend(response);

        callback(undefined, response);
      });
  }

  /**
   * Requests and parses a specific trend's tweet feed
   * @param {function} callback (error, response) => void
   * @param {string} name trend name from #fetchAllTrends reponse
   * @param {number} limit number of tweets to request from server
   * @author Omar Chehab
   */
  fetchTrendTweets(callback: (error, response: Tweet[]) => void,
    name: string, limit: number, max_id?: string) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trendTweets(name, limit, max_id);

    this.fetch(endpoint)

      .then(handleJSON, error => callback(error, undefined))

      .then(function(response: ContentTweetsPacket) {
        const tweets = response.tweets
          .map(article => new Tweet(article));

        callback(undefined, tweets);
      });
  }

  /**
   * Requests and parses a specific trend's article feed
   * @param {function} callback (error, response) => void
   * @param {string} name trend name from #fetchAllTrends reponse
   * @param {number} limit number of articles to request from server
   * @author Omar Chehab
   */
  fetchTrendArticles(callback: (error, response: Article[]) => void,
    name: string, limit: number, max_id?: string) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trendArticles(name, limit, max_id);

    this.fetch(endpoint)

      .then(handleJSON, error => callback(error, undefined))

      .then(function(response: ContentArticlesPacket) {
        const articles = response.articles
          .map(article => new Article(article));

        callback(undefined, articles);
      });
  }
}

/**
 * Calls response.json() on fetch response.
 * @param  {Response} response see fetch docs
 * @return {object}
 * @author Omar Chehab
 */
function handleJSON(response) {
   return response.json();
}
