import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'

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
    console.log(props)
    return (
      <nav className={style["navigation"]}
        data-opened={isOpen}
      >
        <button className={style["navigation--logo"]}
          onClick={this.handleClick}
        >
          <img className={style["navigation--logo-img"]}
            src="/assets/graphics/logo.png"
          />
        </button>

        <Link className={style["navigation--option"]}
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

        <Link className={style["navigation--option"]}
          href="/about"
          tabindex={isOpen ? 0 : -1}
          aria-disabled={isOpen}
          data-index={1}
        >
          <img src="/assets/graphics/about.svg"
          />
        </Link>
      </nav>
    )
  }
}
