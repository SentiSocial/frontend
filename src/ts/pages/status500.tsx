import * as React from 'react';

export class Status500 extends React.Component<undefined, undefined> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="status500">
        <span className="status500--title">
          SentiSocial
        </span>
        <img className="status500--logo"
          src="img/logo.png"
          alt="Senti Social Logo"/>
        <img className="status500--sad"
          src="img/sad.svg"
          alt="Sad face"/>
        <p className="status500--text">
          Whoops! Looks like the server is down.
        </p>
        <p className="status500--blame">
          It's <a href="https://github.com/GunshipPenguin">@GunshipPenguin</a>'s
          fault, I promise.
        </p>
      </div>
    );
  }
}