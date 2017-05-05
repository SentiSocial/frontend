import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default class Card extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    const {children} = this.props

    return (
      <article className="card" {...this.props}>
        {children}
      </article>
    )
  }
}
