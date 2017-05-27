import { h, Component } from 'preact'
import style from './style'
import { Bar as BarChart } from 'react-chartjs-2'

/**
* This class handles the rendering of the Trends chart which is visible on the
* homepage.
*/
export default class AllTrendsChart extends Component {
  onClick = event => {
    if (!event.length) {
      return
    }
    const clickedBar = event[0]
    const i = clickedBar._index
    const trendsPacket = this.props.trends
    const clickedTrend = trendsPacket.trends[i]
    this.props.onTrendClick(clickedTrend)
  }

  getData = () => {
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

  render ({ trends }) {
    let data, options, chartWidth

    if (trends) {
      data = this.getData()
      options = this.getOptions()
      const largestLabel = data.labels
        .reduce((res, val) => val.length > res.length ? val : res)
      const characterWidth = 7;
      chartWidth = trends.trends.length * characterWidth * largestLabel.length
    }
    return (
      <div className={style["container"]}>
        <div className={style["chart-container--header"]}>
          {/* Title */}
          <h1 className={style["brand"]}>
            <span className={style["brand-green"]}>Senti</span>
            <span className={style["brand-red"]}>Social</span>
          </h1>
          <div className={style["chart-container--description"]}>
            Sentiment analysis of social media trends
          </div>
        </div>

        <div className={style["chart-container"]}>
          {trends &&
            <BarChart
              width={chartWidth}
              height={260}
              data={data}
              options={options}
              onElementsClick={this.onClick}/>
          }

          {/* Positive Sentiment */}
          <img className={style["chart-container--legend-positive"]}
            src="/assets/graphics/mood-good.svg"/>

          {/* Negative Sentiment */}
          <img className={style["chart-container--legend-negative"]}
            src="/assets/graphics/mood-bad.svg"/>
        </div>

        <div className={style["chart-container--footer"]}>
          Click on any of the bars to filter the content
        </div>
      </div>
    )
  }
}
