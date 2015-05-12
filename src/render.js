// *** RENDERING ***
var render = function (canvas, start, rules, instructions) {
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var x = start.x;
  var y = start.y;
  var angle = start.angle;
  var stack = [];
  var forward = 5;
  var zoom = start.zoom / 100;
  var radians = Math.PI / 180;
  ctx.moveTo(x, y);
  ctx.beginPath();
  var instructionLookup = instructions.reduce(function (lookupObj, instruction) {
    lookupObj[instruction.rule] = instruction;
    return lookupObj;
  }, {});
  for (var i = 0, len = rules.length; i < len; i++) {
    var rule = rules[i];
    if (instructionLookup.hasOwnProperty(rule)) {
      var instruction = instructionLookup[rule];
      if (instruction.hasOwnProperty('angle')) {
        angle += instruction.angle;
      }
      if (instruction.hasOwnProperty('distance')) {
        forward = instruction.distance * zoom;
        x += Math.cos(angle * radians) * forward;
        y += Math.sin(angle * radians) * forward;
        ctx.lineTo(x, y);
      }
      if (instruction.hasOwnProperty('branch')) {
        if (instruction.branch === 0) {
          stack.push({angle: angle, x: x, y: y});
        } else if (instruction.branch === 1) {
          if (stack.length > 0) {
            var settings = stack.pop();
            angle = settings.angle;
            x = settings.x;
            y = settings.y;
            ctx.moveTo(x, y);
          }
        }
      }
    }
  }
  ctx.stroke();
  ctx.closePath();
};

module.exports = render;
