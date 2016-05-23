// *** UI ***
function initCanvas(canvas, data, callback) {
  var startx;
  var starty;
  var datax;
  var datay;
  var mousedown = false;
  var start = data.start;
  canvas.addEventListener('mousedown', (event) => {
    mousedown = true;
    startx = event.clientX;
    starty = event.clientY;
    datax = start.x;
    datay = start.y;
  });
  canvas.addEventListener('mouseup', () => {
    mousedown = false;
  });
  canvas.addEventListener('mousemove', (event) => {
    if (mousedown) {
      start.x = datax - (startx - event.clientX);
      start.y = datay - (starty - event.clientY);
      callback();
    }
  });
}

function initExamples(data, callback) {
  const addExampleClickHandler = (example) => {
    example.addEventListener('click', (event) => {
      window.location.hash = event.target.hash;
      callback();
    });
  };

  const exampleCollection = document.getElementsByClassName('example');
  Array.prototype.forEach.call(exampleCollection, addExampleClickHandler);
}

module.exports = { initCanvas, initExamples };
