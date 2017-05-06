import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import Card from 'views/components/Card'

describe('<Card />', function () {
  it('renders div.card', function () {
    const wrapper = shallow(<Card>Hello World</Card>)

    expect(wrapper.find('.card')).to.have.length(1)
  })

  it('renders children props', function () {
    const someChild = <div className="unique"/>

    const wrapper = shallow(
      <Card>
        {someChild}
      </Card>
    )

    expect(wrapper.contains(someChild)).to.equal(true)
  })
})
