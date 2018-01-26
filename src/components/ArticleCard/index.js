import { h, Component } from 'preact'
import style from './style.scss'
import RelativeTime from '../RelativeTime'
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
      <div
        className={s('card') + ' ' + s('card--responsive')}
        style={{
          overflowY: 'initial',
          padding: 0
        }}
      >
        {media &&
          <a href={link}>
            <img
              className={s('article--image')}
              src={media}
              onClick={this.handleArticleClick}
            />
          </a>
        }

        <div style={{ padding: '0 15px' }}>
          <div className={s('article--header')}>
            <span className={s('article--source')}>
              {source}
            </span>

            <span className={s('article--time')}>
              <RelativeTime value={timestamp * 1000} />
            </span>
          </div>

          <a href={link} style={{ textDecoration: 'none' }}>
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
                ? '/assets/graphics/show-circle.svg'
                : '/assets/graphics/hide-circle.svg'}
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
