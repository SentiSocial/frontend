import * as React from "react";
import * as Chart from "react-chartjs-2"

import {SpecificTrendsDataPacket} from "./network-bus";

import {moment} from './utility';

interface SpecificTrendsChartProps {
  history: {
    start: number;
    end: number;
    data: SpecificTrendsDataPacket[];
  };
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
      var interval = Math
      .round((history.start - history.end)/ history.data.length);
      var timeStamps = [];
      var point = history.start;
      var currentTime = moment(point*1000).fromNow();
      for (let i = 0; i < history.data.length; i++){
        if (i == 0 || i == history.data.length-1){
          timeStamps.push(moment(point*1000).fromNow());
        } else {
          if (moment(point*1000).fromNow() != currentTime)
          {
            timeStamps.push(moment(point*1000).fromNow());
            currentTime = moment(point*1000).fromNow();
          } else {
            timeStamps.push("");
          }
        }
        point -= interval;
      }
      data = {
        labels: timeStamps,
        datasets: [{
          label: 'Sentiment',
          type: 'line',
          data: history.data.map(trend => trend.sentiment),
          fill: false,
          borderWidth: 1.5,
          pointRadius: 3.5,
          borderColor: '#666',
          backgroundColor: '#666',
          pointBorderColor: history.data
            .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
          pointBackgroundColor: history.data
            .map(trend => trend.sentiment > 0 ? '#59C891' : '#C85A59'),
          pointHoverBackgroundColor: history.data
            .map(trend => trend.sentiment > 0 ? '#226745' : '#672322'),
          pointHoverBorderColor: history.data
            .map(trend => trend.sentiment > 0 ? '#226745' : '#672322'),
          yAxisID: 'y-axis-2'
        }, {
          type: 'bar',
          label: 'Tweets',
          data: history.data.map(trend => trend.volume),
          fill: false,
          backgroundColor: '#1da1f2',
          borderColor: '#1da1f2',
          hoverBackgroundColor: '#1da1f2',
          hoverBorderColor: '#1da1f2',
          yAxisID: 'y-axis-1'
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
      <div>
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
