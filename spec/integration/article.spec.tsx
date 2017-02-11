import * as React from 'react';
import ReactTestUtilities from 'react-addons-test-utils';
import { assert } from 'chai'
import { shallow } from 'enzyme';

import { Card } from '../../src/ts/components/cards/card';
import { ArticleCard } from '../../src/ts/components/cards/article';
import { Article } from '../../src/ts/types/article';

describe('<Article />', () => {
  let someArticle;
  let wrapper;

  beforeEach(() => {
    someArticle = new Article({
       _id: '1337-73S7S',
       title: 'Sentisocial going off the charts!',
       source: 'New York Times',
       timestamp: Date.now() / 1000 - 5,
       link: 'https://senti.social/not-a-real-link',
       description: 'some description of article',
       media: undefined
    });
  })

  it('wraps content with <Card /> component', () => {
    wrapper = shallow(<ArticleCard article={someArticle} />);
    assert.equal(wrapper.find(Card).length, 1);
  })

  it('optionally renders an image', () => {
    someArticle.media = undefined;

    wrapper = shallow(<ArticleCard article={someArticle} />);
    assert.equal(wrapper.find('img').length, 0);

    someArticle.media = "https://senti.social/not-a-real-image.jpg";

    wrapper = shallow(<ArticleCard article={someArticle} />);
    assert.equal(wrapper.find('img').length, 1);
  })

  it('renders relative published time', () => {
    wrapper = shallow(<ArticleCard article={someArticle} />);
    // time should be rendered as '5s', since it's relative time.
    // Used regex here to match any digit.
    assert.match(wrapper.find('.card--time').text(), /^\ds$/);
  })

  it('description is collapsable', () => {
    wrapper = shallow(<ArticleCard article={someArticle} />);
    assert(wrapper.find('.card--description').hasClass('hidden'));

    wrapper.find('.card--showdescription').simulate('click');
    assert(!wrapper.find('.card--description').hasClass('hidden'));
  })
})
