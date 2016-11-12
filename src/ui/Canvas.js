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
      this.datax = this.data.start.x;
      this.datay = this.data.start.y;
      this.updateData();
    });
    canvas.addEventListener('mouseup', () => {
      this.mousedown = false;
    });
    canvas.addEventListener('mousemove', (e) => {
      if (this.mousedown) {
        this.data.start.x = this.datax - (this.startx - e.clientX);
        this.data.start.y = this.datay - (this.starty - e.clientY);
        window.requestAnimationFrame(this.updateData);
      }
    });
  }

  setData(data) {
    this.data = data;
  }

  updateData() {
    this.callback(this.data);
  }
}

export default Canvas;