import * as React from 'react'

import Navigation from 'views/components/navigation.js'

export default function Layout (props) {
  return (
    <div>
      <Navigation/>
      {props.children}
    </div>
  )
}

Layout.propTypes = {
  children: React.PropTypes.node.isRequired
}
