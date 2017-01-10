import * as React from "react";
import * as Chart from "react-chartjs-2";

import {TrendsPacket} from "./network-bus";

interface TrendsChartProps {
  trends: TrendsPacket;
  onTrendClick: (selectedTrend) => void;
}

interface TrendsChartState {
  scroll: number;
}

/**
* This class handles the rendering of the Trends chart which is visible on the
* homepage.
* @author Dennis Tismenko
*/
export class TrendsChart
  extends React.Component <TrendsChartProps, TrendsChartState> {
  barsShown;

  constructor(props){
    super(props);
    this.state = {
      scroll: 0,
    }
    this.handleResize();
  }

  componentDidMount() {
      window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
  }

  /**
   * When the window is resized, update the number of bars shown based on what
   * device it is.
   */
  handleResize() {
    console.log(window.innerWidth);
    if (window.innerWidth > 992) {
      this.barsShown = 7;
    } else {
      this.barsShown = 5;
    }
  }

  /**
   * When a trend is clicked, notify the application to change the page.
   * @author Omar Chehab
   */
  handleClickEvent = event => {
    if (!event.length) {
      return;
    }
    const clickedBar = event[0];
    const i = clickedBar._index + this.state.scroll;
    const trendsPacket = this.props.trends;
    const clickedTrend = trendsPacket.trends[i];
    this.props.onTrendClick(clickedTrend);
  };

  /**
   * Event listener for scrolling left on the chart.
   * @author Omar Chehab
   */
  handleLeftEvent = event => {
    const trendsPacket = this.props.trends;
    const numberOfTrends = trendsPacket.trends.length;
    this.setState(prevState => ({
      scroll: Math.max(prevState.scroll - 1, 0),
    }));
  };

  /**
   * Event listener for scrolling right on the chart.
   * @author Omar Chehab
   */
  handleRightEvent = event => {
    const trendsPacket = this.props.trends;
    const numberOfTrends = trendsPacket.trends.length;
    this.setState(prevState => ({
      scroll: Math.min(prevState.scroll + 1, numberOfTrends - this.barsShown),
    }));
  };

  /**
   * @author Dennis Tismenko
   */
  render() {
    const trendsPacket = this.props.trends;
    var data, options, leftMost, rightMost;
    // trends comes is undefined when not loaded
    if (trendsPacket) {
      // only take a portion of the trends array based on the current scroll.
      const trends = trendsPacket.trends
        .slice(this.state.scroll, this.state.scroll + this.barsShown);
      // find the absolute maximum sentiment
      const absoluteMax = trends.reduce(function (absoluteMax, trend) {
        const sentiment = Math.abs(trend.sentiment);
        return sentiment > absoluteMax ? sentiment : absoluteMax;
      }, 0);
      // give the bars some padding to be visually pleasing
      const padding = absoluteMax * 0.3;
      // set the upper and lower bound of the graph
      const upperBound = absoluteMax + padding;
      const lowerBound = -absoluteMax - padding;
      const minimum = 0.5;
      var trendScore = trends.map(trend => trend.sentiment);
      for (let i = 0; i < trendScore.length; i++){
        if (Math.abs(trendScore[i]) < minimum){
          if (trendScore[i] > 0){
            trendScore[i] = minimum;
          }
          if (trendScore[i] < 0){
            trendScore[i] = -minimum;
          }
        }
      }

      data = {
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
      };

      options = {
        //showScale: false,
        responsive: true,
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
      };

      leftMost = this.state.scroll == 0;
      rightMost = this.state.scroll == trendsPacket.trends.length - this.barsShown;
    }


    return (
      <div className="container">
        <div className="chart-container">
          <h1 className="chart--title">The Trend Chart</h1>
          {trendsPacket &&
            <Chart.Bar data={data} options={options}
              onElementsClick={this.handleClickEvent}
            />
          }
          <i className="glyphicon glyphicon-chevron-left"
            id="chart--left"
            style={{
              display: leftMost ? 'none' : 'block',
            }}
            onClick={this.handleLeftEvent}
          />
          <i className="glyphicon glyphicon-chevron-right"
            id="chart--right"
            style={{
              display: rightMost ? 'none' : 'block',
            }}
            onClick={this.handleRightEvent}
          />
        </div>
        <div className="chart-container--line">
          Click on any of the bars to filter the content
        </div>
      </div>
    );
  }

}
