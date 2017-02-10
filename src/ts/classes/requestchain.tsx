export class RequestChain {
  requests;
  counter;

  constructor() {
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
    this.requests = [];
    this.counter = -1;
  }

  /**
   * Registers a new request in the request chain. Returns the id of the request
   * for use with other functions.
   * Callback will be released when and the response is oldest request in the
   * chain. If the response arrives early, it will be stored until older
   * requests are released.
   * @param {function} callback
   * @return {number} Request Identifier
   */
  register(callback) {
    this.counter += 1;
    this.requests.push({
      id: this.counter,
      response: false,
      callback: callback
    });
    return this.counter;
  }

  /**
   * Call this function when the response has arrived.
   * @param {number} Request Identifier
   * @param {array} response array of arguments for the callback
   */
  response(id, response) {
    if (this.isEmpty()) {
      throw new ChainEmptyError();
    }
    const requests = this.requests;
    const r = requests.find(r => r.id === id);
    r.response = response;
    while (!this.isEmpty() && this.requests[0].response) {
      const oldest = requests.shift();
      oldest.callback(...oldest.response);
    }
  }

  /**
   * Returns whether or not there are still pending requests in the RequestChain.
   * @return {boolean}
   */
  isEmpty() {
    return this.requests.length === 0;
  }
}

export class ChainEmptyError extends Error {
  constructor() {
    const message = 'Tried to release from an empty RequestChain';
    super(message);
    this.name = 'ChainEmptyError';
    this.message = message;
  }
}
