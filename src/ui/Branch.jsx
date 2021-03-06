import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Branch extends Component {
  getRadioButtons() {
    const sharedProps = {
      className: 'branchPush-input',
      type: 'radio',
      onChange: this.props.update,
    };
    return (
      <div>
        <label>start</label>
        <input
          {...sharedProps}
          id="0"
          checked={this.props.value === 0}
        />
        <label>end</label>
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
          id={'branch-check-' + id}
          className="branch-checkbox"
          type="checkbox"
          value="branch"
          checked={enabled}
          onChange={toggle}
        />
        <label className="check-label branch-check-label" htmlFor={'branch-check-' + this.props.id}>branch</label>
        {radioButtons}
      </div>
    );
  }
}

Branch.propTypes = {
  enabled: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Branch;