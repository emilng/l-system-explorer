import React, { Component } from 'react';

class Axiom extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.data.axiom = event.currentTarget.value;
    this.props.update();
  }

  render() {
    return (
      <div className="side-section">
        <h4>Axiom</h4>
        <div className="flex-row justified-container">
          <input
            className="grow-item"
            value={this.props.data.axiom}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

Axiom.propTypes = {
  data: React.PropTypes.shape({
    axiom: React.PropTypes.string,
  }),
  update: React.PropTypes.func.isRequired,
};

export default Axiom;