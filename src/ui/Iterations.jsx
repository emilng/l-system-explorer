import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Iterations extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.update(Number(e.currentTarget.value));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }

  render() {
    return (
      <div className="side-section">
        <h4>Iterations</h4>
        <div className="flex-row justified-container">
          <input
            className="number-input grow-item"
            type="number"
            min="1"
            value={this.props.data}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

Iterations.propTypes = {
  data: PropTypes.number,
  update: PropTypes.func.isRequired,
};

export default Iterations;