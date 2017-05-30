import chai, {assert} from 'chai'

describe('actions', function () {
  const actions = require('src/actions')

  it('specification', function () {
    assert.isObject(actions)
    assert.isFunction(actions.fetchAlltrends)
    assert.isFunction(actions.fetchTrend)
  })

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

    actions.fetchAlltrends()(function (response) {
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

    actions.fetchAlltrends()(function (error) {
      assert.deepEqual(error, {
        type: 'FETCH_ALLTRENDS_FAILURE',
        error: someError
      })
      done()
    })
  })

  it('#fetchTrend success', function (done) {
    const fetch = jest.fn()
    window.fetch = fetch

    const someResponse = {
      "name": "Tiger Woods",
      "rank": 2,
      "sentiment_description": "Very Negative",
      "sentiment_score": -2.235,
      "tweets_analyzed": 42158,
      "articles":[{
        "media": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/164A/production/_96260750_c2255e57-0ae4-46be-ab63-3617259783f3.jpg",
        "link": "http://www.bbc.co.uk/news/world-us-canada-40087317",
        "source": "BBC News",
        "timestamp":1496075025,"description": "Golf star Tiger Woods is arrested on a drink-driving charge in Florida, police say.",
        "title": "Tiger Woods held on drink-driving charge"
      }],
      "tweets": [{
        "embed_id": "869213515193700360"
      }],
      "keywords": [{
        "occurences": 4094,
        "word": "tiger"
      }],
      "locations": [
        "US",
        "CA",
        "GB"
      ],
      "tracking_since": 1496072348
    }
    fetch.mockReturnValue(Promise.resolve({
      json: () => Promise.resolve(someResponse)
    }))

    actions.fetchTrend()(function (response) {
      assert.deepEqual(response, {
        type: 'FETCH_TREND_SUCCESS',
        response: someResponse
      })
      done()
    })
  })

  it('#fetchTrend failure', function (done) {
    const fetch = jest.fn()
    window.fetch = fetch

    const someError = new Error('Some error message...')
    fetch.mockReturnValue(Promise.reject(someError))

    actions.fetchTrend()(function (error) {
      assert.deepEqual(error, {
        type: 'FETCH_TREND_FAILURE',
        error: someError
      })
      done()
    })
  })
})
