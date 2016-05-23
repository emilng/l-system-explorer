const React = require('react');

class Branch extends React.Component {
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
  enabled: React.PropTypes.bool.isRequired,
  id: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  update: React.PropTypes.func.isRequired,
  toggle: React.PropTypes.func.isRequired,
};

module.exports = Branch;
