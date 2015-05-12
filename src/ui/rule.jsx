var React = require('react');

var RuleUI = React.createClass({
  handleChange: function() {
    this.props.update();
    this.props.data.needsParse = true;
  },
  removeRule: function() {
    this.props.data.rules.splice(this.props.id, 1);
    this.handleChange();
  },
  handleChangeRule: function(event) {
    this.props.rule.rule = event.currentTarget.value[0];
    this.handleChange();
  },
  handleChangeTransform: function(event) {
    this.props.rule.transform = event.currentTarget.value;
    this.handleChange();
  },
  render: function() {
        // <div className="justified-container">
        // </div>
    return (
      <div className="rule-container">
          <input
            className="rule-input"
            value={this.props.rule.rule}
            onChange={this.handleChangeRule}
          />
          <label
            className="transform-label"
          >-&gt;</label>
          <input
            className="transform-input"
            value={this.props.rule.transform}
            onChange={this.handleChangeTransform}
          />
        <button
          className="round-button remove-button"
          onClick={this.removeRule}
        > X </button>
      </div>
    );
  }
});

module.exports = RuleUI;
