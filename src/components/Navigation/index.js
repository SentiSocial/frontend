import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.scss'
const s = name => style[name] || name

/**
 * This class renders the navigation bar that is fixed to the top.
 */
export default class Navigation extends Component {
  state = {
    isOpen: false
  }

  handleClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  render (props, { isOpen }) {
    return (
      <nav className={s("navigation")}
        data-opened={isOpen}
      >
        <button className={s("navigation--logo")}
          onClick={this.handleClick}
        >
          <img className={s("navigation--logo-img")}
            src="/assets/graphics/logo.png"
          />
        </button>

        <Link className={s("navigation--option")}
          href="/"
          tabindex={isOpen ? 0 : -1}
          aria-disabled={isOpen}
          data-index={0}
        >
          <img src="/assets/graphics/home.svg"
            style={{
              padding: 8
            }}
          />
        </Link>

        <Link className={s("navigation--option")}
          href="/about"
          tabindex={isOpen ? 0 : -1}
          aria-disabled={isOpen}
          data-index={1}
        >
          <img src="/assets/graphics/about.svg" />
        </Link>
      </nav>
    )
  }
}
