var React = require('react');

var Slider = React.createClass({
  getInitialState: function() {
    var step = this.props.step;
    var bigStep, smallStep;
    bigStep = step * 10;
    smallStep = step * 0.1;
    // floating point error workaround
    if ((step >= 0.1) && (step <= 0.9)) {
      smallStep = (step * 10) * 0.01;
    }
    return ({
      step:step,
      regularStep: step,
      bigStep: bigStep,
      smallStep: smallStep
    });
  },
  handleChange: function(event) {
    this.props.model[event.target.name] = Number(event.target.value);
    this.props.update();
  },
  keyDown: function(event) {
    if (event.shiftKey) {
      this.setState({step: this.state.bigStep});
    } else if (event.altKey) {
      this.setState({step: this.state.smallStep});
    } else {
      this.setState({step: this.state.regularStep});
    }
  },
  render: function() {
    var label;
    if (this.props.showLabel) {
      label = (
        <label className="slider-label">{this.props.name}</label>
      );
    }
    return (
      <div className="slider-container">
        {label}
        <input
          type="range"
          name={this.props.name}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.state.step}
          onChange={this.handleChange}
          onKeyDown={this.keyDown}
        />
        <input
          className="number-input"
          type="text"
          value={this.props.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
});

module.exports = Slider;