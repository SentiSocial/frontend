import { h, Component } from 'preact'
import { Provider } from 'preact-redux';
import { Router } from 'preact-router'

import './style'
import './lib/ga'
import './lib/twttr'

import store from './store';
import Navigation from './components/Navigation'
import HomePage from './routes/HomePage';
import TrendPage from './routes/TrendPage';

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
      <div id="app">
        <Provider store={store}>
          <Navigation />
          <Router onChange={this.handleRoute}>
            <HomePage path="/" />
            <TrendPage path="/trend/:name" />
          </Router>
        </Provider>
      </div>
    )
  }
}
