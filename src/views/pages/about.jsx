import * as React from 'react'
import './about.scss'

export default function AboutPage (props) {
  return (
    <div id="about container">
      About
    </div>
  )
}

AboutPage.propTypes = {
  children: React.PropTypes.node.isRequired
}
