import { connect } from 'preact-redux'

import {
  fetchAlltrends
} from '../actions'
import HomePage from '../routes/HomePage'

function mapStateToProps(state) {
  return {
    trends: state.alltrends
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestAlltrends: () => dispatch(fetchAlltrends())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
