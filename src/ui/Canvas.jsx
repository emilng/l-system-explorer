import React, { Component } from 'react';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mousedown: false,
      startx: 0,
      starty: 0,
      datax: props.data.x,
      datay: props.data.y,
    };
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }

  componentDidUpdate() {
    const stageCanvas = document.getElementById('canvas');
    const stagectx = stageCanvas.getContext('2d');
    stagectx.clearRect(0, 0, stageCanvas.width, stageCanvas.height);
    stagectx.drawImage(this.props.image, 0, 0);
  }

  mouseDown(e) {
    this.setState({
      datax: this.props.data.x,
      datay: this.props.data.y,
      mousedown: true,
      startx: e.clientX,
      starty: e.clientY,
    });
  }

  mouseUp(e) {
    this.setState({
      mousedown: false,
    });
  }

  mouseMove(e) {
    if (this.state.mousedown) {
      this.props.data.x = this.state.datax - (this.state.startx - e.clientX);
      this.props.data.y = this.state.datay - (this.state.starty - e.clientY);
      this.props.update();
    }
  }

  render() {
    return (
      <canvas
        id="canvas"
        width="1000"
        height="700"
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        onMouseMove={this.mouseMove}
      />
    );
  }
}

Canvas.propTypes = {
  data: React.PropTypes.object,
  image: React.PropTypes.object,
  update: React.PropTypes.func,
};

export default Canvas;