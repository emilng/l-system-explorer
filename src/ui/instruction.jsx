var React = require('react');
var Slider = require('./Slider.jsx');

var InstructionUI = React.createClass({
  getInitialState: function() {
    return this.getInitialStateFromProps(this.props);
  },
  getInitialStateFromProps: function(props) {
    var instruction = props.data.instructions[props.id];
    var distance = (instruction.hasOwnProperty('distance')) ? instruction.distance : 0;
    var angle = (instruction.hasOwnProperty('angle')) ? instruction.angle : 0;
    var branch = (instruction.hasOwnProperty('branch')) ? instruction.branch : 0;
    return ({
      distance: distance,
      angle: angle,
      branch: branch
    });
  },
  handleChange: function() {
    this.props.update();
    this.props.data.needsRender = true;
  },
  removeProperty: function(propName) {
    var instruction = this.props.data.instructions[this.props.id];
    var keys = Object.keys(instruction);
    this.props.data.instructions[this.props.id] = keys.reduce(function(newInstruction, prop) {
      if (prop !== propName) {
        newInstruction[prop] = instruction[prop];
      }
      return newInstruction;
    }, {});
  },
  toggleProperty: function(event, propName) {
    var instruction = this.props.data.instructions[this.props.id];
    var propChecked = event.currentTarget.checked;
    if (propChecked) {
      instruction[propName] = this.state[propName];
    } else {
      this.removeProperty(propName);
    }
    this.handleChange();
  },
  toggleDistance: function(event) {
    this.toggleProperty(event, 'distance');
  },
  toggleAngle: function(event) {
    this.toggleProperty(event, 'angle');
  },
  toggleBranch: function(event) {
    this.toggleProperty(event, 'branch');
  },
  updateRule: function(event) {
    var instruction = this.props.data.instructions[this.props.id];
    instruction.rule = event.currentTarget.value;
    this.handleChange();
  },
  updateDistance: function(event) {
    var instruction = this.props.data.instructions[this.props.id];
    this.setState({distance: instruction.distance});
    this.handleChange();
  },
  updateAngle: function(event) {
    var instruction = this.props.data.instructions[this.props.id];
    this.setState({angle: instruction.angle});
    this.handleChange();
  },
  updateBranchType: function(event) {
    var instruction = this.props.data.instructions[this.props.id];
    instruction.branch = Number(event.currentTarget.id);
    this.setState({branch: instruction.branch});
    this.handleChange();
  },
  selectInstruction: function() {
    this.props.selectInstruction(this.props.id);
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.data.needsDecode) {
      var resetStates = this.getInitialStateFromProps(newProps);
      this.replaceState(resetStates);
    }
  },
  render: function() {
    var distanceSlider;
    var angleSlider;
    var branch;
    var instruction = this.props.data.instructions[this.props.id];
    var distanceEnabled = instruction.hasOwnProperty('distance');
    var angleEnabled = instruction.hasOwnProperty('angle');
    var branchEnabled = instruction.hasOwnProperty('branch');
    var selected = (this.props.selected) ? 'selected' : 'unselected';
    if (distanceEnabled) {
      distanceSlider = (
        <Slider
          ref="distanceSlider"
          name="distance"
          value={this.state.distance}
          min="-20"
          max="20"
          step="0.1"
          update={this.updateDistance}
          model={instruction}
        />
      );
    }
    if (angleEnabled) {
      angleSlider = (
        <Slider
          ref="angleSlider"
          name="angle"
          value={this.state.angle}
          min="-360"
          max="360"
          step="0.1"
          update={this.updateAngle}
          model={instruction}
        />
      );
    }
    if (branchEnabled) {
      branch = (
        <div>
          <label>push</label>
          <input
            id="0"
            className="branchPush-input"
            type="radio"
            checked={this.state.branch === 0}
            onChange={this.updateBranchType}
          />
          <label>pop</label>
          <input
            id="1"
            className="branchPush-input"
            type="radio"
            checked={this.state.branch === 1}
            onChange={this.updateBranchType}
          />
        </div>
      );
    }
    return (
      <div
        className={selected + '-instruction-container'}
        onClick={this.selectInstruction}
      >
        <div className="check-container">
          <input
            className="rule-input"
            value={instruction.rule}
            onChange={this.updateRule}
          />
          <label className="check-label">distance</label>
          <input
            ref="distanceCheck"
            type="checkbox"
            value="distance"
            checked={distanceEnabled}
            onChange={this.toggleDistance}
          />
          <label className="check-label">angle</label>
          <input
            ref="angleCheck"
            type="checkbox"
            value="angle"
            checked={angleEnabled}
            onChange={this.toggleAngle}
          />
          <label className="check-label">branch</label>
          <input
            ref="branchCheck"
            type="checkbox"
            value="branch"
            checked={branchEnabled}
            onChange={this.toggleBranch}
          />
        </div>
        {distanceSlider}
        {angleSlider}
        {branch}
      </div>
    );
  }
});

module.exports = InstructionUI;