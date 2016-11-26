import React, { Component } from 'react';
import Slider from './Slider';

class Start extends Component {
  constructor(props) {
    super(props);
    this.changeHandlers = {};
    ['x','y','angle','zoom'].forEach(prop => {
      this.changeHandlers[prop] = this.handleChange.bind(this, prop);
    });
    this.handleIterationsChange = this.handleIterationsChange.bind(this);
  }

  handleIterationsChange(e) {
    this.handleChange('iterations', Number(e.target.value));
  }

  handleChange(prop, value) {
    this.props.update({
      ...this.props.data,
      [prop]: Number(value),
    });
  }

  sliders() {
    const { x, y, angle, zoom } = this.props.data;
    const sliderData = [
      ['x', x, 0, 1000, 1],
      ['y', y, 0, 700, 1],
      ['angle', angle, -360, 360, 1],
      ['zoom', zoom, -1000, 1000, 1],
    ];
    return sliderData.map((item, id) => {
      const [name, value, min, max, step] = item;
      const sliderProps = {
        name, value, min, max, step,
        className: 'grow-item',
        key: id,
        update: this.changeHandlers[name],
      };
      return (
        <Slider
          {...sliderProps}
          showLabel
        />
      );
    }, this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }

  render() {
    return (
      <div id="start" className="side-section">
        <div className="flex-column justified-container">
          <h4>Initial State</h4>
          {this.sliders()}
          <div className="flex-row">
            <label>iterations</label>
            <input
              className="number-input grow-item"
              type="number"
              min="1"
              value={this.props.data.iterations}
              onChange={this.handleIterationsChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

Start.propTypes = {
  data: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    angle: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number.isRequired,
    iterations: React.PropTypes.number.isRequired,
  }),
  update: React.PropTypes.func.isRequired,
};

export default Start;