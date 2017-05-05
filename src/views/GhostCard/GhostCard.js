import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Card from 'views/Card'
import {fiftyFifty, randomRange} from 'views/classes/helpers.js'

export default class GhostCard extends Component {
  render () {
    return (
      <Card>
        <GhostCardLine style={{width: randomRange(45, 75) + '%'}}/>
        <GhostCardLine style={{float: 'right', width: '28px'}}/>
        <GhostCardLine style={{marginTop: '12px'}}/>
        {fiftyFifty() && <GhostCardLine/>}
        {fiftyFifty() && <GhostCardLine/>}
        <GhostCardLine style={{width: randomRange(20, 60) + '%'}}/>
      </Card>
    )
  }
}

class GhostCardLine extends Component {
  static propTypes = {
    style: PropTypes.object
  }

  render () {
    const {style} = this.props
    const defaultStyle = {
      height: '12px',
      borderRadius: '15px',
      float: 'left',
      width: '100%',
      marginBottom: '6px',
      backgroundColor: fiftyFifty() ? '#ddd' : '#eee'
    }

    let combinedStyle = Object.assign(defaultStyle, style || {})

    return (
      <span style={combinedStyle}/>
    )
  }
}
