import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { route } from 'preact-router'
import { navigateToTrendPage } from '../../actions.js'
import style from './style.scss'
const s = name => style[name] || name

import AllTrendsChart from '../../components/AllTrendsChart'

class HomePage extends Component {
  onTrendClick = trend => {
    const trendName = window.encodeURIComponent(trend.name)
    route(`/trend/${trendName}`)
  }

  render ({ trends }) {
    return (
      <div class={s('homepage')}>
        <AllTrendsChart
          trends={trends}
          onTrendClick={this.onTrendClick}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    trends: state.alltrends
  })
)(HomePage)
