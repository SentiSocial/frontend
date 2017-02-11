import {AllTrends, AllTrendsPacket} from '../types/alltrends';
import {Trend, TrendPacket} from '../types/trend';
import {Tweet, ContentTweetsPacket} from '../types/tweet';
import {Article, ContentArticlesPacket} from '../types/article';

export const APIURL = 'http://neptune.gunshippenguin.com:8080';
export const VERSION = 'v1';

const endpoints = {
  /* /alltrends */
  alltrends: () => `${APIURL}/${VERSION}/alltrends`,

  /* /trend/{string} */
  trend: (name: string) => `${APIURL}/${VERSION}/trend/${name}`,

  /* /trend/{string}/tweets?limit={number}&max_id={string} */
  trendTweets: (name: string, limit: number, max_id?: string) => {
    max_id = max_id === undefined ? '' : `&max_id=${max_id}`;
    return `${APIURL}/${VERSION}/trend/${name}/tweets?limit=${limit}${max_id}`;
  },

  /* /trend/{string}/articles?limit={number}&max_id={string} */
  trendArticles: (name: string, limit: number, max_id?: string) => {
    max_id = max_id === undefined ? '' : `&max_id=${max_id}`;
    return `${APIURL}/${VERSION}/trend/${name}/articles?limit=${limit}${max_id}`;
  }
};

/**
 * Handles communications with the SenitSocial REST API.
 *
 * Read about the API specification in the /api-doc.md file on the sentisocial
 * backend repository.
 *
 * All functions in this class require an internet connection, assuming there
 * is no network proxy.
 * @author Omar Chehab
 */
export class NetworkBus {
  protected fetch;

  /**
   * Pass window['fetch'] for use in production
   * @param {function} fetch dependency injection
   */
  constructor(fetch) {
    this.fetch = fetch;
  }

  /**
   * On success, releases the callback with an instance of {AllTrends} class.
   *
   * On failure, releases the callback with an error.
   * @callback fetchAllTrendsCallback
   * @param {(Error|undefined)}
   * @param {(AllTrends|undefined)}
   */

  /**
   * Requests /alltrends endpoint from the API.
   * @param {fetchAllTrendsCallback}
   */
  public fetchAllTrends(callback) {
    const endpoint = endpoints.alltrends();

    const json = handleJSON.bind({callback, endpoint});
    const error = handleError.bind({callback, endpoint});

    this.fetch(endpoint)

      .then(json, error)

      .then((response: AllTrendsPacket) => {
        response = new AllTrends(response);

        callback(undefined, response);
      }, handleError);
  }

  /**
   * On success, releases the callback with an instance of the {Trend} class.
   *
   * On failure, releases the callback with an error.
   * @callback fetchTrendCallback
   * @param {(Error|undefined)}
   * @param {(Trend|undefined)}
   */

  /**
   * Requests /trend/{name} endpoint from the API.
   * @param {fetchTrendCallback}
   * @param {string} name trend name from #fetchAllTrends reponse
   */
  public fetchTrend(callback, name) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trend(name);

    const json = handleJSON.bind({callback, endpoint});
    const error = handleError.bind({callback, endpoint});

    this.fetch(endpoint)

      .then(json, error)

      .then((response: TrendPacket) => {
        response = new Trend(response);

        callback(undefined, response);
      }, handleError);
  }

  /**
   * On success, releases the callback with an instance of the {Trend} class.
   *
   * On failure, releases the callback with an error.
   * @callback requestTrendTweets
   * @param {(Error|undefined)}
   * @param {(Tweet[]|undefined)}
   */

  /**
   * Requests /trend/{name}/tweets endpoint from the REST API.
   * @param {requestTrendTweets} callback
   * @param {string} name trend name from #fetchAllTrends reponse
   * @param {number} limit number of tweets to request from server
   * @param {(string|undefined)} max_id for pagination
   */
  public fetchTrendTweets(callback, name, limit, max_id) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trendTweets(name, limit, max_id);

    const json = handleJSON.bind({callback, endpoint});
    const error = handleError.bind({callback, endpoint});

    this.fetch(endpoint)

      .then(json, error)

      .then((response: ContentTweetsPacket) => {
        const tweets = response.tweets
          .map(article => new Tweet(article));

        callback(undefined, tweets);
      }, handleError);
  }

  /**
   * Releases the callback with an array of instances of the {Article} class.
   *
   * On failure, releases the callback with an error.
   * @callback fetchTrendArticlesCallback
   * @param {(Error|undefined)}
   * @param {(Article[]|undefined)}
   */

  /**
   * Requests /trend/{name}/articles endpoint from the REST API.
   * @param {fetchTrendArticlesCallback} callback
   * @param {string} name trend name from #fetchAllTrends reponse
   * @param {number} limit number of articles to request from server
   * @param {(string|undefined)} max_id for pagination
   */
  public fetchTrendArticles(callback, name, limit, max_id) {
    name = encodeURIComponent(name);
    const endpoint = endpoints.trendArticles(name, limit, max_id);

    const json = handleJSON.bind({callback, endpoint});
    const error = handleError.bind({callback, endpoint});

    this.fetch(endpoint)

      .then(json, error)

      .then((response: ContentArticlesPacket) => {
        const articles = response.articles
          .map(article => new Article(article));

        callback(undefined, articles);
      }, handleError);
  }
}

/**
 * Releases the callback with an error.
 * @param {Error} error
 */
function handleError(error) {
  this.callback(error, undefined);
}

/**
 * Calls response.json() on fetch response.
 *
 * On success, returns the parsed json as an array or object.
 *
 * On failure, returns false. Occurs if the response status is not OK.
 * @param {Response} response fetch response
 * @return {(object|array|boolean)}
 */
function handleJSON(response) {
  if (!response.ok) {
    const error = new ResponseError(this.endpoint, response.status);
    handleError.bind(this)(error);
    return false;
  }

  return response.json();
}

/**
 * Thrown when a NetworkBus fetch fails.
 * @author Omar Chehab
 */
export class ResponseError extends Error {
  public endpoint;
  public status;

  /**
   * @param {string} endpoint
   * @param {number} status HTTP response code (100-599)
   */
  constructor(endpoint, status) {
    const message = `NetworkBus fetch response status ${status}.
    Failed to fetch ${endpoint}.`;
    super(message);

    this.name = 'ResponseError';
    this.message = message;
    this.endpoint = endpoint;
    this.status = status;
  }

}