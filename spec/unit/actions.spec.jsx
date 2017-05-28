import chai, {assert} from 'chai'
import {
  fetchAlltrends,
  fetchAlltrendsSuccess,
  fetchAlltrendsFailure
} from 'src/actions.js'

describe('actions', function () {
  it('#fetchAlltrends success', function (done) {
    const fetch = jest.fn()
    window.fetch = fetch

    const someResponse =  {
      "trends": [{
        "name": "#Indy500",
        "sentiment_score": 0.55
      }, {
        "name": "#Tottiday",
        "sentiment_score": 0.969
      }]
    }
    fetch.mockReturnValue(Promise.resolve({
      json: () => Promise.resolve(someResponse)
    }))

    fetchAlltrends()(function (response) {
      assert.deepEqual(response, {
        type: 'FETCH_ALLTRENDS_SUCCESS',
        response: someResponse
      })
      done()
    })
  })

  it('#fetchAlltrends failure', function (done) {
    const fetch = jest.fn()
    window.fetch = fetch

    const someError = new Error('Some error message...')
    fetch.mockReturnValue(Promise.reject(someError))

    fetchAlltrends()(function (error) {
      assert.deepEqual(error, {
        type: 'FETCH_ALLTRENDS_FAILURE',
        error: someError
      })
      done()
    })
  })
})
