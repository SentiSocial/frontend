import * as React from 'react'
import {Router, Route, browserHistory} from 'react-router'

import Layout from 'views/layout.jsx'

import AllTrendsPage from 'views/pages/alltrends.jsx'
import TrendPage from 'views/pages/trend.jsx'
import AboutPage from 'views/pages/about.jsx'
import Status500 from 'views/pages/status500.jsx'
import Status404 from 'views/pages/status404.jsx'

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
