const React = require('react');
const Slider = require('./slider.jsx');

class Angle extends React.Component {
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
  enabled: React.PropTypes.bool.isRequired,
  id: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  model: React.PropTypes.object.isRequired,
  update: React.PropTypes.func.isRequired,
  toggle: React.PropTypes.func.isRequired,
};

module.exports = Angle;
