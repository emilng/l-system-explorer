var draw = function(guides) {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.strokeStyle = 'black';
  var x = 0;
  var y = 0;
  context.moveTo(x, y);

  for(var row = 0; row < guides.length; row++) {
    var guide = guides[row];
    var angle = 0;
    var forward = 10;
    var radians = Math.PI/180;
    for(var col = 0; col < guide.length; col++) {
      var c = guide[col];
      switch(c) {
        case 'F': //draw forward
          x += Math.cos(angle * radians) * forward;
          y += Math.sin(angle * radians) * forward;
          context.lineTo(x, y);
        break;
        case '+': //turn left 90
          angle = angle + 90;
        break;
        case '-': //turn right 90
          angle = angle - 90;
        break;
        default:
          break;
      }
    }
    context.stroke();
  }
}

var grammar = {
  'F': 'F+F-F-F+F'
};

var result = rewrite(grammar, 'F', 5);

draw(result);

console.table(result);
