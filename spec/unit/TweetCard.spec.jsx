import {h, render} from 'preact'
import chai, {assert} from 'chai'
import preactAssert from 'preact-jsx-chai'

import TweetCard from 'src/components/TweetCard'
import Tweet from 'src/types/tweet.js'

chai.use(preactAssert)

function fireEvent(on, type) {
	const e = document.createEvent('Event')
	e.initEvent(type, true, true)
	on.dispatchEvent(e)
}

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout))

describe('<TweetCard />', function () {
  let scratch, $, mount
  let someTweet

  beforeAll(function () {
    scratch = document.createElement('div')
		document.body.appendChild(scratch)
		$ = s => scratch.querySelector(s)
		mount = jsx => render(jsx, scratch, scratch.firstChild)
  })

  beforeEach(function () {
    someTweet = new Tweet({
      embed_id: '868242524053409792'
    })
  })

	afterAll(function() {
		document.body.removeChild(scratch)
	})

	afterEach(function() {
		mount(() => null)
		scratch.innerHTML = ''
	})

  it('call #window.twttr.widgets.createTweetEmbed', async function () {
    const appendChild = jest.fn()
    const createTweetEmbed = jest.fn(() => {
      const tweet = document.createElement('iframe')
      tweet.shadowRoot = {
        appendChild
      }
      $('div.card > div').appendChild(tweet)
      return Promise.resolve()
    })
    window.twttr = {
      widgets: {
        createTweetEmbed
      }
    }
    const someEmbedId = '868820837843046400'
    const wrapper = mount(<TweetCard embed_id={someEmbedId}/>)
    await wait()
    assert.equal(appendChild.mock.calls.length, 1)
    assert.equal(createTweetEmbed.mock.calls.length, 1)
    assert.equal(createTweetEmbed.mock.calls[0][0], someEmbedId)
    assert.equal(createTweetEmbed.mock.calls[0][1], $('div.card > div'))
  })
})
