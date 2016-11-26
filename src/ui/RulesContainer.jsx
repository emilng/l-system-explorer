import React, { Component } from 'react';
import Rule from './Rule';

class RulesContainer extends Component {
  constructor(props) {
    super(props);
    this.addRule = this.addRule.bind(this);
    this.handleChangeRule = this.handleChangeRule.bind(this);
  }

  addRule() {
    const newData = this.props.data.concat({ rule: '', transform: '' });
    this.props.update(newData);
  }

  removeRule() {

  }

  rules() {
    const data = this.props.data;
    return data.map((rule, id) => {
      const ruleProps = { data, id, rule, update: this.handleChangeRule.bind(id), key: id };
      return <Rule {...ruleProps} />;
    }, this);
  }

  handleChangeRule(index, value) {
    const newData = this.props.data.concat();
    newData.splice(index, 1, value);
    this.props.update(newData);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }

  render() {
    return (
      <div className="side-section">
        <div className="flex-row">
          <h4>Rules</h4>
          <button
            className="round-button add-button"
            onClick={this.addRule}
          >+</button>
        </div>
        <div id="rules-container">{this.rules()}</div>
      </div>
    );
  }
}

export default RulesContainer;