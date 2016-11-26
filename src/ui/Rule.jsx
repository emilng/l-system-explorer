import React, { Component } from 'react';

class Rule extends Component {
  constructor(props) {
    super(props);
    this.removeRule = this.removeRule.bind(this);
    this.updateRule = this.updateRule.bind(this);
    this.updateTransform = this.updateTransform.bind(this);
  }

  removeRule() {
    const newData = this.props.data.concat();
    newData.splice(this.props.id, 1);
    this.props.update(newData);
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
          onClick={this.removeRule}
        > X </button>
      </div>
    );
  }
}

Rule.propTypes = {
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      rule: React.PropTypes.string,
      transform: React.PropTypes.string,
    })
  ),
  id: React.PropTypes.number.isRequired,
  rule: React.PropTypes.shape({
    rule: React.PropTypes.string,
    transform: React.PropTypes.string,
  }),
  update: React.PropTypes.func.isRequired,
};

export default Rule;