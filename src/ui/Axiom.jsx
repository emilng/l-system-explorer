import React, { Component } from 'react';

class Axiom extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.update(e.currentTarget.value);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }

  render() {
    return (
      <div className="side-section">
        <h4>Axiom</h4>
        <div className="flex-row justified-container">
          <input
            className="grow-item"
            value={this.props.data}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

Axiom.propTypes = {
  data: React.PropTypes.string,
  update: React.PropTypes.func.isRequired,
};

export default Axiom;