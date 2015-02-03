var React = require('react');

var RuleUI = React.createClass({
  handleChange: function(event) {
    this.props.update();
    this.props.data.needsParse = true;
  },
  handleChangeRule: function(event) {
    this.props.rule.rule = event.currentTarget.value[0];
    this.handleChange();
  },
  handleChangeTransform: function(event) {
    this.props.rule.transform = event.currentTarget.value;
    this.handleChange();
  },
  selectRule: function() {
    console.log('selectRule', this.props);
    this.props.selectRule(this.props.id);
  },
  render: function() {
    var rule = this.props.rule;
    var isActive = (rule.rule !== undefined) && (rule.rule.length > 0);
    var active = (isActive) ? 'active' : 'inactive';
    var selected = (this.props.selected) ? 'selected' : 'unselected';
    return (
      <div
        className={selected + '-rule-container'}
        onClick={this.selectRule}
      >
        <label
          className={active + '-indicator'}
        >&bull;</label>
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
      </div>
    );
  }
});

module.exports = RuleUI;