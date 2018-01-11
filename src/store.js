import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers, {
    // Default application state
    alltrends: undefined
  },
  composeEnhancers(applyMiddleware(
    thunkMiddleware
  ))
)

export default store
