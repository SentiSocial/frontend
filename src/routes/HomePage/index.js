import { h, Component } from 'preact'
import style from './style'

import AllTrendsChart from '../../components/AllTrendsChart'

export default class Home extends Component {
  state = {
    trends: undefined
  }

  onTrendClick = trend => {
    trend = encodeURIComponent(trend.name)
    this.props.router.push(`/trend/${trend}`)
  }

  render () {
    return (
      <div class={style.home}>
        <AllTrendsChart
          trends={this.state.trends}
          onTrendClick={this.onTrendClick}
        />
      </div>
    )
  }
}
