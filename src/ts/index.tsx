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

/**
 * @author Omar Chehab
 */
class Application extends React.Component<ApplicationProps, ApplicationState> {
  private firstLoad: boolean;
  private history: any;

  /**
   * Creates a new Application.
   */
  constructor(props) {
    super(props);

    this.handlePopState = this.handlePopState.bind(this);
    this.handlePageLoad = this.handlePageLoad.bind(this);
    this.handleTrendClick = this.handleTrendClick.bind(this);
    this.handleBackEvent = this.handleBackEvent.bind(this);

    this.firstLoad = false;
    const window = this.props.dependencies.window;
    this.history = window.history;

    this.history.replaceState({
      page: 'AllTrendsPage'
    }, '', '');
    window.addEventListener('popstate', this.handlePopState);

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
   * Event handler for browser history back and forward.
   */
  handlePopState(event) {
    const page = event.state.page;
    switch (page) {
      case 'AllTrendsPage':
        this.setPageAllTrends(true);
        break;
      case 'TrendPage':
        const selectedTrend = event.state.selectedTrend;
        this.setPageTrend(true, selectedTrend);
        break;
    }
  }

  /**
   * Event listener for when page has retrieved it's necessary data.
   * @param {(Error|undefined)} error
   */
  handlePageLoad(error) {
    if (!this.firstLoad) {
      this.firstLoad = true;
      stopLoading();
    }

    if (error) {
      this.setPageStatus500();
    }
  }

  /**
   * When a trend from the TrendsChart is clicked, change the page.
   */
  handleTrendClick(selectedTrend) {
    if (selectedTrend) {
      // if there is a selected trend, display the specific trend page.
      this.setPageTrend(selectedTrend, false);
    } else {
      // if there is no trend selected, display the home page.
      this.setPageAllTrends(false);
    }
  }

  /**
   * When the back button from the Navigation component is clicked, go back to
   * the homepage.
   */
  handleBackEvent(event) {
    this.history.back();
  }

  /**
   * @param {boolean} ignoreHistory
   */
  setPageAllTrends(ignoreHistory) {
    this.setState({
      title: 'SentiSocial',
      page: <AllTrendsPage
        dependencies={this.props.dependencies}
        onLoad={this.handlePageLoad}
        onTrendClick={this.handleTrendClick}/>,
      selectedTrend: undefined,
    });
    if (!ignoreHistory) {
      this.history.pushState({
        page: 'AllTrendsPage'
      }, '', '');
    }
  }

  /**
   * @param {boolean} ignoreHistory
   * @param {object} selectedTrend
   */
  setPageTrend(selectedTrend, ignoreHistory) {
    const state = {
      title: selectedTrend.name,
      page: <TrendPage
       name={selectedTrend.name}/>,
      selectedTrend: selectedTrend,
    };
    this.setState(state);
    if (!ignoreHistory) {
      this.history.pushState({
        page: 'TrendPage',
        selectedTrend: selectedTrend
      }, '', '');
    }
  }

  /**
   *
   */
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
