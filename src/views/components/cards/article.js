import * as React from 'react'
import './article.scss'

import Card from 'views/components/cards/card.js'
import Article from 'views/types/article.js'

/**
 * ArticleCard handles the visual rendering of a News card.
 * @author Omar Chehab
 */
export default class ArticleCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      descriptionHidden: true
    }
  }

  handleHideDescriptionClick = event => {
    this.setState(prevState => ({
      descriptionHidden: !prevState.descriptionHidden
    }))
  }

  /**
   * When a News article is clicked, open the link in a new tab.
   * @author Omar Chehab
   */
  handleArticleClick = event => {
    window.open(this.props.article.link)
  }

  render () {
    const article = this.props.article
    const hidden = this.state.descriptionHidden
    return (
      <Card>
        {article.media && <img
          className="article--image"
          src={article.media}
          onClick={this.handleArticleClick}
          />}

        <div>
          <div className="article--header">
            <span className="article--source">
              {article.source}
            </span>

            <span className="article--time">
              {article.timestamp}
            </span>
          </div>

          <h3
            className="article--title"
            onClick={this.handleArticleClick}
            >
            {article.title}
          </h3>

          <div
            className="article--showdescription"
            onClick={this.handleHideDescriptionClick}
            >
            <img
              className="article--showdescription-icon"
              src={hidden
                ? '/img/show-circle.svg'
                : '/img/hide-circle.svg'}
              />
          </div>

          <p className={`article--description ${hidden ? 'hidden' : ''}`}>
            {article.description}
          </p>
        </div>
      </Card>
    )
  }
}

ArticleCard.propTypes = {
  article: React.PropTypes.instanceOf(Article).isRequired
}
