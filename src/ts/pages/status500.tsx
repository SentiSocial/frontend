import * as React from 'react';

export class Status500 extends React.Component<undefined, undefined> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="status500">
        <span className="status500--title">
          Senti Social
        </span>
        <img className="status500--logo"
          src="img/logo.png"
          alt="Senti Social Logo"/>
      </div>
    );
  }
}