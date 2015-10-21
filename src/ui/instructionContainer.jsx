var React = require('react');
var InstructionUI = require('./instruction.jsx');

var InstructionContainerUI = React.createClass({
  addInstruction: function() {
    var instruction = this.props.data;
    instruction.push({rule: ''});
    this.props.update();
  },
  render: function() {
    var instructionsData = this.props.data;
    var instructions = instructionsData.map(function(instruction, id) {
      return (
        <InstructionUI
          key={id}
          id={id}
          update={this.props.update}
          data={instructionsData}
          reset={this.props.reset}
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
