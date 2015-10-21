// *** UI ***
var ui = {
  initCanvas: function(canvas, data, callback) {
    var startx, starty, datax, datay;
    var mousedown = false;
    var start = data.start;
    canvas.addEventListener('mousedown', function(event) {
      mousedown = true;
      startx = event.clientX;
      starty = event.clientY;
      datax = start.x;
      datay = start.y;
    });
    canvas.addEventListener('mouseup', function() {
      mousedown = false;
    });
    canvas.addEventListener('mousemove', function(event) {
      if (mousedown) {
        start.x = datax - (startx - event.clientX);
        start.y = datay - (starty - event.clientY);
        callback();
      }
    });
  },
  initExamples: function(data, callback) {
    var addExampleClickHandler = function(example) {
      example.addEventListener('click', function(event) {
        window.location.hash = event.target.hash;
        callback();
      });
    };

    var exampleCollection = document.getElementsByClassName('example');
    Array.prototype.forEach.call(exampleCollection, addExampleClickHandler);
  }
};

module.exports = ui;
