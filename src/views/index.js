import * as React from 'react'
import {Router, Route, browserHistory} from 'react-router'

import Layout from 'views/layout.js'

import AllTrendsPage from 'views/pages/alltrends.js'
import TrendPage from 'views/pages/trend.js'
import AboutPage from 'views/pages/about.js'
import Status500 from 'views/pages/status500.js'
import Status404 from 'views/pages/status404.js'

export default function Application () {
  return (
    <Router history={browserHistory}>
      <Route component={Layout}>
        {/* Home */}
        <Route path="/" component={AllTrendsPage}/>

        {/* TrendPage */}
        <Route path="/trend/:name" component={TrendPage}/>

        {/* AboutPage */}
        <Route path="/about" component={AboutPage}/>

        <Route path="/500" component={Status500}/>
        <Route path="*" component={Status404}/>
      </Route>
    </Router>
  )
}
