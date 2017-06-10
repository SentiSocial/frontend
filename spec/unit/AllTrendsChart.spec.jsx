import {h, render} from 'preact'
import chai, {assert} from 'chai'
import preactAssert from 'preact-jsx-chai'

import AllTrendsChart from 'src/components/AllTrendsChart'

chai.use(preactAssert)

function fireEvent(on, type) {
	const e = document.createEvent('Event')
	e.initEvent(type, true, true)
	on.dispatchEvent(e)
}

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout))

describe('<AllTrendsChart />', function () {
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

  it('trends prop renders bar chart', async function () {
    const someTrends = [{
        "name": "#Indy500",
        "sentiment_score": 0.319
      }, {
        "name": "Totti",
        "sentiment_score": 1.326
      }
    ]
    const wrapper = mount(<AllTrendsChart trends={someTrends}/>)
    await wait()
    const mountedProps = $('canvas')._component.props
    assert.deepEqual(mountedProps.data.labels, [
      "#Indy500",
      "Totti",
    ])
    assert.deepEqual(mountedProps.data.datasets[0].data, [
      0.319,
      1.326
    ])
  })

  it('bar chart data has minimum', async function () {
    const someTrends = [{
      "name": "#Indy500",
      "sentiment_score": 0.01
    }, {
      "name": "Totti",
      "sentiment_score": -0.01
    }]
    const wrapper = mount(<AllTrendsChart trends={someTrends}/>)
    await wait()
    const mountedProps = $('canvas')._component.props
    const renderedData = mountedProps.data.datasets[0].data
    assert.isAbove(renderedData[0], 0.01)
    assert.isBelow(renderedData[1], -0.01)
    assert.equal(renderedData[0], Math.abs(renderedData[1]))
  })

  it('on hover bar, show pointer cursor', async function () {
    const someTrends = [{
      "name": "#Indy500",
      "sentiment_score": 2.5
    }, {
      "name": "Totti",
      "sentiment_score": -2.5
    }]
    const wrapper = mount(<AllTrendsChart trends={someTrends}/>)
    await wait()
    const mountedProps = $('canvas')._component.props
    const onHover = mountedProps.options.hover.onHover
    assert.isNotOk($('canvas').style['cursor'])
    onHover('someEvent', ['someHoveredBar'])
    await wait()
    assert.equal($('canvas').style['cursor'], 'pointer')
    onHover('someEvent', [])
    await wait()
    assert.isNotOk($('canvas').style['cursor'])
  })

  it('on click bar, call #onTrendClick', async function (done) {
    const someTrends = [{
      "name": "#Indy500",
      "sentiment_score": 2.5
    }, {
      "name": "Totti",
      "sentiment_score": -2.5
    }]
    const onTrendClick = jest.fn()
    const wrapper = mount(<AllTrendsChart
      trends={someTrends}
      onTrendClick={onTrendClick}
    />)
    await wait()
    const onElementsClick = $('canvas').__preactattr_['onElementsClick']
    const someIndex = 0
    onElementsClick([{
      _index: someIndex
    }])
    await wait()
    assert.equal(onTrendClick.mock.calls.length, 1)
    assert.equal(onTrendClick.mock.calls[0][0], someTrends[someIndex])
    done()
  })

  it('on click background, do not call #onTrendClick', async function (done) {
    const someTrends = [{
      "name": "#as",
      "sentiment_score": 2.5
    }, {
      "name": "Indy500",
      "sentiment_score": -2.5
    }]
    const onTrendClick = jest.fn()
    const wrapper = mount(<AllTrendsChart
      trends={someTrends}
      onTrendClick={onTrendClick}
    />)
    await wait()
    const onElementsClick = $('canvas').__preactattr_['onElementsClick']
    const someIndex = 0
    onElementsClick([])
    await wait()
    assert.equal(onTrendClick.mock.calls.length, 0)
    done()
  })

  it('do not render canvas without trends prop', async function (done) {
    const wrapper = mount(<AllTrendsChart />)
    await wait()
    assert.isNotOk($('canvas'))
    done()
  })
})
