<div align="center">
  <img src="logo.png" height="250" width="250" />
  <h1>SentiSocial Frontend</h1>
  <!-- Travis -->
  <a href="https://travis-ci.org/SentiSocial/frontend">
    <img alt="travis" src="https://travis-ci.org/SentiSocial/frontend.svg?branch=master">
  </a>
  <!-- Coveralls -->
  <a href="https://coveralls.io/github/SentiSocial/frontend?branch=master">
    <img alt="coverage"
      src="https://coveralls.io/repos/github/SentiSocial/frontend/badge.svg?branch=master"  />
  </a>
  <!-- License -->
  <a href="https://github.com/SentiSocial/frontend/blob/master/LICENSE">
    <img alt="license: MIT"
      src="https://img.shields.io/badge/license-MIT-blue.svg">
  </a>
  <!-- Code Style -->
  <a href="https://standardjs.com">
    <img alt="code style: standard"
      src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
  </a>
</div>

Originally created at The University of Toronto Scarborough's Hack the Valley 2017.

SentiSocial is a Twitter based trend analysis application. This repository contains
the SentiSocial frontend, which queries the backend for information related to
current trends, tweets, news and sentiment values related to each one.

The data is gathered by the SentiSocial backend, which can be found
[here](https://github.com/SentiSocial/backend).

## Prerequisites

* git
* Node Boron

or

* git
* Docker

## Production

```
git clone https://github.com/sentisocial/frontend
cd frontend
npm install
npm run build
npm start
```

Alternatively, with Docker

```
git clone https://github.com/sentisocial/frontend
cd frontend
docker-compose up
```

## Development

Get SentiSocial locally for development

```
git clone https://github.com/sentisocial/frontend
cd frontend
npm test
npm run lint # auto lint
npm run dev # hot module replacement
```

It will be helpful if you are familiar with the following

* [React](https://facebook.github.io/react)
* [SCSS](https://github.com/sass/sass)

Feel free to contribute, by testing, documentating, developing new features, or
even changing how the site looks.

Don't forget to run the tests, lint, and build the project before committing

* `npm run build`
* `npm test`
