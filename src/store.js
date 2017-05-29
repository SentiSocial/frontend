import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers'

const store = createStore(
  reducers, {
    // Default application state
    alltrends: undefined
  },
  applyMiddleware(
    thunkMiddleware
  )
)

export default store
