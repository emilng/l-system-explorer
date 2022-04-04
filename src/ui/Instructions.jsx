import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Angle from './Angle';
import Branch from './Branch';
import Distance from './Distance';
import Pen from './Pen';

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.toggleDistance = this.toggleProperty.bind(this, 'distance');
    this.toggleAngle = this.toggleProperty.bind(this, 'angle');
    this.toggleBranch = this.toggleProperty.bind(this, 'branch');
    this.togglePen = this.toggleProperty.bind(this, 'pen');
    this.updateRule = this.updateRule.bind(this);
    this.updateDistance = this.updateDistance.bind(this);
    this.updateAngle = this.updateAngle.bind(this);
    this.updateBranchType = this.updateBranchType.bind(this);
    this.updatePen = this.updatePen.bind(this);
    const distance = ({}.hasOwnProperty.call(props.data, 'distance')) ? props.data.distance : 0;
    const angle = ({}.hasOwnProperty.call(props.data, 'angle')) ? props.data.angle : 0;
    const branch = ({}.hasOwnProperty.call(props.data, 'branch')) ? props.data.branch : 0;
    const pen = ({}.hasOwnProperty.call(props.data, 'pen')) ? props.data.pen : 0;
    this.state = {
      distance,
      angle,
      branch,
      pen,
    };
  }

  shouldComponentUpdate(nextProps) {
    const { data } = this.props;
    return nextProps.data !== data;
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
    update({ ...data, distance: value });
  }

  updateAngle(value) {
    const { data, update } = this.props;
    this.setState({ angle: value });
    update({ ...data, angle: value });
  }

  updateBranchType(e) {
    const { data, update } = this.props;
    this.setState({ branch: Number(e.target.id) });
    update({ ...data, branch: Number(e.target.id) });
  }

  updatePen(e) {
    const { data, update } = this.props;
    this.setState({ pen: Number(e.target.id) });
    update({ ...data, pen: Number(e.target.id) });
  }

  render() {
    const instruction = this.props.data;
    const distanceEnabled = instruction.hasOwnProperty('distance');
    const angleEnabled = instruction.hasOwnProperty('angle');
    const branchEnabled = instruction.hasOwnProperty('branch');
    const penEnabled = instruction.hasOwnProperty('pen');
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
            <Pen
              enabled={penEnabled}
              id={this.props.id}
              value={this.state.pen}
              update={this.updatePen}
              toggle={this.togglePen}
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

Instructions.propTypes = {
  data: PropTypes.shape({
    angle: PropTypes.number,
    distance: PropTypes.number,
    branch: PropTypes.number,
    pen: PropTypes.number,
  }),
};

export default Instructions;