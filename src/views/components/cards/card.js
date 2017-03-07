import * as React from 'react'
import './card.scss'

export default function Card (props) {
  return (
    <article className="card">
      {props.children}
    </article>
  )
}

Card.propTypes = {
  children: React.PropTypes.node.isRequired
}
