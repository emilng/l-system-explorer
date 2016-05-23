const React = require('react');
const RuleUI = require('./rule.jsx');

class RuleContainerUI extends React.Component {
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
      return <RuleUI {...ruleProps} />;
    }, this);
  }

  render() {
    return (
      <div>
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

RuleContainerUI.propTypes = {
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      rule: React.PropTypes.string,
      transform: React.PropTypes.string,
    })
  ),
  update: React.PropTypes.func.isRequired,
};

module.exports = RuleContainerUI;
