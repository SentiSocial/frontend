import { h, Component } from 'preact'
import { route } from 'preact-router';
import style from './style'

import AllTrendsChart from '../../components/AllTrendsChart'

export default class HomePage extends Component {
  componentDidMount() {
    const {
      trends,
      requestAlltrends
    } = this.props
    if (trends === undefined) {
      requestAlltrends()
    }
  }

  onTrendClick = trend => {
    const trendName = encodeURIComponent(trend.name)
    route(`/trend/${trendName}`)
  }

  render ({ trends }) {
    return (
      <div class={style.home}>
        <AllTrendsChart
          trends={trends}
          onTrendClick={this.onTrendClick}
        />
      </div>
    )
  }
}
