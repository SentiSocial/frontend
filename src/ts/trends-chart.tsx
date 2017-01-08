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



export class TrendsChart extends React.Component <TrendsChartProps, undefined> {

  constructor(props){
    super(props);
  }

  render() {
    const trends = (this.props.trends || {trends: []} ).trends;
    const max = [2,-4,2,1,-2].reduce(function (max, trend) {
      const sentiment = Math.abs(trend);
      return sentiment > max ? sentiment : max;
    }, 0);
    const padding = 2;
    const upperBound = max + padding;
    const lowerBound = -max - padding;
    const data = {
      labels: trends.map(trend => trend.name),
      datasets: [{
        type: 'bar',
        label: 'Tweets',
        data: trends.map(trend => trend.sentiment),
        fill: false,
        backgroundColor: trends.map(trend => trend.sentiment > 0 ? "green":"red"),
        borderColor: '#1da1f2',
        hoverBackgroundColor: '#1da1f2',
        hoverBorderColor: '#1da1f2',
        yAxisID: 'y-axis-1'
      }]
    };
    const options = {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        }],
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: true
          },
          labels: {
            show: true
          },
          ticks: {max: upperBound,
          min: lowerBound}
        }]
      }
    };
    return (
      <Chart.Bar data={data} options={options} />
    );
  }

}
