import {h, render} from 'preact'
import chai, {assert} from 'chai'
import preactAssert from 'preact-jsx-chai'

import Navigation from 'src/components/Navigation'

chai.use(preactAssert)

function fireEvent(on, type) {
	const e = document.createEvent('Event')
	e.initEvent(type, true, true)
	on.dispatchEvent(e)
}

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout))

describe('<Navigation />', function () {
  let scratch, $, mount

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

  it('is closed by default, opens when clicked', async function () {
    const wrapper = mount(<Navigation />)
    await wait()
    assert.isFalse($('nav.navigation').__preactattr_['data-opened'])
    $('button.navigation--logo').click()
    await wait()
    assert.isTrue($('nav.navigation').__preactattr_['data-opened'])
  })
})
