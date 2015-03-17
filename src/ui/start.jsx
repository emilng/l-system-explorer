var React = require('react');
var Slider = require('./Slider.jsx');

var StartUI = React.createClass({
  handleChange: function() {
    this.props.update();
    this.props.data.needsRender = true;
  },
  handleIterationsChange: function(event) {
    this.props.data.start.iterations = Number(event.target.value);
    this.handleChange();
  },
  render: function() {
    var startData = this.props.data.start;
    var handleChange = this.handleChange;
    var sliderData = [
      ['x', startData.x, 0, 1000, 1],
      ['y', startData.y, 0, 700, 1],
      ['angle', startData.angle, -360, 360, 1]
    ];
    var sliders = sliderData.map(function(item, id) {
      return (
        <Slider
          key={id}
          name={item[0]}
          value={item[1]}
          min={item[2]}
          max={item[3]}
          step={item[4]}
          update={handleChange}
          model={startData}
          showLabel={true}
        />
      );
    });
    return (
      <div>
        <h4>Initial State</h4>
        {sliders}
        <label>iterations</label>
        <input
          id="initial-iterations"
          type="number"
          min="1"
          value={startData.iterations}
          onChange={this.handleIterationsChange}
        />
      </div>
    );
  }
});

module.exports = StartUI;