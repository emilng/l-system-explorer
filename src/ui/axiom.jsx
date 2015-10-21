var React = require('react');

var AxiomUI = React.createClass({
  handleChange: function(event) {
    this.props.data.axiom = event.currentTarget.value;
    this.props.update();
  },
  render: function() {
    return (
      <div>
        <h4>Axiom</h4>
        <div className="flex-row justified-container">
          <input
            className="grow-item"
            value={this.props.data.axiom}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
});

module.exports = AxiomUI;
