import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider';

class Distance extends Component {
  getSlider() {
    const { model, value, update } = this.props;
    const sliderProps = {
      model, value, update,
      name: 'distance',
      min: -20, max: 20, step: 0.1,
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
          id={'distance-check-' + id}
          className="distance-checkbox"
          type="checkbox"
          value="distance"
          checked={enabled}
          onChange={toggle}
        />
        <label
          className="check-label distance-check-label"
          htmlFor={'distance-check-' + id}
        >distance</label>
        {slider}
      </div>
    );
  }
}

Distance.propTypes = {
  enabled: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  model: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Distance;