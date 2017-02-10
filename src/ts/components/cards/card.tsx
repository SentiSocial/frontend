import * as React from 'react';
const VisibilitySensor = require('react-visibility-sensor');

interface CardState {
  visible: boolean;
};

export class Card extends React.Component<undefined, CardState> {

  constructor(props) {
    super(props);

    this.handleVisibility = this.handleVisibility.bind(this);

    this.state = {
      visible: false
    };
  }

  handleVisibility(isVisible) {
    if (isVisible) {
      this.setState({
        visible: true
      });
    }
  }

  render() {
    const isVisible = this.state.visible;
    const visibility = isVisible ? 'card--visible' : '';
    return (
      <div className="col">
        {!isVisible &&
          <VisibilitySensor onChange={this.handleVisibility} />}
        <article className={`card ${visibility} col-xs-12`}>
          {this.props.children}
        </article>
      </div>
    );
  }

}
