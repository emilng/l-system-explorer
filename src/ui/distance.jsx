const React = require('react');
const Slider = require('./slider.jsx');

class Distance extends React.Component {
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
  enabled: React.PropTypes.bool.isRequired,
  id: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  model: React.PropTypes.object.isRequired,
  update: React.PropTypes.func.isRequired,
  toggle: React.PropTypes.func.isRequired,
};

module.exports = Distance;
