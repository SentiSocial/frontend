import AllTrends from 'views/types/alltrends.js'
import Trend from 'views/types/trend.js'
import Tweet from 'views/types/tweet.js'
import Article from 'views/types/article.js'

export const APIURL = 'http://senti.social:8080'
export const VERSION = 'v1'

const endpoints = {
  /* /alltrends */
  alltrends: () => `${APIURL}/${VERSION}/alltrends`,

  /* /trend/{string} */
  trend: name => `${APIURL}/${VERSION}/trend/${name}`,

  /* /trend/{string}/tweets?limit={number}&max_id={string} */
  trendTweets: (name, limit, maxId) => {
    maxId = maxId === undefined ? '' : `&max_id=${maxId}`
    return `${APIURL}/${VERSION}/trend/${name}/tweets?limit=${limit}${maxId}`
  },

  /* /trend/{string}/articles?limit={number}&max_id={string} */
  trendArticles: (name, limit, maxId) => {
    maxId = maxId === undefined ? '' : `&max_id=${maxId}`
    return `${APIURL}/${VERSION}/trend/${name}/articles?limit=${limit}${maxId}`
  }
}

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
export default class NetworkBus {
  /**
   * Pass window['fetch'] for use in production
   *
   * fetch;
   *
   * @param {function} fetch dependency injection
   */
  constructor (fetch) {
    this.fetch = fetch

    this.fetchAllTrends = this.fetchAllTrends.bind(this)
    this.fetchTrend = this.fetchTrend.bind(this)
    this.fetchTrendTweets = this.fetchTrendTweets.bind(this)
    this.fetchTrendArticles = this.fetchTrendArticles.bind(this)
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
  fetchAllTrends (callback) {
    const endpoint = endpoints.alltrends()

    const json = handleJSON.bind(null, callback, endpoint)
    const error = handleError.bind(null, callback)

    this.fetch(endpoint)

      .then(json, error)

      .then(response => {
        response = new AllTrends(response)
        callback(undefined, response)
      }, error)
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
  fetchTrend (callback, name) {
    name = encodeURIComponent(name)
    const endpoint = endpoints.trend(name)

    const json = handleJSON.bind(null, callback, endpoint)
    const error = handleError.bind(null, callback)

    this.fetch(endpoint)

      .then(json, error)

      .then(response => {
        response = new Trend(response)

        callback(undefined, response)
      }, error)
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
   * @param {(string|undefined)} maxId for pagination
   */
  fetchTrendTweets (callback, name, limit, maxId) {
    name = encodeURIComponent(name)
    const endpoint = endpoints.trendTweets(name, limit, maxId)

    const json = handleJSON.bind(null, callback, endpoint)
    const error = handleError.bind(null, callback)

    this.fetch(endpoint)

      .then(json, error)

      .then(response => {
        const tweets = response.tweets
          .map(article => new Tweet(article))

        callback(undefined, tweets)
      }, error)
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
   * @param {(string|undefined)} maxId for pagination
   */
  fetchTrendArticles (callback, name, limit, maxId) {
    name = encodeURIComponent(name)
    const endpoint = endpoints.trendArticles(name, limit, maxId)

    const json = handleJSON.bind(null, callback, endpoint)
    const error = handleError.bind(null, callback)

    this.fetch(endpoint)

      .then(json, error)

      .then(response => {
        const articles = response.articles
          .map(article => new Article(article))

        callback(undefined, articles)
      }, error)
  }
}

/**
 * Releases the callback with an error.
 * @param {Error} error
 */
function handleError (callback, error) {
  callback(error, undefined)
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
function handleJSON (callback, endpoint, response) {
  if (!response.ok) {
    const error = new ResponseError(endpoint, response.status)
    handleError(callback, error)
    return false
  }
  return response.json()
}

/**
 * Thrown when a NetworkBus fetch fails.
 * @author Omar Chehab
 */
export class ResponseError extends Error {
  endpoint;
  status;

  /**
   * @param {string} endpoint
   * @param {number} status HTTP response code (100-599)
   */
  constructor (endpoint, status) {
    const message = `NetworkBus fetch response status ${status}.
    Failed to fetch ${endpoint}.`
    super(message)

    this.name = 'ResponseError'
    this.message = message
    this.endpoint = endpoint
    this.status = status
  }
}
