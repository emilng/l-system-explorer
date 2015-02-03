var React = require('react');
var RuleUI = require('./rule.jsx');

var RuleContainerUI = React.createClass({
  getInitialState: function() {
    return ({
      selected: -1
    });
  },
  selectRule: function(ruleId) {
    this.setState({
      selected: ruleId
    });
  },
  handleChange: function(event) {
    this.props.update();
    this.props.data.needsParse = true;
  },
  addRule: function() {
    var rulesData = this.props.data.rules;
    rulesData.push({rule:'', transform:''});
    var selected = rulesData.length - 1;
    this.setState({selected:selected});
    this.handleChange();
  },
  removeRule: function() {
    var rulesData = this.props.data.rules;
    var selected = this.state.selected;
    if ((selected === -1) || (selected >= rulesData.length - 1)) {
      rulesData.pop();
      this.setState({selected:rulesData.length - 1});
    } else {
      rulesData.splice(selected, 1);
      this.setState({selected:selected});
    }
    this.handleChange();
  },
  render: function() {
    var rulesData = this.props.data.rules;
    var rules = rulesData.map(function(rule, id) {
      return (
        <RuleUI
          key={id}
          id={id}
          rule={rule}
          update={this.props.update}
          data={this.props.data}
          selected={this.state.selected === id}
          selectRule={this.selectRule}
        />
      );
    }, this);
    return (
      <div>
        <h4>Rules</h4>
        <button
          id="add-rule"
          onClick={this.addRule}
        >Add Rule</button>
        <button
          id="remove-rule"
          onClick={this.removeRule}
        >Remove Rule</button>
        <div id="rules-container">{rules}</div>
      </div>
    );
  }
});

module.exports = RuleContainerUI;