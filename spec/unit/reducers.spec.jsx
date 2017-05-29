import chai, {assert} from 'chai'
import reducers from 'src/reducers.js'

describe('reducer', function () {
  it('returns state untouched when action type is unhandled', function () {
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true
    }, {
      type: 'some_unhandled_action_type'
    })

    assert.deepEqual(someReducedAction, {
      someDummyPropertyThatShouldBePreserved: true
    })
  })

  it('FETCH_ALLTRENDS', function () {
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true
    }, {
      type: 'FETCH_ALLTRENDS'
    })

    assert.deepEqual(someReducedAction, {
      someDummyPropertyThatShouldBePreserved: true,
      alltrends: null
    })
  })

  it('FETCH_ALLTRENDS_SUCCESS', function () {
    const someResponse = {
      "trends": [{
        "name": "#Indy500",
        "sentiment_score": 0.399
      }, {
        "name": "#MonacoGP",
        "sentiment_score": 1.236
      }]
    }
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true,
    }, {
      type: 'FETCH_ALLTRENDS_SUCCESS',
      response: someResponse
    })

    assert.deepEqual(someReducedAction, {
      someDummyPropertyThatShouldBePreserved: true,
      alltrends: someResponse.trends
    })
  })

  it('FETCH_ALLTRENDS_FAILURE', function () {
    const someError = new Error('Some error message')
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true,
    }, {
      type: 'FETCH_ALLTRENDS_FAILURE',
      error: someError
    })

    assert.deepEqual(someReducedAction, {
      someDummyPropertyThatShouldBePreserved: true,
      alltrends: someError
    })
  })

  it('FETCH_TREND', function () {
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true
    }, {
      type: 'FETCH_TREND'
    })

    assert.deepEqual(someReducedAction, {
      someDummyPropertyThatShouldBePreserved: true,
      trend: null
    })
  })

  it('FETCH_TREND_SUCCESS', function () {
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
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true,
    }, {
      type: 'FETCH_TREND_SUCCESS',
      response: someResponse
    })

    assert.deepEqual(someReducedAction, {
      someDummyPropertyThatShouldBePreserved: true,
      trend: someResponse
    })
  })

  it('FETCH_TREND_FAILURE', function () {
    const someError = new Error('Some error message')
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true,
    }, {
      type: 'FETCH_TREND_FAILURE',
      error: someError
    })

    assert.deepEqual(someReducedAction, {
      someDummyPropertyThatShouldBePreserved: true,
      trend: someError
    })
  })
})
