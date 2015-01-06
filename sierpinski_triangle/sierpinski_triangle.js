var draw = function(guides) {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.strokeStyle = 'black';
  var x = canvas.width/2;
  var y = canvas.height/2;
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
        case 'G': //draw forward
          x += Math.cos(angle * radians) * forward;
          y += Math.sin(angle * radians) * forward;
          context.lineTo(x, y);
        break;
        case '+': //turn left 120
          angle = angle + 120;
        break;
        case '-': //turn right 120
          angle = angle - 120;
        break;
        default:
          break;
      }
    }
    context.stroke();
  }
}

var grammar = {
  'F': 'F-G+F+G-F',
  'G': 'GG',
};

var result = rewrite(grammar, 'F-G-G', 5);

draw(result);

console.table(result);
