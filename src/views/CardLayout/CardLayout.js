import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import {isMobileDevice} from 'views/classes/helpers.js'

/**
 * Displays an array of React Components depending on the viewport width.
 *
 * If the device is mobile, it lays them out in one column.
 *
 * If the device is not mobile, it lays them out in two columns.
 */
export default class CardLayout extends PureComponent {
  static propTypes = {
    cards: PropTypes.array.isRequired
  }

  /**
   * Creates a new CardLayout
   */
  constructor (props) {
    super(props)

    this.handleResize = this.handleResize.bind(this)

    this.state = {
      isMobile: isMobileDevice()
    }
  }

  /**
   * When the component mounts, start listening to window resizes.
   */
  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
  }

  /**
   * When the component mounts, stop listening to window resizes.
   */
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  /**
   * When the window is resized, change the layout accordingly.
   */
  handleResize () {
    const resizedToMobile = !this.state.isMobile && isMobileDevice()
    const resizedToDesktop = this.state.isMobile && !isMobileDevice()
    if (resizedToDesktop || resizedToMobile) {
      this.setState(prev => ({
        isMobile: !prev.isMobile
      }))
    }
  }

  render () {
    let cardsComponent

    if (this.state.isMobile) {
      cardsComponent = (
        <div key="col-xs-a" className="cardlayout">
          {this.props.cards}
        </div>
      )
    } else {
      cardsComponent = [
        <div key="col-sm-a" className="cardlayout">
          {this.props.cards.filter((card, i) => i % 2 === 0)}
        </div>,
        <div key="col-sm-b"className="cardlayout">
          {this.props.cards.filter((card, i) => i % 2 === 1)}
        </div>
      ]
    }

    return (
      <div className="container">
        {cardsComponent}
      </div>
    )
  }
}
