import * as React from 'react'
import {assert} from 'chai'
import {shallow} from 'enzyme'

import Card from 'views/components/cards/card.js'
import ArticleCard from 'views/components/cards/article.js'
import Article from 'views/types/article.js'

describe('<Article />', function () {
  let someArticle
  let wrapper

  beforeEach(function () {
    someArticle = new Article({
      _id: '1337-73S7S',
      title: 'Sentisocial going off the charts!',
      source: 'New York Times',
      timestamp: (Date.now() / 1000) - 5,
      link: 'https://senti.social/not-a-real-link',
      description: 'some description of article',
      media: undefined
    })
  })

  it('wraps content with <Card /> component', function () {
    wrapper = shallow(<ArticleCard article={someArticle}/>)
    assert.equal(wrapper.find(Card).length, 1)
  })

  it('optionally renders an image', function () {
    someArticle.media = undefined

    wrapper = shallow(<ArticleCard article={someArticle}/>)
    assert.equal(wrapper.find('img.article--image').length, 0)

    someArticle.media = 'https://senti.social/not-a-real-image.jpg'

    wrapper = shallow(<ArticleCard article={someArticle}/>)
    assert.equal(wrapper.find('img.article--image').length, 1)
  })

  it('renders relative published time', function () {
    wrapper = shallow(<ArticleCard article={someArticle}/>)
    // time should be rendered as '5s', since it's relative time.
    // Used regex here to match any digit.
    assert.match(wrapper.find('.article--time').text(), /^\ds$/)
  })

  it('description is collapsable', function () {
    wrapper = shallow(<ArticleCard article={someArticle}/>)
    assert(wrapper.find('.article--description').hasClass('hidden'))

    wrapper.find('.article--showdescription').simulate('click')
    assert(!wrapper.find('.article--description').hasClass('hidden'))
  })
})
