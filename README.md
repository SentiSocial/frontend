# sentisocial-frontend
## Web frontend for SentiSocial

[![License: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)]()

Created at The University of Toronto Scarborough's Hack the Valley 2017

SentiSocial is a Twitter based news aggregation and sentiment analysis tool.
This repository contains the SentiSocial frontend, which queries the backend for
information related to current trends, tweets, news and sentiment values
related to each one. It is written in TypeScript and Less, built on React,
uses Bootstrap and ChartJS.

The SentiSocial backend can be found [here](github.com/SentiSocial/sentisocial-backend)

## Prerequisites

* NodeJS ^6.9.4
* Node Package Manager

## Installation

```
npm install
npm test
npm run build
npm start
```

To build the project for production
* `npm run build`

To build the project for development
* `npm run build-dev`

For consistent code style
* `npm run lint`

To run all the tests
* `npm test`

To host directly from node on port 80
* `npm run start`

## Development

Client project is built using

* [Typescript](https://www.typescriptlang.org/)
* [Less](http://lesscss.org/)
* [React](https://facebook.github.io/react/)
* [Bootstrap](http://getbootstrap.com/)
* [ChartJS](http://www.chartjs.org/)

For versions check package.json
