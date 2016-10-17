import React, { Component } from 'react';
import Instructions from './Instructions';

class InstructionsContainer extends Component {
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
    const { data, update } = this.props;
    return data.map((instruction, id) => {
      const instructionProps = { data, id, update, key: id };
      return <Instructions {...instructionProps} />;
    }, this);
  }

  render() {
    return (
      <div className="side-section">
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

InstructionsContainer.propTypes = {
  data: React.PropTypes.arrayOf(
    React.PropTypes.object
  ),
  update: React.PropTypes.func.isRequired,
};

export default InstructionsContainer;