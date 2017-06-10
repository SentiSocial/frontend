import {h, render} from 'preact'
import {route} from 'preact-router'
import chai, {assert} from 'chai'
import preactAssert from 'preact-jsx-chai'

import App from 'src/index.js'

chai.use(preactAssert)

function fireEvent(on, type) {
	const e = document.createEvent('Event')
	e.initEvent(type, true, true)
	on.dispatchEvent(e)
}

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout))

describe('<App />', function () {
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
    const ga = jest.fn()
    window.ga = ga
    fetch.mockReturnValue(Promise.resolve({
      json: () => Promise.resolve({trends:[]})
    }))
    window.location.pathname = '/'
    const wrapper = mount(<App/>)
    await wait()
    assert.equal(window.ga.mock.calls.length, 1)
    assert.equal(window.ga.mock.calls[0][0], 'send')
    assert.equal(window.ga.mock.calls[0][1], 'pageview')
    assert.equal(window.ga.mock.calls[0][2], 'blank')
  })
})
