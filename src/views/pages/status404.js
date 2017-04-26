import * as React from 'react'
import {Link} from 'react-router'
import './status.scss'

export default function Status404Page (props) {
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
        404 error! Page not found.
      </p>

      <p className="status500--blame">
        Go back <Link to="/">home</Link>?
      </p>
    </div>
  )
}
