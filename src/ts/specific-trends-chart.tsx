import * as React from "react";
import * as Chart from "react-chartjs-2"

/**
* Handles data parsing and displaying data for a specific trend.
* @author Dennis Tismenko
*/

const BarChart = Chart.Bar;
var data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Sentiment',
    type: 'line',
    data: [51, -25, 40, -36, 40, -37, 40],
    fill: false,
    borderColor: '#000000',
    backgroundColor: '#000000',
    pointBorderColor: '#000000',
    pointBackgroundColor: '#000000',
    pointHoverBackgroundColor: '#000000',
    pointHoverBorderColor: '#000000',
    yAxisID: 'y-axis-2'
  }, {
    type: 'bar',
    label: 'Tweets',
    data: [200, 185, 590, 621, 250, 400, 95],
    fill: false,
    backgroundColor: '#1da1f2',
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
      legend: {
  		position: 'left'
  		}
    }, {
      type: 'linear',
      display: true,
      position: 'right',
      id: 'y-axis-2',
      gridLines: {
        display: false
      },
      labels: {
        show: true
      }
    }]
  }
};

export class SpecificTrendsChart extends React.Component {
  render(){
  	return (
  		<BarChart data={data} options={options} />);
  }
}
