var React = require('react');
var RuleUI = require('./rule.jsx');

var RuleContainerUI = React.createClass({
  addRule: function() {
    var rulesData = this.props.data;
    rulesData.push({rule: '', transform: ''});
    this.props.update();
  },
  render: function() {
    var rulesData = this.props.data;
    var rules = rulesData.map(function(rule, id) {
      return (
        <RuleUI
          key={id}
          id={id}
          rule={rule}
          update={this.props.update}
          data={rulesData}
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
