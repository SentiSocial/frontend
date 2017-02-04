import * as React from 'react';
import * as Chart from 'react-chartjs-2'

import {TrendHistory} from '../../classes/trend';

import {moment} from '../../classes/helpers';

interface SpecificTrendsChartProps {
  history: TrendHistory[];
};

/**
* Handles data parsing and displaying data for a specific trend on line and bar
* graph.
* @author Dennis Tismenko
*/
export class SpecificTrendsChart
  extends React.Component <SpecificTrendsChartProps, undefined> {

  constructor(props) {
    super(props);
  }

  render() {
    const history = this.props.history;
    var data, options;
    if (history) {
      data = {
        labels: history.map(trend => moment(trend.timestamp * 1000).fromNow()),
        datasets: [{
          label: 'Sentiment',
          type: 'line',
          data: history.map(trend => trend.sentiment),
          fill: false,
          borderWidth: 2,
          pointRadius: 4,
          borderColor: '#666',
          backgroundColor: '#666',
          pointBorderColor: history
            .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
          pointBackgroundColor: history
            .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
          pointHoverBackgroundColor: history
            .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
          pointHoverBorderColor: history
            .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
          yAxisID: 'y-axis-2'
        }]
      };

      options = {
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
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: true,
              drawBorder: false
            },
            labels: {
              show: true
            },
            ticks: {
              display: false,
            }
          }, {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false,
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
            }
          }]
        }
      };
    }

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
