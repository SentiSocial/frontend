import * as React from 'react';

import {Card} from './card';
import {Article} from '../../classes/article';

interface ArticleCardProps {
  article: Article;
};

interface ArticleCardState {
  descriptionHidden: boolean;
};

/**
 * ArticleCard handles the visual rendering of a News card.
 * @author Omar Chehab
 */
export class ArticleCard extends React.Component<ArticleCardProps, ArticleCardState> {

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
  handleArticleClick = event => {
    window.open(this.props.article.link);
  }

  render() {
    const article = this.props.article;
    const hidden = this.state.descriptionHidden;
    return (
      <Card>
        {this.props.trend && <p className="card--trend">{this.props.trend}</p>}
        {article.media && <img className="card--image img-responsive"
          src={article.media}
          onClick={this.handleArticleClick}/>}
        <div className="col-xs-12">
          <div className="card--header">
            <p className="card--source">{article.source}</p>
            <span className="card--time">{article.timestamp}</span>
          </div>
          <div className="clearfix"></div>
          <h3 className="card--title"
            onClick={this.handleArticleClick}>
            {article.title}
          </h3>
          <div className="card--showdescription"
            onClick={this.handleHideDescriptionClick}>
            <i id="hideDescription"
              className={`glyphicon glyphicon-chevron-${hidden ? 'down' : 'up' }`}/>
            <span>Show {hidden ? 'more' : 'less' }</span>
          </div>
          <p className={`card--description ${hidden ? 'hidden' : ''}`}>
            {article.description}
          </p>
        </div>
      </Card>
    );
  }
}
