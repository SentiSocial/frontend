import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'whatwg-fetch';
import {Promise} from 'promise-polyfill';
if (!window['Promise']) window['Promise'] = Promise;

import {NetworkBus} from './classes/networkbus';
import {Trend} from './types/trend';
import {NavigationComponent} from './components/navigation';

import {AllTrendsPage} from './pages/alltrends';
import {TrendPage} from './pages/trend';
import {Status500} from './pages/status500';

function stopLoading() {
  const loading = document.getElementById('loading');
  document.body.removeChild(loading);
}

interface ApplicationState {
  selectedTrend: Trend;
  page: any;
  title: string;
};

class Application extends React.Component<undefined, ApplicationState> {
  constructor(props) {
    super(props);
    
    this.state = {
      title: 'SentiSocial',
      page: <AllTrendsPage
        onLoad={this.handlePageLoad}
        onTrendClick={this.handleTrendClick}/>,
      selectedTrend: undefined,
    };
  }

  /**
   * Event listener for when page has retrieved it's necessary data.
   * (error) => void
   * error: If there was an error loading the page.
   * @author Omar Chehab
   */
  handlePageLoad = (error?) => {
    if (error) {
      this.setPageStatus500();
      return;
    }
    stopLoading();
  }

  /**
   * When a trend from the TrendsChart is clicked, change the page.
   * @author Omar Chehab
   */
  handleTrendClick = selectedTrend => {
    if (selectedTrend) {
      // if there is a selected trend, display the specific trend page.
      this.setPageTrend(selectedTrend);
    } else {
      // if there is no trend selected, display the home page.
      this.setPageAllTrends();
    }
  }

  /**
   * When the back button from the Navigation component is clicked, go back to
   * the homepage.
   * @author Omar Chehab
   */
  handleBackEvent = event => {
    this.setPageAllTrends();
  }

  setPageAllTrends = () => {
    this.setState({
      title: 'SentiSocial',
      page: <AllTrendsPage
        onLoad={this.handlePageLoad}
        onTrendClick={this.handleTrendClick}/>,
      selectedTrend: undefined,
    });
  }

  setPageTrend = selectedTrend => {
    this.setState({
      title: selectedTrend.name,
      page: <TrendPage
       name={name}/>,
      selectedTrend: selectedTrend,
    });
  }

  setPageStatus500() {
    this.setState({
      title: undefined,
      page: <Status500/>,
      selectedTrend: undefined,
    });
  }

  render() {
    return (
      <div>
        {this.state.title && <NavigationComponent
          title={this.state.title}
          onBackClick={this.handleBackEvent}
          canGoBack={!!this.state.selectedTrend}/>}
        {this.state.page}
      </div>
    );
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
