import chai, {assert} from 'chai'
import reducers from 'src/reducers.js'

describe('reducer', function () {
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
})
