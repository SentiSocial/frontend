import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { Provider } from 'preact-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import './style'
import '../lib/ga'
import '../lib/twttr'

import reducers from './reducers'

import Navigation from './components/Navigation'
import HomePage from './containers/HomePage';
import TrendPage from './routes/TrendPage';

const store = createStore(
  reducers, {
    // Default application state
    alltrends: undefined
  },
  applyMiddleware(
    thunkMiddleware
  )
)

export default class App extends Component {
  /** Gets fired when the route changes.
   *  @param {Object} event    "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url  The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url
  };

  render () {
    return (
      <Provider store={store}>
        <div id="app">
            <Navigation />
            <Router onChange={this.handleRoute}>
              <HomePage path="/" />
              <TrendPage path="/trend/:name" />
            </Router>
        </div>
      </Provider>
    )
  }
}
