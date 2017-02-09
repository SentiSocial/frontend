import * as React from 'react';
import * as Chart from 'react-chartjs-2';

import {TrendChart} from '../../classes/chart';
import {moment} from '../../classes/helpers';
import {TrendHistory} from '../../types/trend';

/**
* Handles data parsing and displaying data for a specific trend on line and bar
* graph.
* @author Dennis Tismenko
*/
interface TrendChartVisualProps {
  history: TrendHistory[];
}
export class TrendChartVisual
  extends React.Component <TrendChartVisualProps, undefined> {
  protected trend: TrendChart;

  constructor(props) {
    super(props);
    this.trend = new TrendChart(this.props.history);
  }

  render() {
    let data, options;
    data = this.trend.getData();
    options = this.trend.getOptions();

    return (
      <div className="container">
        <div className="chart-container">
          {history
            && <Chart.Bar data={data} options={options} />
          }
        </div>
        <div className="chart-container--line"/>
      </div>
    );
  }
}
