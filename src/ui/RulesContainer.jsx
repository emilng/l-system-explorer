import React, { Component } from 'react';
import Rule from './Rule';

class RulesContainer extends Component {
  constructor(props) {
    super(props);
    this.addRule = this.addRule.bind(this);
  }

  addRule() {
    const rulesData = this.props.data;
    rulesData.push({ rule: '', transform: '' });
    this.props.update();
  }

  rules() {
    const { data, update } = this.props;
    return data.map((rule, id) => {
      const ruleProps = { data, id, rule, update, key: id };
      return <Rule {...ruleProps} />;
    }, this);
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