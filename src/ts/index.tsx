import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus, TrendPacket} from './network-bus';
import {NavigationComponent} from './navigation-component';
import {PageTrends} from './page-trends';
import {PageSpecificTrends} from './page-specific-trends';
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
  handleTrendClick = selectedTrend => {
    this.setState({
      selectedTrend: selectedTrend,
    });
  };

  /**
   * When the back button from the Navigation component is clicked, go back to
   * the homepage.
   * @author Omar Chehab
   */
  handleBackEvent = event => {
    this.setState({
      selectedTrend: undefined,
    });
  };

  render() {
    const selectedTrend = this.state.selectedTrend;
    var page, title;
    if (this.state.selectedTrend) {
      // if there is a selected trend, display the specifcic trend page.
      const id = selectedTrend.id;
      const name = selectedTrend.name;
      title = name;
      page = <PageSpecificTrends id={id} name={name} />;
    } else {
      // if there is no trend selected, display the home page.
      title = 'Website Name';
      page = <PageTrends onTrendClick={this.handleTrendClick} />;
    }
    return (
      <div>
        <NavigationComponent
          title={title}
          onBackClick={this.handleBackEvent}
          canGoBack={!!selectedTrend}
        />
        {page}
      </div>
    );
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
