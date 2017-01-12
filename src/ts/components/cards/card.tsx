import * as React from 'react';

export class Card extends React.Component<undefined, undefined> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card col-xs-12">
        {this.props.children}
      </div>
    );
  }

}
