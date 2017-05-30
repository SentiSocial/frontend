export function fetchAlltrends () {
  return dispatch => {
    return window.fetch('https://api.senti.social/alltrends')
      .then(response => response.json())
      .then(response => dispatch(fetchAlltrendsSuccess(response)))
      .catch(error => dispatch(fetchAlltrendsFailure(error)))
  }
}

function fetchAlltrendsSuccess (response) {
  return {
    type: 'FETCH_ALLTRENDS_SUCCESS',
    response
  }
}

function fetchAlltrendsFailure (error) {
  return {
    type: 'FETCH_ALLTRENDS_FAILURE',
    error
  }
}

export function fetchTrend (trendName) {
  trendName = window.encodeURIComponent(trendName)
  return dispatch => {
    return window.fetch(`https://api.senti.social/trend/${trendName}`)
      .then(response => response.json())
      .then(response => dispatch(fetchTrendSuccess(response)))
      .catch(error => dispatch(fetchTrendFailure(error)))
  }
}

function fetchTrendSuccess (response) {
  return {
    type: 'FETCH_TREND_SUCCESS',
    response
  }
}

function fetchTrendFailure (error) {
  return {
    type: 'FETCH_TREND_FAILURE',
    error
  }
}
