const React = require('react');
const InstructionUI = require('./instruction.jsx');

class InstructionContainerUI extends React.Component {
  constructor(props) {
    super(props);
    this.addInstruction = this.addInstruction.bind(this);
  }

  addInstruction() {
    const instruction = this.props.data;
    instruction.push({rule: ''});
    this.props.update();
  }

  instructions() {
    const { data, reset, update } = this.props;
    return data.map((instruction, id) => {
      const instructionProps = { data, id, reset, update, key: id };
      return <InstructionUI {...instructionProps} />;
    }, this);
  }

  render() {
    return (
      <div>
        <div className="flex-row centered-items">
          <h4>Instructions</h4>
          <button
            className="round-button add-button"
            onClick={this.addInstruction}
          >+</button>
        </div>
        <div id="instructions-container">{this.instructions()}</div>
      </div>
    );
  }
}

InstructionContainerUI.propTypes = {
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      rule: React.PropTypes.string,
      distance: React.PropTypes.number,
      angle: React.PropTypes.number,
      branch: React.PropTypes.number,
    })
  ),
  reset: React.PropTypes.bool,
  update: React.PropTypes.func.isRequired,
};

module.exports = InstructionContainerUI;
