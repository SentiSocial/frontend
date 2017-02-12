import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './polyfill';

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

interface ApplicationProps {
  dependencies: any;
}

interface ApplicationState {
  selectedTrend: Trend;
  page: any;
  title: string;
};

class Application extends React.Component<ApplicationProps, ApplicationState> {
  protected firstLoad = false;

  constructor(props) {
    super(props);
    
    this.state = {
      title: 'SentiSocial',
      page: <AllTrendsPage
        dependencies={this.props.dependencies}
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
    if (!this.firstLoad) {
      this.firstLoad = true
      stopLoading();
    }

    if (error) {
      this.setPageStatus500();
    }
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
        dependencies={this.props.dependencies}
        onLoad={this.handlePageLoad}
        onTrendClick={this.handleTrendClick}/>,
      selectedTrend: undefined,
    });
  }

  setPageTrend = selectedTrend => {
    this.setState({
      title: selectedTrend.name,
      page: <TrendPage
       name={selectedTrend.name}/>,
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
  <Application dependencies={{
    window: window,
    fetch: window['fetch'].bind(window)
  }}/>,
  document.getElementById('root')
);
