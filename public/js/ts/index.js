"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var network_bus_1 = require("./network-bus");
ReactDOM.render(React.createElement("p", null, "Hello World!"), document.getElementById('root'));
// NetworkBus.getTrends((err, response) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(response);
// });
// NetworkBus.getContent((err, response) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(response);
// }, 0);
network_bus_1.NetworkBus.getSpecificTrends(function (err, response) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(response);
}, 1);
// NetworkBus.getSpecificContent((err, response) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(response);
// }, 0, 0);
