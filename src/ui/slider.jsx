const React = require('react');

class Slider extends React.Component {
  constructor(props) {
    super(props);
    const step = props.step;
    const bigStep = step * 10;
    let smallStep = step * 0.1;
    // floating point error workaround
    if ((step >= 0.1) && (step <= 0.9)) {
      smallStep = (step * 10) * 0.01;
    }
    this.state = {
      step,
      smallStep,
      bigStep,
      regularStep: step,
    };

    this.handleChange = this.handleChange.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  handleChange(event) {
    this.props.model[event.target.name] = Number(event.target.value);
    this.props.update();
  }

  keyDown(event) {
    if (event.shiftKey) {
      this.setState({ step: this.state.bigStep });
    } else if (event.altKey) {
      this.setState({ step: this.state.smallStep });
    } else {
      this.setState({ step: this.state.regularStep });
    }
  }

  render() {
    const { name, value, min, max, showLabel } = this.props;
    const label = (showLabel) ? (<label className="slider-label">{name}</label>) : null;
    const sliderProps = {
      name, value, min, max,
      type: 'range',
      step: this.state.step,
      onChange: this.handleChange,
      onKeyDown: this.keyDown,
    };
    return (
      <div className="flex-row">
        {label}
        <input {...sliderProps} />
        <label className="slider-value">{value}</label>
      </div>
    );
  }
}

Slider.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  showLabel: React.PropTypes.bool.isRequired,
  step: React.PropTypes.number.isRequired,
};

module.exports = Slider;
