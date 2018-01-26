import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { Provider } from 'preact-redux'

import './style/index.scss'
import '../lib/ga'
import '../lib/twttr'

import store from './store'

import { fetchAlltrends } from './actions'

import Navigation from './components/Navigation'

import HomePage from 'async!./containers/HomePage'
import TrendPage from 'async!./containers/TrendPage'
import AboutPage from 'async!./containers/AboutPage'

// Uncomment this line to mock API requests
// import '../lib/mocks.js'

export default class App extends Component {
  componentDidMount() {
    this.fetchData()
    setInterval(this.fetchData.bind(this), 60000)
  }

  fetchData() {
    store.dispatch(fetchAlltrends())
  }

  /** Gets fired when the route changes.
   *  @param {Object} event    "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url  The newly routed URL
   */
  handleRoute = e => {
    window.ga('send', 'pageview', e.url);
  }

  render () {
    return (
      <Provider store={store}>
        <div id="app">
            <Navigation />
            <Router onChange={this.handleRoute}>
              <HomePage path="/" />
              <TrendPage path="/trends/:name" />
              <AboutPage path="/about" />
            </Router>
        </div>
      </Provider>
    )
  }
}
