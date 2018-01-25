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
      alltrends: null,
      error
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
      trend: null,
      error
    }
  },

  FETCH_CONTRIBUTORS_LOADING: (state) => {
    return {
      ...state,
      contributors: null
    }
  },

  FETCH_CONTRIBUTORS_SUCCESS: (state, { response }) => {
    return {
      ...state,
      contributors: response
    }
  },

  FETCH_CONTRIBUTORS_FAILURE: (state, { error }) => {
    return {
      ...state,
      contributors: null,
      error
    }
  }
}

export default (state, action) => (
  action && REDUCERS[action.type]
  ? REDUCERS[action.type](state, action)
  : state
)
