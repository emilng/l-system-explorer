import React, { Component } from 'react';
import Angle from './Angle';
import Branch from './Branch';
import Distance from './Distance';

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.toggleProperty = this.toggleProperty.bind(this);
    this.toggleDistance = this.toggleProperty.bind(this, 'distance');
    this.toggleAngle = this.toggleProperty.bind(this, 'angle');
    this.toggleBranch = this.toggleProperty.bind(this, 'branch');
    this.updateRule = this.updateRule.bind(this);
    this.updateDistance = this.updateDistance.bind(this);
    this.updateAngle = this.updateAngle.bind(this);
    this.updateBranchType = this.updateBranchType.bind(this);
    const instruction = props.data[this.props.id];
    const distance = (instruction.hasOwnProperty('distance')) ? instruction.distance : 0;
    const angle = (instruction.hasOwnProperty('angle')) ? instruction.angle : 0;
    const branch = (instruction.hasOwnProperty('branch')) ? instruction.branch : 0;
    this.state = {
      distance,
      angle,
      branch,
    }
  }

  removeInstruction() {
    this.props.data.splice(this.props.id, 1);
    this.props.update();
  }

  removeProperty(propName) {
    var instruction = this.props.data[this.props.id];
    var keys = Object.keys(instruction);
    this.props.data[this.props.id] = keys.reduce(function(newInstruction, prop) {
      if (prop !== propName) {
        newInstruction[prop] = instruction[prop];
      }
      return newInstruction;
    }, {});
  }

  toggleProperty(propName, event) {
    var instruction = this.props.data[this.props.id];
    var propChecked = event.currentTarget.checked;
    if (propChecked) {
      instruction[propName] = this.state[propName];
    } else {
      this.removeProperty(propName);
    }
    this.props.update();
  }

  updateRule(event) {
    const instruction = this.props.data[this.props.id];
    instruction.rule = event.currentTarget.value;
    this.props.update();
  }

  updateDistance() {
    const instruction = this.props.data[this.props.id];
    this.setState({ distance: instruction.distance });
    this.props.update();
  }

  updateAngle() {
    const instruction = this.props.data[this.props.id];
    this.setState({ angle: instruction.angle });
    this.props.update();
  }

  updateBranchType(event) {
    const instruction = this.props.data[this.props.id];
    instruction.branch = Number(event.currentTarget.id);
    this.setState({ branch: instruction.branch });
    this.props.update();
  }

  render() {
    const instruction = this.props.data[this.props.id];
    const distanceEnabled = instruction.hasOwnProperty('distance');
    const angleEnabled = instruction.hasOwnProperty('angle');
    const branchEnabled = instruction.hasOwnProperty('branch');
    return (
      <div className="flex-column instruction-container">
        <div className="flex-row instruction-box">
          <div className="flex-column check-container">
            <input
              className="rule-input"
              value={instruction.rule}
              onChange={this.updateRule}
            />
            <Distance
              enabled={distanceEnabled}
              id={this.props.id}
              value={this.state.distance}
              model={instruction}
              update={this.updateDistance}
              toggle={this.toggleDistance}
            />
            <Angle
              enabled={angleEnabled}
              id={this.props.id}
              value={this.state.angle}
              model={instruction}
              update={this.updateAngle}
              toggle={this.toggleAngle}
            />
            <Branch
              enabled={branchEnabled}
              id={this.props.id}
              value={this.state.branch}
              update={this.updateBranchType}
              toggle={this.toggleBranch}
            />
          </div>
          <button
            className="round-button remove-button"
            onClick={this.removeInstruction}
          > X </button>
        </div>
      </div>
    );
  }
}

export default Instructions;