import * as React from 'react';

import {Card} from './card';
import {News} from '../../classes/news';

interface NewsCardProps {
  news: News;
};

interface NewsCardState {
  descriptionHidden: boolean;
};

/**
 * NewsCard handles the visual rendering of a News card.
 * @author Omar Chehab
 */
export class NewsCard extends React.Component<NewsCardProps, NewsCardState> {

  constructor(props) {
    super(props);
    this.state = {
      descriptionHidden: true,
    };
  }

  handleHideDescriptionClick = event => {
    this.setState(prevState => ({
      descriptionHidden: !prevState.descriptionHidden,
    }));
  }

  /**
   * When a News article is clicked, open the link in a new tab.
   * @author Omar Chehab
   */
  handleNewsClick = event => {
    window.open(this.props.news.link);
  }

  render() {
    const news = this.props.news;
    const hidden = this.state.descriptionHidden;
    return (
      <Card>
        {news.media && <img className="card--image img-responsive"
          src={news.media}
          onClick={this.handleNewsClick}
        />}
        <div className="col-xs-12">
          <div className="card--header">
            <p className="card--source">{news.source}</p>
            <span className="card--time">{news.timestamp}</span>
          </div>
          <div className="clearfix"></div>
          <h3 className="card--title"
            onClick={this.handleNewsClick}
          >
            {news.title}
          </h3>
          <div className="card--showdescription"
            onClick={this.handleHideDescriptionClick}
          >
            <i id="hideDescription"
              className={`glyphicon glyphicon-chevron-${hidden ? 'down' : 'up' }`}
            />
            <span>{hidden ? 'more' : 'less' } details</span>
          </div>
          <p className={`card--description ${hidden ? 'hidden' : ''}`}>
            {news.description}
          </p>
        </div>
      </Card>
    );
  }
}
