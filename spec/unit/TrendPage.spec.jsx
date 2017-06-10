import {h, render} from 'preact'
import {Provider} from 'preact-redux'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import chai, {assert} from 'chai'
import preactAssert from 'preact-jsx-chai'

import TrendPage from 'src/containers/TrendPage'

chai.use(preactAssert)

function fireEvent(on, type) {
	const e = document.createEvent('Event')
	e.initEvent(type, true, true)
	on.dispatchEvent(e)
}

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout))

describe('<TrendPage />', function () {
  let scratch, $, mount
  let someTweet

  beforeAll(function () {
    scratch = document.createElement('div')
		document.body.appendChild(scratch)
		$ = s => scratch.querySelector(s)
		mount = jsx => render(jsx, scratch, scratch.firstChild)
  })

	afterAll(function() {
		document.body.removeChild(scratch)
	})

	afterEach(function() {
		mount(() => null)
		scratch.innerHTML = ''
	})

  it('mounts', async function () {
    const fetch = jest.fn()
    window.fetch = fetch
    window.twttr = {
      widgets: {
        createTweetEmbed: jest.fn()
      }
    }
    const someTrend = {
      "name": "Tiger Woods",
      "rank": 2,
      "sentiment_description": "Very Negative",
      "sentiment_score": -2.235,
      "tweets_analyzed": 42158,
      "articles":[{
        "media": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/164A/production/_96260750_c2255e57-0ae4-46be-ab63-3617259783f3.jpg",
        "link": "http://www.bbc.co.uk/news/world-us-canada-40087317",
        "source": "BBC News",
        "timestamp": 1496075025,
        "description": "Golf star Tiger Woods is arrested on a drink-driving charge in Florida, police say.",
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
      json: () => Promise.resolve(someTrend)
    }))
    const store = createStore(
      (state, action) => state, {
        trend: someTrend,
      },
      applyMiddleware(
        thunkMiddleware
      )
    )
    mount(<Provider store={store}>
      {/*name prop passed in by router*/}
      <TrendPage name="Tiger Woods"/>
    </Provider>)
    await wait()
    assert.equal(window.fetch.mock.calls.length, 1)
    assert.equal(window.fetch.mock.calls[0][0], 'https://api.senti.social/trend/Tiger%20Woods')
  })

  it('does not crash if loading', async function () {
    const fetch = jest.fn()
    window.fetch = fetch
    const someTrend = null
    fetch.mockReturnValue(Promise.resolve({
      json: () => Promise.resolve(someTrend)
    }))
    const store = createStore(
      (state, action) => state, {
        trend: someTrend,
      },
      applyMiddleware(
        thunkMiddleware
      )
    )
    mount(<Provider store={store}>
      <TrendPage />
    </Provider>)
    await wait()
  })

  it('does not crash no keywords', async function () {
    const fetch = jest.fn()
    window.fetch = fetch
    const someTrend = {
      "name": "Tiger Woods",
      "rank": 2,
      "sentiment_description": "Very Negative",
      "sentiment_score": -2.235,
      "tweets_analyzed": 42158,
      "articles":[],
      "tweets": [],
      "keywords": [],
      "locations": [],
      "tracking_since": 1496072348
    }
    fetch.mockReturnValue(Promise.resolve({
      json: () => Promise.resolve(someTrend)
    }))
    const store = createStore(
      (state, action) => state, {
        trend: someTrend,
      },
      applyMiddleware(
        thunkMiddleware
      )
    )
    mount(<Provider store={store}>
      <TrendPage />
    </Provider>)
    await wait()
  })
})
