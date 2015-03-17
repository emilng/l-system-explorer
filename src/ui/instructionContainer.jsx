var React = require('react');
var InstructionUI = require('./instruction.jsx');

var InstructionContainerUI = React.createClass({
  handleChange: function() {
    this.props.update();
    this.props.data.needsRender = true;
  },
  addInstruction: function() {
    var instruction = this.props.data.instructions;
    instruction.push({rule:''});
    this.handleChange();
  },
  render: function() {
    var instructionsData = this.props.data.instructions;
    var instructions = instructionsData.map(function(instruction, id) {
      return (
        <InstructionUI
          key={id}
          id={id}
          update={this.props.update}
          data={this.props.data}
        />
      );
    }, this);
    return (
      <div>
        <div className="flex-row centered-items">
          <h4>Instructions</h4>
          <button
            className="round-button add-button"
            onClick={this.addInstruction}
          >+</button>
        </div>
        <div id="instructions-container">{instructions}</div>
      </div>
    );
  }
});

module.exports = InstructionContainerUI;