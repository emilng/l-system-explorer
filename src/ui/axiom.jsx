var React = require('react');

var AxiomUI = React.createClass({
  handleChange: function(event) {
    this.props.data.axiom = event.currentTarget.value;
    this.props.update();
    this.props.data.needsParse = true;
  },
  render: function() {
    return (
      <div>
        <h4>Axiom</h4>
        <input
          value={this.props.data.axiom}
          onChange={this.handleChange}
        />
      </div>
    );
  }
});

module.exports = AxiomUI;