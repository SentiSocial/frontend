import * as React from "react";
import * as Chart from "react-chartjs-2";

/**
* Handles data parsing and displaying data for a specific trend.
* @author Dennis Tismenko
*/
interface TrendsChartProps{

}

interface TrendsChartState{

}

const BarChart = Chart.Bar;
var data = 4;
var options = 4;

export class TrendsChart extends React.Component <TrendsChartProps, TrendsChartState> {
  render() {
    return (
    <BarChart data={data} options={options} />);
  }
}
