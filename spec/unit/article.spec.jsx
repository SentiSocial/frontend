import * as React from 'react'
import {assert} from 'chai'
import {shallow} from 'enzyme'

import ArticleCard from '../../src/components/ArticleCard'
import Article from '../../src/types/article.js'

describe('<Article />', function () {
  beforeEach(function () {
    this.someArticle = new Article({
      _id: '1337-73S7S',
      title: 'Sentisocial going off the charts!',
      source: 'New York Times',
      timestamp: (Date.now() / 1000) - 5,
      link: 'https://senti.social/not-a-real-link',
      description: 'some description of article',
      media: undefined
    })
  })

  it('wraps content in a card', function () {
    const wrapper = shallow(<ArticleCard article={this.someArticle}/>)
    assert.equal(wrapper.find('div.card').length, 1)
  })

  it('does not render an image when media not provided', function () {
    this.someArticle.media = undefined

    const wrapper = shallow(<ArticleCard article={this.someArticle}/>)
    assert.equal(wrapper.find('img.article--image').length, 0)
  })

  it('render an image when media provided', function () {
    this.someArticle.media = 'https://senti.social/not-a-real-image.jpg'

    const wrapper = shallow(<ArticleCard article={this.someArticle}/>)
    assert.equal(wrapper.find('img.article--image').length, 1)
  })

  it('renders relative published time', function () {
    const wrapper = shallow(<ArticleCard article={this.someArticle}/>)
    // time should be rendered as '##s', since it's relative time.
    assert.match(wrapper.find('.article--time').text(), /^\d+s$/)
  })

  it('description is collapsable', function () {
    const wrapper = shallow(<ArticleCard article={this.someArticle}/>)
    assert(wrapper.find('.article--description').hasClass('hidden'))

    wrapper.find('.article--showdescription').simulate('click')
    assert(!wrapper.find('.article--description').hasClass('hidden'))
  })
})
