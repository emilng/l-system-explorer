import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Rule extends Component {
  constructor(props) {
    super(props);
    this.updateRule = this.updateRule.bind(this);
    this.updateTransform = this.updateTransform.bind(this);
  }

  updateRule(e) {
    this.props.update({ ...this.props.rule, rule: e.target.value[0] });
  }

  updateTransform(e) {
    this.props.update({ ...this.props.rule, transform: e.target.value });
  }

  render() {
    const { rule, transform } = this.props.rule;
    return (
      <div className="rule-container">
          <input
            className="rule-input"
            value={rule}
            onChange={this.updateRule}
          />
          <label
            className="transform-label"
          >-&gt;</label>
          <input
            className="transform-input"
            value={transform}
            onChange={this.updateTransform}
          />
        <button
          className="round-button remove-button"
          onClick={this.props.remove}
        > X </button>
      </div>
    );
  }
}

Rule.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      rule: PropTypes.string,
      transform: PropTypes.string,
    })
  ),
  id: PropTypes.number.isRequired,
  rule: PropTypes.shape({
    rule: PropTypes.string,
    transform: PropTypes.string,
  }),
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Rule;