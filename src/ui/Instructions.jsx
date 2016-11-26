import React, { Component } from 'react';
import Angle from './Angle';
import Branch from './Branch';
import Distance from './Distance';

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.toggleDistance = this.toggleProperty.bind(this, 'distance');
    this.toggleAngle = this.toggleProperty.bind(this, 'angle');
    this.toggleBranch = this.toggleProperty.bind(this, 'branch');
    this.updateRule = this.updateRule.bind(this);
    this.updateDistance = this.updateDistance.bind(this);
    this.updateAngle = this.updateAngle.bind(this);
    this.updateBranchType = this.updateBranchType.bind(this);
    const distance = (props.data.hasOwnProperty('distance')) ? props.data.distance : 0;
    const angle = (props.data.hasOwnProperty('angle')) ? props.data.angle : 0;
    const branch = (props.data.hasOwnProperty('branch')) ? props.data.branch : 0;
    this.state = {
      distance,
      angle,
      branch,
    }
  }

  toggleProperty(propName, e) {
    const { data, update } = this.props;
    // eslint-disable-next-line
    const { [propName]:prop, ...rest } = data;
    var propChecked = e.target.checked;
    if (propChecked) {
      update({ ...rest, [propName]: this.state[propName]});
    } else {
      update({ ...rest });
    }
  }

  updateRule(e) {
    const { data, update } = this.props;
    update({ ...data, rule: e.target.value });
  }

  updateDistance(value) {
    const { data, update } = this.props;
    this.setState({ distance: value });
    update({ ...data, distance: value })
  }

  updateAngle(value) {
    const { data, update } = this.props;
    this.setState({ angle: value });
    update({ ...data, angle: value })
  }

  updateBranchType(e) {
    const { data, update } = this.props;
    this.setState({ branch: Number(e.target.id) });
    update({ ...data, branch: e.target.id });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }

  render() {
    const instruction = this.props.data;
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
            onClick={this.props.remove}
          > X </button>
        </div>
      </div>
    );
  }
}

export default Instructions;