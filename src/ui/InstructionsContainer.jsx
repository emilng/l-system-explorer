import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instructions from './Instructions';

class InstructionsContainer extends Component {
  constructor(props) {
    super(props);
    this.addInstruction = this.addInstruction.bind(this);
  }

  addInstruction() {
    const newData = this.props.data.concat({rule: ''});
    this.props.update(newData);
  }

  removeInstruction(id) {
    const newData = this.props.data.concat();
    newData.splice(this.props.id, 1);
    this.props.update(newData);
  }

  updateInstruction(index, value) {
    const newData = this.props.data.concat();
    newData.splice(index, 1, value);
    this.props.update(newData);
  }

  renderInstruction() {
    const data = this.props.data;
    return data.map((instruction, id) => {
      const instructionProps = {
        id,
        data: instruction,
        key: id,
        remove: this.removeInstruction.bind(this, id),
        update: this.updateInstruction.bind(this, id),
      };
      return <Instructions {...instructionProps} />;
    }, this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
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
        <div id="instructions-container">{this.renderInstruction()}</div>
      </div>
    );
  }
}

InstructionsContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.object
  ),
  update: PropTypes.func.isRequired,
};

export default InstructionsContainer;