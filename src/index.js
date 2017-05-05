import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

function render () {
  let Application = require('./views').default
  ReactDOM.render(
    <Application />,
    document.getElementById('root')
  )
}

render()

window.trackingProtection = false
// Twitter Tracking Protection Detection
;(function () {
  let img = document.createElement('img')
  img.style.display = 'none'
  img.src = 'https://twitter.com/favicon.ico'
  img.addEventListener('load', function () {
    document.body.removeChild(img)
  })
  img.addEventListener('error', function (err) {
    if (!err.name && !err.message) {
      window.trackingProtection = true
    }
    document.body.removeChild(img)
  })
  document.body.appendChild(img)
})()

if (process.env.NODE_ENV === 'production') {
  // Service Worker
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    navigator.serviceWorker.register('/service-worker.js')
  }

  // Google Analytics
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }; i[r].l = 1 * new Date(); a = s.createElement(o)
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')
  window.ga('create', 'UA-90487550-1', 'auto')
  window.ga('send', 'pageview')
} else {
  if (module.hot) {
    module.hot.accept('./views', render)
  }
}
