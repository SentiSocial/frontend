import chai, {assert} from 'chai'

describe('reducer', function () {
  const reducers = require('src/reducers').default

  it('specification', function () {
    assert.isFunction(reducers)
  })

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

  it('FETCH_ALLTRENDS_LOADING', function () {
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true
    }, {
      type: 'FETCH_ALLTRENDS_LOADING'
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
      alltrends: null,
      error: someError
    })
  })

  it('FETCH_TREND_LOADING', function () {
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true
    }, {
      type: 'FETCH_TREND_LOADING'
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
      trend: null,
      error: someError
    })
  })

  it('FETCH_CONTRIBUTORS_LOADING', function () {
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true
    }, {
      type: 'FETCH_CONTRIBUTORS_LOADING'
    })

    assert.deepEqual(someReducedAction, {
      someDummyPropertyThatShouldBePreserved: true,
      contributors: null
    })
  })

  it('FETCH_CONTRIBUTORS_SUCCESS', function () {
    const someResponse = [{
      "login": "omarchehab98",
      "id": 12089120,
    }, {
      "login": "DennisTismenko",
      "id": 11730903,
    }, {
      "login": "suchaHassle",
      "id": 16737380,
    },{
      "login": "GunshipPenguin",
      "id": 8054598,
    }]
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true,
    }, {
      type: 'FETCH_CONTRIBUTORS_SUCCESS',
      response: someResponse
    })

    assert.deepEqual(someReducedAction, {
      someDummyPropertyThatShouldBePreserved: true,
      contributors: someResponse
    })
  })

  it('FETCH_CONTRIBUTORS_FAILURE', function () {
    const someError = new Error('Some error message')
    const someReducedAction = reducers({
      someDummyPropertyThatShouldBePreserved: true,
    }, {
      type: 'FETCH_CONTRIBUTORS_FAILURE',
      error: someError
    })

    assert.deepEqual(someReducedAction, {
      someDummyPropertyThatShouldBePreserved: true,
      contributors: null,
      error: someError
    })
  })
})
