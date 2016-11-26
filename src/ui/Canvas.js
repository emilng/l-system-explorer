class Canvas {
  constructor(canvas, data, callback) {
    this.mousedown = false;
    this.callback = callback;
    this.data = data;
    this.setData = this.setData.bind(this);
    this.updateData = this.updateData.bind(this);
    canvas.addEventListener('mousedown', (e) => {
      this.mousedown = true;
      this.startx = e.clientX;
      this.starty = e.clientY;
      this.datax = this.data.x;
      this.datay = this.data.y;
    });
    canvas.addEventListener('mouseup', () => {
      this.mousedown = false;
    });
    canvas.addEventListener('mousemove', (e) => {
      if (this.mousedown) {
        this.x = this.datax - (this.startx - e.clientX);
        this.y = this.datay - (this.starty - e.clientY);
        window.requestAnimationFrame(this.updateData);
      }
    });
  }

  setData(data) {
    this.data = data;
  }

  updateData() {
    this.callback({ ...this.data, x: this.x, y: this.y });
  }
}

export default Canvas;