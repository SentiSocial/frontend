import * as React from 'react';
import * as ReactDOM from 'react-dom';

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
    return (
      <div>
        <h3>{this.props.news.source}</h3>
        <span>{this.props.news.timestamp}</span>
        <p>{this.props.news.title}</p>
      </div>
    );
  }
}
