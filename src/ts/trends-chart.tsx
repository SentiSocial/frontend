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
    const trends = this.props.trends.trends;
    const data = {
      labels: trends.map(trend => trend.name),
      datasets: [{
        type: 'bar',
        label: 'Tweets',
        data: trends.map(trend => trend.sentiment),
        fill: false,
        backgroundColor: '#1da1f2',
        borderColor: '#1da1f2',
        hoverBackgroundColor: '#1da1f2',
        hoverBorderColor: '#1da1f2',
        yAxisID: 'y-axis-1'
      }]
    };
    const options = {};
    return (
      <Chart.Bar data={data} options={options} />
    );
  }

}
