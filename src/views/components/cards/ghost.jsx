import * as React from 'react'

import Card from 'views/components/cards/card.jsx'
import {fiftyFifty, randomRange} from 'views/classes/helpers.js'

export default function GhostCard (props) {
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

function GhostCardLine (props) {
  const defaultStyle = {
    height: '12px',
    borderRadius: '15px',
    float: 'left',
    width: '100%',
    marginBottom: '6px',
    backgroundColor: fiftyFifty() ? '#ddd' : '#eee'
  }

  let style = Object.assign(defaultStyle, props.style || {})

  return (
    <span style={style}/>
  )
}

GhostCardLine.propTypes = {
  style: React.PropTypes.object
}
