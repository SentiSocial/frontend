import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {NetworkBus} from './network-bus';

ReactDOM.render(
  <p>Hello World!</p>,
  document.getElementById('root')
);


NetworkBus.getTrends(response => {
  console.log(response);
});
NetworkBus.getSpecificTrends(response => {
  console.log(response);
}, 0);
NetworkBus.getContent(response => {
  console.log(response);
}, 0);
NetworkBus.getSpecificContent(response => {
  console.log(response);
}, 0, 0);
