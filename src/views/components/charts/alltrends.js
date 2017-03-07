import * as React from 'react'
import './chart.scss'

import * as Chart from 'react-chartjs-2'

import AllTrends from 'views/types/alltrends.js'

/**
* This class handles the rendering of the Trends chart which is visible on the
* homepage.
*
* @author Dennis Tismenko
*/
export default class AllTrendsChart extends React.Component {
  /**
   * When a trend is clicked, notify the application to change the page.
   * @author Omar Chehab
   */
  handleClickEvent = event => {
    if (!event.length) {
      return
    }
    const clickedBar = event[0]
    const i = clickedBar._index
    const trendsPacket = this.props.trends
    const clickedTrend = trendsPacket.trends[i]
    this.props.onTrendClick(clickedTrend)
  }

  getData () {
    const trendsPacket = this.props.trends
    const trends = trendsPacket.trends
    const minimum = 0.5
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
      chartWidth = trendsPacket.trends.length * 160
    }
    return (
      <div className="container">

        <div className="chart-container--header">
          {/* Title */}
          <h2 className="chart-container--title">
            Trend Chart
          </h2>
        </div>

        <div className="chart-container">
          {trendsPacket &&
            <Chart.Bar
              width={chartWidth} height={260} data={data} options={options}
              onElementsClick={this.handleClickEvent}
              />}
        </div>

        <div className="chart-container--footer">

          <div className="chart-container--legend">
            {/* Positive Sentiment */}
            <img className="chart-container--legend-positive"
              src="/img/positive.svg"/>

            {/* Negative Sentiment */}
            <img className="chart-container--legend-negative"
              src="/img/negative.svg"/>
          </div>
          Click on any of the bars to filter the content
        </div>
      </div>
    )
  }
}

AllTrendsChart.propTypes = {
  trends: React.PropTypes.instanceOf(AllTrends),
  onTrendClick: React.PropTypes.func.isRequired
}
