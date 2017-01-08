import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus, TrendPacket} from './network-bus';
import {NavigationComponent} from './navigation-component';
import {PageTrends} from './page-trends';
import {SpecificTrendsChart} from './specific-trends-chart';

interface ApplicationState {
  selectedTrend: TrendPacket;
}

class Application extends React.Component<undefined, ApplicationState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrend: undefined,
    }
  }

  /**
   * When a trend from the TrendsChart is clicked, change the page.
   * @author Omar Chehab
   */
  onTrendClick = (selectedTrend) => {
    this.setState({
      selectedTrend: selectedTrend,
    });
  }

  render() {
    var page;
    if (this.state.selectedTrend) {
      // if there is a selected trend, display the specifcic trend page.
      page = false;
    } else {
      // if there is no trend selected, display the home page.
      page = <PageTrends onTrendClick={this.onTrendClick} />;
    }
    return (
      <div>
        <NavigationComponent />
        {page}
      </div>
    );
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
