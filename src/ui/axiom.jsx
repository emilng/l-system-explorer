const React = require('react');

class AxiomUI extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.data.axiom = event.currentTarget.value;
    this.props.update();
  }

  render() {
    return (
      <div>
        <h4>Axiom</h4>
        <div className="flex-row justified-container">
          <input
            className="grow-item"
            value={this.props.data.axiom}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

AxiomUI.propTypes = {
  data: React.PropTypes.shape({
    axiom: React.PropTypes.string,
  }),
  update: React.PropTypes.func.isRequired,
};

module.exports = AxiomUI;
