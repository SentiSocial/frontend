import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {moment} from './utility';

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
      <div className="card col-xs-12"
        style={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
        onClick={this.handleNewsClick}
      >
        <img className="card--image img-responsive"
          src={this.props.news.media}
        />
        <div className="col-xs-12">
          <div className="card--header">
            <p className="card--source">{source}</p>
            <span className="card--time">{time}</span>
          </div>
          <div className="clearfix"></div>
          <h3 className="card--title">{title}</h3>
        </div>
      </div>
    );
  }
}
