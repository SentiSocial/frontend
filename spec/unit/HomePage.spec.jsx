import {h, render} from 'preact'
import {Provider} from 'preact-redux'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import chai, {assert} from 'chai'
import preactAssert from 'preact-jsx-chai'

import HomePage from 'src/containers/HomePage'

chai.use(preactAssert)

function fireEvent(on, type) {
	const e = document.createEvent('Event')
	e.initEvent(type, true, true)
	on.dispatchEvent(e)
}

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout))

describe('<HomePage />', function () {
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
    const someTrend = {
      "name": "#Indy500",
      "sentiment_score": 0.319
    }
    const store = createStore(
      (state, action) => state, {
        alltrends: [someTrend],
      },
      applyMiddleware(
        thunkMiddleware
      )
    )
    mount(<Provider store={store}>
      <HomePage />
    </Provider>)
    await wait()
    const {
      onTrendClick
    } = $('div.homepage > div.container')._component.props
    onTrendClick(someTrend)
  })
})
