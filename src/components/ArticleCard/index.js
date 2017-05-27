import { h, Component } from 'preact'
import style from './style.scss'
const s = name => style[name] || name
/**
 * ArticleCard handles the visual rendering of a News card.
 */
export default class ArticleCard extends Component {
  state = {
    descriptionHidden: true
  }

  handleHideDescriptionClick = () => {
    this.setState(prevState => ({
      descriptionHidden: !prevState.descriptionHidden
    }))
  }

  render () {
    const {
      link,
      media,
      source,
      timestamp,
      title,
      description
    } = this.props
    const {
      descriptionHidden
    } = this.state
    return (
      <div className={s('card')} style={{overflowY: 'initial'}}>
        {media &&
          <a href={link}>
            <img
              className={s('article--image')}
              src={media}
              onClick={this.handleArticleClick}
            />
          </a>
        }

        <div>
          <div className={s('article--header')}>
            <span className={s('article--source')}>
              {source}
            </span>

            <span className={s('article--time')}>
              {timestamp}
            </span>
          </div>

          <a href={link}>
            <h3
              className={s('article--title')}
              onClick={this.handleArticleClick}
            >
              {title}
            </h3>
          </a>

          <div
            className={s('article--showdescription')}
            onClick={this.handleHideDescriptionClick}
          >
            <img
              className={s('article--showdescription-icon')}
              src={descriptionHidden
                ? '/img/show-circle.svg'
                : '/img/hide-circle.svg'}
            />
          </div>

          <p className={s('article--description')}
            hidden={descriptionHidden ? 'true' : ''}>
            {description}
          </p>
        </div>
      </div>
    )
  }
}
