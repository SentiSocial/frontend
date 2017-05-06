import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import * as Chart from 'react-chartjs-2'

import AllTrends from 'views/types/alltrends.js'

/**
* This class handles the rendering of the Trends chart which is visible on the
* homepage.
*
* @author Dennis Tismenko
*/
export default class AllTrendsChart extends PureComponent {
  static propTypes = {
    trends: PropTypes.instanceOf(AllTrends),
    onTrendClick: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.onScroll = this.onScroll.bind(this)
  }

  /**
   * When a trend is clicked, notify the application to change the page.
   * @author Omar Chehab
   */
  onClick (event) {
    if (!event.length) {
      return
    }
    const clickedBar = event[0]
    const i = clickedBar._index
    const trendsPacket = this.props.trends
    const clickedTrend = trendsPacket.trends[i]
    this.props.onTrendClick(clickedTrend)
  }

  onScroll (event) {

  }

  getData () {
    const trendsPacket = this.props.trends
    const trends = trendsPacket.trends
    const minimum = 1
    let trendScore = trends.map(trend => trend.sentiment)

    for (let i = 0; i < trendScore.length; i++) {
      if (Math.abs(trendScore[i]) < minimum) {
        if (trendScore[i] > 0) {
          trendScore[i] = minimum
        }
        if (trendScore[i] < 0) {
          trendScore[i] = -minimum
        }
      }
    }

    return {
      // array of trend names
      labels: trends.map(trend => trend.name),
      datasets: [{
        type: 'bar',
        label: 'Tweets',
        // array of trend sentiments
        data: trendScore,
        backgroundColor: trends
          .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
        borderColor: '#666666',
        hoverBackgroundColor: trends
          .map(trend => trend.sentiment > 0 ? '#226745' : '#672322'),
        yAxisID: 'y-axis-1'
      }]
    }
  }

  getOptions () {
    const trendsPacket = this.props.trends
    // find the absolute maximum sentiment
    const absoluteMax = trendsPacket.trends.reduce(function (absoluteMax, trend) {
      const sentiment = Math.abs(trend.sentiment)
      return sentiment > absoluteMax ? sentiment : absoluteMax
    }, 0)
    // give the bars some padding to be visually pleasing
    const padding = absoluteMax * 0.3
    // const padding = 0;
    // set the upper and lower bound of the graph
    const upperBound = absoluteMax + padding
    const lowerBound = -absoluteMax - padding

    return {
      // showScale: false,
      responsive: false,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          type: 'linear',
          display: true,
          id: 'y-axis-1',
          gridLines: {
            display: true,
            drawBorder: false
          },
          labels: {
            display: false
          },
          ticks: {
            display: false,
            stepSize: upperBound,
            max: upperBound,
            min: lowerBound
          }
        }]
      }
    }
  }

  /**
   * @author Dennis Tismenko
   */
  render () {
    const trendsPacket = this.props.trends
    let data, options, chartWidth
    // trends comes is undefined when not loaded
    if (trendsPacket) {
      data = this.getData()
      options = this.getOptions()
      const largestLabel = data.labels
        .reduce((res, val) => val.length > res.length ? val : res)
      const characterWidth = 7
      chartWidth = trendsPacket.trends.length * characterWidth * largestLabel.length
    }
    return (
      <div className="container">
        <div className="chart-container--header">
          {/* Title */}
          <h1 className="brand">
            <span className="brand-green">Senti</span>
            <span className="brand-red">Social</span>
          </h1>
          <div className="chart-container--description">
            Sentiment analysis of social media trends
          </div>
        </div>

        <div className="chart-container--legend-overlay">

            {/* Positive Sentiment */}
            <img className="chart-container--legend-positive"
              src="/img/mood-good.svg"/>

            {/* Negative Sentiment */}
            <img className="chart-container--legend-negative"
              src="/img/mood-bad.svg"/>
        </div>

        <div className="chart-container" onScroll={this.onScroll}>
          {trendsPacket &&
            <Chart.Bar
              width={chartWidth}
              height={260}
              data={data}
              options={options}
              onElementsClick={this.onClick}/>
          }
        </div>

        <div className="chart-container--footer">
          Click on any of the bars to filter the content
        </div>
      </div>
    )
  }
}
