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
    const fiddleData = [5, 25, -13, 12, 14, 19, -20, 30, 40, 20, 25, -40];
    const fiddleBars = [50, 250, 130, 120, 140, 190, 200, 300, 400, 200, 250, 400];
    var data, options;
    if (history) {
      var interval = Math
      .round((history.start - history.end)/ fiddleData.length);
      var timeStamps = [];
      var point = history.start;
      var currentTime = moment(point*1000).fromNow();
      for (let i = 0; i < fiddleData.length; i++){
        if (i == 0){
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
          data: fiddleData,
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
          //data: history.data.map(trend => trend.volume),
          data: fiddleBars,
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
