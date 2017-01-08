import * as React from "react";
import * as Chart from "react-chartjs-2";
import {TrendsPacket} from "./network-bus";

/**
* Handles data parsing and displaying data for a specific trend.
* @author Dennis Tismenko
*/
interface TrendsChartProps{
  trends: TrendsPacket;
}

/**
* This class handles the rendering of the Trends chart which is visible on the
* homepage.
* @author Dennis Tismenko
*/
export class TrendsChart extends React.Component <TrendsChartProps, undefined> {

  constructor(props){
    super(props);
  }

  render() {
    const trendsPacket = this.props.trends;
    var data, options;
    // trends comes in as undefined when not loaded
    if (trendsPacket) {
      const trends = trendsPacket.trends;
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

      data = {
        // array of trend names
        labels: trends.map(trend => trend.name),
        datasets: [{
          type: 'bar',
          label: 'Tweets',
          // array of trend sentiments
          data: trends.map(trend => trend.sentiment),
          backgroundColor: trends
            .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
          borderColor: '#666666',
          hoverBackgroundColor: trends
            .map(trend => trend.sentiment > 0 ? '#226745' : '#672322'),
          yAxisID: 'y-axis-1'
        }]
      };

      options = {
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
              display: true
            },
            scaleLabel: {
              display: false
            },
            ticks: {
              stepSize: upperBound,
              max: upperBound,
              min: lowerBound
            }
          }]
        }
      };
    }

    return (
      <div className="chart-container">
        {trendsPacket && <Chart.Bar data={data} options={options} />}
      </div>
    );
  }

}
