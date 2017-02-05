import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'whatwg-fetch';
import {Promise} from 'promise-polyfill';
if (!window['Promise']) window['Promise'] = Promise;

import {NetworkBus} from './classes/networkbus';
import {Trend} from './types/trend';
import {NavigationComponent} from './components/navigation';
import {PageTrends} from './pages/alltrends';
import {PageSpecificTrends} from './pages/trend';

interface ApplicationState {
  selectedTrend: Trend;
};

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
      const name = selectedTrend.name;
      title = name;
      page = <PageSpecificTrends name={name} />;
    } else {
      // if there is no trend selected, display the home page.
      title = 'Senti Social';
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

document.body.removeChild(document.getElementById('loading'));

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
