export class RequestChain {
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
  }
}

class Request {
  constructor(callback) {
    // Representation Invariant:
    // callback is a function.
  }
}
