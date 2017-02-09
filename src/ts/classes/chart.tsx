import {TrendHistory} from '../types/trend';
import {moment} from './helpers';
/**
* Handles data parsing and displaying data for a specific trend on line and bar
* graph.
* @author Dennis Tismenko
*/

export class TrendChart {
  protected data;
  protected options;
  protected history: TrendHistory[];

  constructor(history) {
    this.history = history;
    this.options = {
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

  getData() {
    if (this.history) {
      this.data = {
        labels: this.history.map(trend => moment(trend.timestamp * 1000).fromNow()),
        datasets: [{
          label: 'Sentiment',
          type: 'line',
          data: this.history.map(trend => trend.sentiment),
          fill: false,
          borderWidth: 2,
          pointRadius: 4,
          borderColor: '#666',
          backgroundColor: '#666',
          pointBorderColor: this.history
            .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
          pointBackgroundColor: this.history
            .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
          pointHoverBackgroundColor: this.history
            .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
          pointHoverBorderColor: this.history
            .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
          yAxisID: 'y-axis-2'
        }]
      };
    }
    return this.data;
  }
  getOptions() {
    return this.options;
  }
}
