import React, {Component, PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Navigation from 'views/Navigation'
import AllTrendsPage from 'views/AllTrendsPage'
import TrendPage from 'views/TrendPage'
import AboutPage from 'views/AboutPage'
import Status500Page from 'views/Status500Page'
import Status404Page from 'views/Status404Page'

class Application extends Component {
  static propTypes = {}

  render () {
    return (
      <Router>
        <Layout>
          {/* Home */}
          <Route exact path="/" component={AllTrendsPage}/>

          {/* Trend Page */}
          <Route path="/trend/:name" component={TrendPage}/>

          {/* About Page */}
          <Route path="/about" component={AboutPage}/>

          {/* Error Pages */}
          <Route path="/500" component={Status500Page}/>
          <Route path="*" component={Status404Page}/>
        </Layout>
      </Router>
    )
  }
}

class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    const {children} = this.props
    return (
      <div>
        <Navigation/>
        {children}
      </div>
    )
  }
}

export default Application
