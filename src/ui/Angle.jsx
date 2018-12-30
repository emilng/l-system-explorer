import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider';

class Angle extends Component {
  getSlider() {
    const { model, value, update } = this.props;
    const sliderProps = {
      model, value, update,
      name: 'angle',
      min: -360, max: 360, step: 0.1,
      showLabel: false,
    };
    return <Slider {...sliderProps} />;
  }

  render() {
    const { enabled, id, toggle } = this.props;
    const slider = (enabled) ? this.getSlider() : null;
    return (
      <div className="flex-row instruction-parameter-container">
        <input
          id={'angle-check-' + id}
          className="angle-checkbox"
          type="checkbox"
          value="angle"
          checked={enabled}
          onChange={toggle}
        />
        <label
          className="check-label angle-check-label"
          htmlFor={'angle-check-' + id}
        >angle</label>
        {slider}
      </div>
    );
  }
}

Angle.propTypes = {
  enabled: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  model: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Angle;