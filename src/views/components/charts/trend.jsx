import * as React from 'react'
import './chart.scss'

import * as Chart from 'react-chartjs-2'

import {moment} from 'views/classes/helpers.js'

/**
* Handles data parsing and displaying data for a specific trend on line and bar
* graph.
* @author Dennis Tismenko
*/
export default class TrendChart extends React.Component {
  getData () {
    return {
      labels: this.props.history
        .map(trend => moment(trend.timestamp).fromNow()),
      datasets: [{
        label: 'Sentiment',
        type: 'line',
        data: this.props.history.map(trend => trend.sentiment),
        fill: false,
        borderWidth: 2,
        pointRadius: 4,
        borderColor: '#666',
        backgroundColor: '#666',
        pointBorderColor: this.props.history
          .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
        pointBackgroundColor: this.props.history
          .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
        pointHoverBackgroundColor: this.props.history
          .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
        pointHoverBorderColor: this.props.history
          .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
        yAxisID: 'y-axis'
      }]
    }
  }

  getOptions () {
    // find the absolute maximum sentiment
    const absoluteMax = this.props.history.reduce(
      (absoluteMax, trend) => {
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
      responsive: true,
      tooltips: {
        enabled: false
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
          position: 'right',
          id: 'y-axis',
          gridLines: {
            display: true,
            drawBorders: false
          },
          labels: {
            show: true
          },
          legend: {
            position: 'left'
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

  render () {
    let data, options

    if (this.props.history) {
      data = this.getData()
      options = this.getOptions()
    }

    return (
      <div className="container">
        <div className="chart-container">
          {this.props.history && <Chart.Bar data={data} options={options}/>}
        </div>
        <div className="chart-container--line"/>
      </div>
    )
  }
}

TrendChart.propTypes = {
  history: React.PropTypes.array.isRequired
}
