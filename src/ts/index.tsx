import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {NetworkBus} from './network-bus';

class Application extends React.Component<undefined, undefined> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
