var React = require('react');

var Slider = React.createClass({
  handleChange: function(event) {
    this.props.model[event.target.name] = Number(event.target.value);
    this.props.update();
  },
  render: function() {
    return (
      <div className="cl">
        <label className="fl slider-label">{this.props.name}</label>
        <input
          className="fl"
          type="range"
          name={this.props.name}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={this.handleChange}
        />
        <input
          className="fl number-input"
          type="text"
          value={this.props.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
});

module.exports = Slider;