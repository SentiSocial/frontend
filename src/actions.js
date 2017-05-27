export function fetchAlltrends() {
  return dispatch => {
    return fetch('https://api.senti.social/alltrends')
      .then(response => response.json())
      .then(response => dispatch(fetchAlltrendsSuccess(response)))
      .catch(error => dispatch(fetchAlltrendsFailure(error)))
  }
}

export function fetchAlltrendsSuccess(response) {
  return {
    type: 'FETCH_ALLTRENDS_SUCCESS',
    response
  };
}

export function fetchAlltrendsFailure(error) {
  return {
    type: 'FETCH_ALLTRENDS_FAILURE',
    error
  };
}
