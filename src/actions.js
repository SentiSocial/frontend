export function fetchAlltrends () {
  return dispatch => {
    dispatch(fetchAlltrendsLoading())
    return window.fetch('https://api.senti.social/alltrends')
      .then(response => response.json())
      .then(response => dispatch(fetchAlltrendsSuccess(response)))
      .catch(error => dispatch(fetchAlltrendsFailure(error)))
  }
}

function fetchAlltrendsLoading () {
  return {
    type: 'FETCH_ALLTRENDS_LOADING'
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
    dispatch(fetchTrendLoading())
    return window.fetch(`https://api.senti.social/trend/${trendName}`)
      .then(response => response.json())
      .then(response => dispatch(fetchTrendSuccess(response)))
      .catch(error => dispatch(fetchTrendFailure(error)))
  }
}

function fetchTrendLoading () {
  return {
    type: 'FETCH_TREND_LOADING'
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

export function fetchContributors () {
  return dispatch => {
    dispatch(fetchContributorsLoading())
    return Promise.all([
      window.fetch(`https://api.github.com/repos/sentisocial/frontend/contributors`)
        .then(response => response.json()),
      window.fetch(`https://api.github.com/repos/sentisocial/backend/contributors`)
        .then(response => response.json()),
    ])
      .then(([ frontendContributors, backendContributors ]) =>
        [ ...frontendContributors, ...backendContributors ]
          .filter((userA, index, contributors) =>
            contributors.findIndex(userB => userA.id === userB.id) === index
          )
      )
      .then(response => dispatch(fetchContributorsSuccess(response)))
      .catch(error => dispatch(fetchContributorsFailure(error)))
  }
}

function fetchContributorsLoading () {
  return {
    type: 'FETCH_CONTRIBUTORS_LOADING'
  }
}

function fetchContributorsSuccess (response) {
  return {
    type: 'FETCH_CONTRIBUTORS_SUCCESS',
    response
  }
}

function fetchContributorsFailure (error) {
  return {
    type: 'FETCH_CONTRIBUTORS_FAILURE',
    error
  }
}
