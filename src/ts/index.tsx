import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus} from './network-bus';
import {PageTrends} from './page-trends';
import {SpecificTrendsChart} from './specific-trends-chart';

class Application extends React.Component<undefined, undefined> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PageTrends />
      </div>
    );
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
