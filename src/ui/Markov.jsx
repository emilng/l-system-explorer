import React, { Component } from 'react';

class Markov extends Component {
  constructor(props) {
    super(props);
    this.changeHandlers = {};
    ['seed','order','iteration'].forEach(prop => {
      this.changeHandlers[prop] = this.handleChange.bind(this, prop);
    });
    this.toggleEnable = this.toggleEnable.bind(this);
  }

  handleChange(prop, e) {
    this.props.update({
      ...this.props.data,
      [prop]: Number(e.currentTarget.value),
    });
  }

  toggleEnable(e) {
    const enable = (e.currentTarget.checked) ? 0 : 1;
    this.props.update({ ...this.props.data, enable });
  }

  render() {
    return (
      <div className="side-section">
        <h4>Markov Chain</h4>
        <div className="flex-row justified-container">
          enable
          <input
            type="checkbox"
            checked={this.props.data.enable === 0}
            onChange={this.toggleEnable}
          />
        </div>
        <div className="flex-row justified-container">
          seed
          <input
            className="number-input grow-item"
            type="number"
            min="1"
            value={this.props.data.seed}
            onChange={this.changeHandlers.seed}
          />
        </div>
        <div className="flex-row justified-container">
          order
          <input
            className="number-input grow-item"
            type="number"
            min="1"
            value={this.props.data.order}
            onChange={this.changeHandlers.order}
          />
        </div>
        <div className="flex-row justified-container">
          iteration
          <input
            className="number-input grow-item"
            type="number"
            min="1"
            value={this.props.data.iteration}
            onChange={this.changeHandlers.iteration}
          />
        </div>
      </div>
    );
  }
}

Markov.props = {
  data: {
    enable: false,
    seed: 0,
    order: 1,
    iteration: 1,
  },
};

export default Markov;