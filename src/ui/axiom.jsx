var React = require('react');

var AxiomUI = React.createClass({
  handleChange: function(event) {
    this.props.data.axiom = event.currentTarget.value.split('');
    this.props.update();
    this.props.data.needsParse = true;
  },
  render: function() {
    var axiomData = this.props.data.axiom;
    return (
      <div>
        <h4>Axiom</h4>
        <input
          value={axiomData.join('')}
          onChange={this.handleChange}
        />
      </div>
    );
  }
});

module.exports = AxiomUI;