var React = require('react');
var Slider = require('./Slider.jsx');

var StartUI = React.createClass({
  handleChange: function() {
    this.props.update();
  },
  handleIterationsChange: function(event) {
    this.props.data.iterations = Number(event.target.value);
    this.handleChange();
  },
  render: function() {
    var startData = this.props.data;
    var sliderData = [
      ['x', startData.x, 0, 1000, 1],
      ['y', startData.y, 0, 700, 1],
      ['angle', startData.angle, -360, 360, 1],
      ['zoom', startData.zoom, -1000, 1000, 1]
    ];
    var sliders = sliderData.map(function(item, id) {
      return (
        <Slider
          className="grow-item"
          key={id}
          name={item[0]}
          value={item[1]}
          min={item[2]}
          max={item[3]}
          step={item[4]}
          update={this.props.update}
          model={startData}
          showLabel={true}
        />
      );
    }, this);
    return (
      <div className="flex-column justified-container">
        <h4>Initial State</h4>
        {sliders}
        <div className="flex-row">
          <label>iterations</label>
          <input
            className="number-input grow-item"
            type="number"
            min="1"
            value={startData.iterations}
            onChange={this.handleIterationsChange}
          />
        </div>
      </div>
    );
  }
});

module.exports = StartUI;
