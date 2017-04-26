# sentisocial-frontend
## Web frontend for SentiSocial

[![Travis][travis-badge]][travis-link]
[![Standard - JavaScript Style Guide][standard-badge]][standard-link]
[![License: MIT][license-badge]][license-link]

Created at The University of Toronto Scarborough's Hack the Valley 2017

SentiSocial is a Twitter based news aggregation and sentiment analysis tool.
This repository contains the SentiSocial frontend, which queries the backend for
information related to current trends, tweets, news and sentiment values
related to each one.

The SentiSocial backend can be found [here](https://github.com/SentiSocial/sentisocial-backend)

## Prerequisites

* Node ^6.9.4
* npm
* [Yarn](https://yarnpkg.com) (`npm install -g yarn`)

## Development

Get SentiSocial locally for development

```
git clone https://github.com/sentisocial/sentisocial-frontend
cd sentisocial-frontend
yarn
npm test
npm run build
npm start
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

[travis-badge]: https://img.shields.io/travis/SentiSocial/sentisocial-frontend.svg
[travis-link]: https://travis-ci.org/SentiSocial/sentisocial-frontend
[standard-badge]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-link]: http://standardjs.com
[license-badge]: https://img.shields.io/badge/license-license-brightgreen.svg
[license-link]: ./LICENSE
