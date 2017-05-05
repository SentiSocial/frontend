import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Card from 'views/Card'

class TrackingProtectionCard extends PureComponent {
  static propTypes = {
    type: PropTypes.string
  }

  render () {
    const {type} = this.prop
    let message

    switch (type) {
      case 'twitter':
        message = <TwitterMessage />
        break
    }

    return (
      <Card>
        <div className="trackingprotection--header">
          <img className="trackingprotection--icon" src="/img/tracking-protection.svg" />
          <span className="trackingprotection--text">Tracking Protection is enabled</span>
        </div>
        {message}
        <div className="trackingprotection--footer">
          <a href="https://support.mozilla.org/t5/Protect-your-privacy/Tracking-Protection-in-Private-Browsing/ta-p/36899">
            Learn more
          </a>
        </div>
      </Card>
    )
  }
}

function TwitterMessage (props) {
  return (
    <div>
      Contents of this card is supposed to be served from Twitter, however, your browser has blocked it.
    </div>
  )
}

export default TrackingProtectionCard
