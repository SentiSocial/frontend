import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {NetworkBus} from './network-bus';

ReactDOM.render(
  <p>Hello World!</p>,
  document.getElementById('root')
);


NetworkBus.getTrends((err, response) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(response);
});
// NetworkBus.getSpecificTrends((err, response) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(response);
// }, 0);
// NetworkBus.getContent((err, response) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(response);
// }, 0);
// NetworkBus.getSpecificContent((err, response) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(response);
// }, 0, 0);
