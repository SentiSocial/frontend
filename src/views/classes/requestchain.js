
/**
 * Handles the release of asynchronous requests in a first in first out manner.
 * Response data is stored in the class until all older requests are released.
 *
 * Consider this use case scenario:
 *
 * You want to make 3 requests to an API, however, you want their responses
 * to be calledback in the order you made the requests.
 *
 * * Response B arrives.
 * * RequestChain stores the response internally.
 * * Response A arrives.
 * * RequestChain releases A's callback with the response.
 * * RequestChain releases B's callback with the response.
 * * Response C arrives.
 * * RequestChain releases C's callback with the response.
 * @author Omar Chehab
 */
export default class RequestChain {
  /**
   * Creates a new RequestChain.
   *
   * requests;
   * counter;
   */
  constructor () {
    // Representation Invariant:
    // requests is an array of objects containing a boolean and a Request.
    // requests.length is the number of requests.
    // False indicates that the request has not been responded to.
    // True indiciates that the request has been responded to.
    // if requests.length > 0, then
    //   requests[0] is the oldest request.
    //   requests[0] is false, meaning it has not been responded to.
    //   requests[requests.length - 1] is the newest request.
    //   requests[0], ..., requests[requests.length - 1]
    //   is the order in which the requests were inserted.
    this.requests = []
    this.counter = -1
  }

  /**
   * Registers a new request in the RequestChain. Returns the id of the request
   * for use with other functions.
   *
   * Callback will be released when the request is oldest in the chain and it's
   * response has been returned.
   *
   * If the response arrives early, it will be stored until older requests have
   * returned.
   * @param {function} callback
   * @return {number} request identifier, for use with the #response function
   */
  request (callback) {
    this.counter += 1
    this.requests.push({
      id: this.counter,
      response: false,
      callback: callback
    })
    return this.counter
  }

  /**
   * Call this function when the response of a request has arrived.
   * @param {number} id request identifier from #register.
   * @param {array} response array of arguments for the callback.
   */
  response (id, response) {
    const request = this.requests.find(r => r.id === id)

    if (!request) {
      throw new RequestDoesNotExist()
    }

    request.response = response

    while (!this.isEmpty() && this.requests[0].response) {
      const oldest = this.requests.shift()
      oldest.callback(...oldest.response)
    }
  }

  /**
   * Returns whether or not there are still pending requests in the RequestChain.
   * @return {boolean}
   */
  isEmpty () {
    return this.requests.length === 0
  }
}

/**
 * Thrown when responding to a request that does not exist in the RequestChain.
 * @author Omar Chehab
 */
export class RequestDoesNotExist extends Error {
  constructor () {
    const message = 'Tried to release a request that does not exist.'
    super(message)

    this.name = 'RequestDoesNotExist'
    this.message = message
  }
}
