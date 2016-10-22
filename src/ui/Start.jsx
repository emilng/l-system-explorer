import React, { Component } from 'react';
import Slider from './Slider';

class Start extends Component {
  constructor(props) {
    super(props);
    this.handleIterationsChange = this.handleIterationsChange.bind(this);
  }

  handleIterationsChange(event) {
    this.props.data.iterations = Number(event.target.value);
    this.props.update();
  }

  sliders() {
    const { data, update } = this.props;
    const { x, y, angle, zoom } = data;
    const sliderData = [
      ['x', x, 0, 1000, 1],
      ['y', y, 0, 700, 1],
      ['angle', angle, -360, 360, 1],
      ['zoom', zoom, -1000, 1000, 1],
    ];
    return sliderData.map((item, id) => {
      const [name, value, min, max, step] = item;
      const sliderProps = {
        name, value, min, max, step, update,
        className: 'grow-item',
        key: id,
        model: data,
      };
      return (
        <Slider
          {...sliderProps}
          showLabel
        />
      );
    }, this);
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