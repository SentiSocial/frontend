import {h, render} from 'preact';
import chai, {assert} from 'chai'
import preactAssert from 'preact-jsx-chai'

import ArticleCard from 'src/components/ArticleCard'
import Article, {fromNow} from 'src/types/article.js'

chai.use(preactAssert);

function fireEvent(on, type) {
	const e = document.createEvent('Event');
	e.initEvent(type, true, true);
	on.dispatchEvent(e);
}

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout))

describe('<ArticleCard />', function () {
  let scratch, $, mount
  let someArticle

  beforeAll(function () {
    scratch = document.createElement('div')
		document.body.appendChild(scratch)
		$ = s => scratch.querySelector(s)
		mount = jsx => render(jsx, scratch, scratch.firstChild)
  })

  beforeEach(function () {
    someArticle = new Article({
      _id: '1337-73S7S',
      title: 'Sentisocial going off the charts!',
      source: 'New York Times',
      timestamp: Math.round(Date.now() / 1000),
      link: 'https://senti.social/not-a-real-link',
      description: 'some description of article',
      media: undefined
    })
  })

	afterAll(function() {
		document.body.removeChild(scratch);
	});

	afterEach(function() {
		mount(() => null);
		scratch.innerHTML = '';
	});

  it('wraps content in a card', function () {
    const wrapper = mount(<ArticleCard {...someArticle}/>)
    assert.equal(wrapper, $('div.card'))
  })

  it('show image when media provided', function () {
    someArticle.media = 'https://senti.social/not-a-real-image.jpg'
    mount(<ArticleCard {...someArticle}/>)
    assert.isNotNull($('img.article--image'))
  })

  it('no image when media not provided', function () {
    someArticle.media = undefined

    mount(<ArticleCard {...someArticle}/>)
    assert.isNull($('img.article--image'))
  })

  it('show published time relative from now', async function () {
    let anotherArticle

    anotherArticle = new Article({
      ...someArticle,
      timestamp: Date.now() - 10 * 1000
    })
    mount(<ArticleCard {...someArticle}/>)
    await wait()
    assert.match($('.article--time').innerHTML, /^\d+s$/)

    assert.equal(fromNow(Date.now() - 1 * 1000), '1s')
    assert.equal(fromNow(Date.now() - 59 * 1000), '59s')
    assert.equal(fromNow(Date.now() - 60 * 1000), '1m')
    assert.equal(fromNow(Date.now() - 3599 * 1000), '59m')
    assert.equal(fromNow(Date.now() - 3600 * 1000), '1h')
    assert.equal(fromNow(Date.now() - 86399 * 1000), '23h')
    assert.match(fromNow(Date.now() - 86400 * 1000), /\d+ \w+/)
    assert.match(fromNow(Date.now() - 31536000 * 1000), /\d+ \w+ \d+/)
  })

  it('description is collapsable', async function () {
    mount(<ArticleCard {...someArticle}/>)
    assert.isOk($('.article--description').__preactattr_['hidden'])
    $('.article--showdescription').click()
    await wait()
    assert.isNotOk($('.article--description').__preactattr_['hidden'])
  })
})
