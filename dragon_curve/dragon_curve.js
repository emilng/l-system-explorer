var draw = function(guides) {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.strokeStyle = 'black';
  var x = canvas.width/2;
  var y = 200;
  context.moveTo(x, y);

  for(var row = 0; row < guides.length; row++) {
    var guide = guides[row];
    var angle = 0;
    var forward = 4;
    var radians = Math.PI/180;
    for(var col = 0; col < guide.length; col++) {
      var c = guide[col];
      switch(c) {
        case 'F': //draw forward
        case 'G': //draw forward
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
  'X': 'X+YF+',
  'Y': '-FX-Y',
};

var result = rewrite(grammar, 'FX', 15 );

draw(result);

console.table(result);
