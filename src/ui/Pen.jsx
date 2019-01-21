import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pen extends Component {
  getRadioButtons() {
    const sharedProps = {
      className: 'branchPush-input',
      type: 'radio',
      onChange: this.props.update,
    };
    return (
      <div>
        <label>up</label>
        <input
          {...sharedProps}
          id="0"
          checked={this.props.value === 0}
        />
        <label>down</label>
        <input
          {...sharedProps}
          id="1"
          checked={this.props.value === 1}
        />
      </div>
    );
  }

  render() {
    const { enabled, id, toggle } = this.props;
    const radioButtons = (enabled) ? this.getRadioButtons() : null;
    return (
      <div className="flex-row instruction-parameter-container">
        <input
          id={'pen-check-' + id}
          className="branch-checkbox"
          type="checkbox"
          value="pen"
          checked={enabled}
          onChange={toggle}
        />
        <label className="check-label branch-check-label" htmlFor={'pen-check-' + this.props.id}>pen</label>
        {radioButtons}
      </div>
    );
  }
}

Pen.propTypes = {
  enabled: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Pen;