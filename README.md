<img
  src="logo.png"
  style="
    display: block;
    margin: 0 auto;
    width: 250px;
    height: 250px;
    background-color: transparent
  "
/>

<div style="text-align: center;">
<h1>SentiSocial-Frontend</h1>
<!-- Travis -->
<a href="https://travis-ci.org/SentiSocial/sentisocial-frontend">
  <img alt="travis" src="https://travis-ci.org/SentiSocial/sentisocial-frontend.svg?branch=master">
</a>
<!-- Coveralls -->
<a href="https://coveralls.io/github/SentiSocial/sentisocial-frontend?branch=master">
  <img alt="coverage"
    src="https://coveralls.io/repos/github/SentiSocial/sentisocial-frontend/badge.svg?branch=master"  />
</a>
<!-- License -->
<a href="https://github.com/SentiSocial/sentisocial-frontend/blob/master/LICENSE">
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
[here](https://github.com/SentiSocial/sentisocial-backend).

## Prerequisites

* Node ^6.9.4
* NPM
* [Yarn](https://yarnpkg.com) (`npm install -g yarn`)

## Development

Get SentiSocial locally for development

```
git clone https://github.com/sentisocial/sentisocial-frontend
cd sentisocial-frontend
yarn
npm run test
npm run build
npm run start
```

It will be helpful if you are familiar with the following

* [React](https://facebook.github.io/react)
* [SCSS](https://github.com/sass/sass)

## Contribution

Feel free to contribute, by testing, documentating, developing new features, or
even changing how the site looks.

To build the project for production
* `npm run build`

Don't forget to lint and test before committing
* `npm run lint`
* `npm test`

If you want to serve the `dist` folder
* `npm start`
