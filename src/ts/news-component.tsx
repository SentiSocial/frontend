import * as React from 'react';
import * as ReactDOM from 'react-dom';

const moment = require('moment');

moment.updateLocale('en', {
  relativeTime : {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  }
});

import {News} from './news';

interface NewsComponentProps {
  news: News;
};

export class NewsComponent extends
  React.Component<NewsComponentProps, undefined> {

  constructor(props) {
    super(props);
  }

  render() {
    const source = this.props.news.source;
    const time = moment(this.props.news.timestamp * 1000).fromNow();
    const title = this.props.news.title;
    return (
      <div>
        <h3>{source}</h3>
        <span>{time}</span>
        <p>{title}</p>
      </div>
    );
  }
}
