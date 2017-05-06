import React from 'react'
import {Link} from 'react-router-dom'

export default function Status404Page (props) {
  return (
    <div id="status404">
      <span className="status404--title">
        SentiSocial
      </span>

      <img
        className="status404--logo"
        src="/img/logo.png"
        alt="Senti Social Logo"
        />

      <img
        className="status404--sad"
        src="/img/sad.svg"
        alt="Sad face"
        />

      <p className="status404--text">
        404 error! Page not found.
      </p>

      <p className="status404--blame">
        Go back <Link to="/">home</Link>?
      </p>
    </div>
  )
}
