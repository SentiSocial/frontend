import * as React from 'react';
import * as ReactDOM from 'react-dom';

const moment = require('moment');

/**
 * This configures the format of the time displayed on the news card.
 * @author Omar Chehab
 */
moment.updateLocale('en', {
  relativeTime : {
    future: "in %s",
    past: "%s",
    s: "s",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1m",
    MM: "%dm",
    y: "1y",
    yy: "%dy",
  }
});

import {News} from './news';

interface NewsComponentProps {
  news: News;
};

/**
 * NewsComponent handles the visual rendering of a News card.
 * @author Omar Chehab
 */
export class NewsComponent extends
  React.Component<NewsComponentProps, undefined> {

  constructor(props) {
    super(props);
  }

  /**
   * When a News article is clicked, open the link in a new tab.
   * @author Omar Chehab
   */
  handleNewsClick = event => {
    window.open(this.props.news.link);
  }

  render() {
    const source = this.props.news.source;
    const time = moment(this.props.news.timestamp * 1000).fromNow();
    const title = this.props.news.title;
    return (
      <div className="card col-xs-12" onClick={this.handleNewsClick}>
        <h3>{title}</h3>
        <div className="clearfix"></div>
        <div className="card--header">
        <p>{source}</p>
        <span>{time}</span>
        </div>
      </div>
    );
  }
}
