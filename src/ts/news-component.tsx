import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {moment} from './utility';

import {News} from './news';

interface NewsComponentProps {
  news: News;
};

interface NewsComponentState {
  descriptionHidden: boolean;
};

/**
 * NewsComponent handles the visual rendering of a News card.
 * @author Omar Chehab
 */
export class NewsComponent extends
  React.Component<NewsComponentProps, NewsComponentState> {

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
    const source = this.props.news.source;
    const time = moment(this.props.news.timestamp * 1000).fromNow();
    const title = this.props.news.title;
    const description = this.props.news.description;
    const media = this.props.news.media;
    const hidden = this.state.descriptionHidden;
    return (
      <div className="card col-xs-12"
        style={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        {media && <img className="card--image img-responsive"
          src={media}
          onClick={this.handleNewsClick}
        />}
        <div className="col-xs-12">
          <div className="card--header">
            <p className="card--source">{source}</p>
            <span className="card--time">{time}</span>
          </div>
          <div className="clearfix"></div>
          <h3 className="card--title"
            onClick={this.handleNewsClick}
          >
            {title}
          </h3>
          <div className="card--showdescription"
            onClick={this.handleHideDescriptionClick}
          >
            <i id="hideDescription"
              className={`glyphicon glyphicon-chevron-${hidden ? 'down' : 'up' }`}
            />
            <span>{hidden ? 'more' : 'less' } details</span>
          </div>
          <p className={`card--description ${hidden ? 'hidden' : ''}`}>{description}</p>
        </div>
      </div>
    );
  }
}
