var draw = function(guides) {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.strokeStyle = 'green';
  context.lineWidth = 2;

  var guide = guides[guides.length - 1];
  var angle = -80;
  var forward = 2;
  var radians = Math.PI/180;
  var stack = [];
  var x = canvas.width/2;
  var y = canvas.height;
  context.moveTo(x, y);
  for(var col = 0; col < guide.length; col++) {
    var c = guide[col];
    switch(c) {
      case 'F': //draw forward
        x += Math.cos(angle * radians) * forward;
        y += Math.sin(angle * radians) * forward;
        context.lineTo(x, y);
      break;
      case '+': //turn left 25
        angle = angle + 25;
      break;
      case '-': //turn right 25
        angle = angle - 25;
      break;
      case '[':
        stack.push({angle: angle, x: x, y: y});
      break;
      case ']':
        var settings = stack.pop();
        angle = settings.angle;
        x = settings.x;
        y = settings.y;
        context.moveTo(x, y);
      break;
      default:
        break;
    }
  }
  context.stroke();
}

var grammar = {
  'X': 'F-[[X]+X]+F[+FX]-X',
  'F': 'FF',
};

var result = rewrite(grammar, 'X', 7 );

draw(result);

console.table(result);
