import React, { Component } from 'react';

class Rule extends Component {
  constructor(props) {
    super(props);
    this.removeRule = this.removeRule.bind(this);
    this.handleChangeRule = this.handleChangeRule.bind(this);
    this.handleChangeTransform = this.handleChangeTransform.bind(this);
  }

  removeRule() {
    this.props.data.splice(this.props.id, 1);
    this.props.update();
  }

  handleChangeRule(event) {
    this.props.rule.rule = event.currentTarget.value[0];
    this.props.update();
  }

  handleChangeTransform(event) {
    this.props.rule.transform = event.currentTarget.value;
    this.props.update();
  }

  render() {
    const { rule, transform } = this.props.rule;
    return (
      <div className="rule-container">
          <input
            className="rule-input"
            value={rule}
            onChange={this.handleChangeRule}
          />
          <label
            className="transform-label"
          >-&gt;</label>
          <input
            className="transform-input"
            value={transform}
            onChange={this.handleChangeTransform}
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