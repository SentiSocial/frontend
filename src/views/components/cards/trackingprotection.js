import * as React from 'react'
import {Link} from 'react-router'
import './trackingprotection.scss'

import Card from 'views/components/cards/card.js'

export default function TrackingProtectionCard (props) {
  let type

  switch (props.type) {
    case 'twitter':
      type = <TrackingProtectionTwitterCard/>
      break;
  }

  return (
    <Card>
      <div className="trackingprotection--header">
        <img className="trackingprotection--icon" src="/img/tracking-protection.svg" />
        <span className="trackingprotection--text">Tracking Protection is enabled</span>
      </div>
      {type}
      <div className="trackingprotection--footer">
        <a href="https://support.mozilla.org/t5/Protect-your-privacy/Tracking-Protection-in-Private-Browsing/ta-p/36899">
          Learn more
        </a>
      </div>
    </Card>
  )
}

function TrackingProtectionTwitterCard (props) {
  return (
    <div>
      Contents of this card is supposed to be served from Twitter, however, your browser has blocked it.
    </div>
  )
}
