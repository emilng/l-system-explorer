var React = require('react');
var RuleUI = require('./rule.jsx');

var RuleContainerUI = React.createClass({
  handleChange: function() {
    this.props.update();
    this.props.data.needsParse = true;
  },
  addRule: function() {
    var rulesData = this.props.data.rules;
    rulesData.push({rule: '', transform: ''});
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
        />
      );
    }, this);
    return (
      <div>
        <div className="flex-row">
          <h4>Rules</h4>
          <button
            className="round-button add-button"
            onClick={this.addRule}
          >+</button>
        </div>
        <div id="rules-container">{rules}</div>
      </div>
    );
  }
});

module.exports = RuleContainerUI;
