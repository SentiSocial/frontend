const REDUCERS = {
  FETCH_ALLTRENDS_LOADING: (state) => {
    return {
      ...state,
      alltrends: null
    }
  },

  FETCH_ALLTRENDS_SUCCESS: (state, { response }) => {
    return {
      ...state,
      alltrends: response.trends
    }
  },

  FETCH_ALLTRENDS_FAILURE: (state, { error }) => {
    return {
      ...state,
      alltrends: error
    }
  },

  FETCH_TREND_LOADING: (state) => {
    return {
      ...state,
      trend: null
    }
  },

  FETCH_TREND_SUCCESS: (state, { response }) => {
    return {
      ...state,
      trend: response
    }
  },

  FETCH_TREND_FAILURE: (state, { error }) => {
    return {
      ...state,
      trend: error
    }
  }
}

export default (state, action) => (
  action && REDUCERS[action.type]
  ? REDUCERS[action.type](state, action)
  : state
)
