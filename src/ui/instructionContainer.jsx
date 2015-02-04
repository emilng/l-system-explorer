var React = require('react');
var InstructionUI = require('./instruction.jsx');

var InstructionContainerUI = React.createClass({
  getInitialState: function() {
    return ({
      selected: -1
    });
  },
  selectInstruction: function(instructionId) {
    this.setState({
      selected: instructionId
    });
  },
  handleChange: function() {
    this.props.update();
    this.props.data.needsRender = true;
  },
  addInstruction: function() {

  },
  removeInstruction: function() {

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
          selected={this.state.selected === id}
          selectInstruction={this.selectInstruction}
        />
      );
    }, this);
    return (
      <div>
        <h4>Instructions</h4>
        <button
          id="add-instruction"
          onClick={this.addInstruction}
        >Add</button>
        <button
          id="remove-instruction"
          onClick={this.removeInstruction}
        >Remove</button>
        <div id="instructions-container">{instructions}</div>
      </div>
    );
  }
});

module.exports = InstructionContainerUI;