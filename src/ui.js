// *** UI ***
var ui = {
  initCanvas: function(canvas, data, callback) {
    var startx, starty, datax, datay;
    var mousedown = false;
    var start = data.start;
    canvas.addEventListener("mousedown", function(event) {
      mousedown = true;
      startx = event.clientX;
      starty = event.clientY;
      datax = start.x;
      datay = start.y;
    });
    canvas.addEventListener("mouseup", function(event) {
      mousedown = false;
    });
    canvas.addEventListener("mousemove", function(event) {
      if (mousedown) {
        start.x = datax - (startx - event.clientX);
        start.y = datay - (starty - event.clientY);
        callback();
        data.needsRender = true;
      }
    });
  },
  initExamples: function(data) {
    var exampleCollection = document.getElementsByClassName('example');
    var i = exampleCollection.length;
    var examples = [];
    while(i--) {
      exampleCollection[i].addEventListener("click", function(event) {
        window.location.hash = event.target.hash;
        data.needsDecode = true;
      });
    }
  }
};

module.exports = ui;