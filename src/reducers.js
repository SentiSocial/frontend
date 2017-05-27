import {
  fetchAlltrends,
  fetchAlltrendsSuccess,
  fetchAlltrendsFailure
} from './actions'

const REDUCERS = {
	FETCH_ALLTRENDS: (state) => {
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
  }
}

export default (state, action) => (
	action && REDUCERS[action.type] ? REDUCERS[action.type](state, action) : state
)
