import * as React from 'react'
import './status.scss'

export default function Status500Page (props) {
  return (
    <div id="status500">
      <span className="status500--title">
        SentiSocial
      </span>

      <img
        className="status500--logo"
        src="/img/logo.png"
        alt="Senti Social Logo"
        />

      <img
        className="status500--sad"
        src="/img/sad.svg"
        alt="Sad face"
        />

      <p className="status500--text">
        Whoops! Looks like the server is down.
      </p>

      <p className="status500--blame">
        <a href="https://github.com/sentisocial">https://github.com/sentisocial</a>
      </p>
    </div>
  )
}
