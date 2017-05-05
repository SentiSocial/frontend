import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
import './navigation.scss'

/**
 * This class renders the navigation bar that is fixed to the top.
 * @author Omar Chehab
 */
export default class Navigation extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isCollapsed: true
    }
  }

  /**
   * When the device is mobile, Bootstrap collapses the links into a collapsable
   * panel. When the burger icon button is clicked, toggle the state.
   * @author Omar Chehab
   */
  onCollapseEvent = event => {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed
    }))
  }

  render () {
    const {isCollapsed} = this.state

    return (
      <nav className={`navigation ${isCollapsed ? 'collapse' : ''}`}
        onClick={this.onCollapseEvent}>
        <div className="navigation--logo">
          <img className="navigation--logo-img" src="/img/logo.png"/>
        </div>

        <Link to="/" tabIndex="0">
          <img className="navigation--option o0" src="/img/home.svg"/>
        </Link>

        <Link to="/about" tabIndex="0">
          <img className="navigation--option o1" src="/img/about.svg"/>
        </Link>
      </nav>
    )
  }
}
