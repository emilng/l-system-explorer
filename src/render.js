const RADIANS = Math.PI / 180;

function render(canvas, start, rules, instructions) {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const zoom = start.zoom / 100;
  let x = start.x;
  let y = start.y;
  let angle = start.angle;
  let stack = [];
  let forward = 5;
  ctx.moveTo(x, y);
  ctx.beginPath();
  const instructionLookup = instructions.reduce((lookupObj, instruction) => {
    lookupObj[instruction.rule] = instruction;
    return lookupObj;
  }, {});
  for (let i = 0, len = rules.length; i < len; i++) {
    const rule = rules[i];
    if (instructionLookup.hasOwnProperty(rule)) {
      const instruction = instructionLookup[rule];
      const isPenDown = (instruction.hasOwnProperty('pen') && instruction.pen === 0) ? false : true;
      if (instruction.hasOwnProperty('angle')) {
        angle += instruction.angle;
      }
      if (instruction.hasOwnProperty('distance')) {
        forward = instruction.distance * zoom;
        x += Math.cos(angle * RADIANS) * forward;
        y += Math.sin(angle * RADIANS) * forward;
        if (isPenDown) {
          ctx.lineTo(x, y);
        } else {
          ctx.moveTo(x, y);
        }
      }
      if (instruction.hasOwnProperty('branch')) {
        if (instruction.branch === 0) {
          stack.push({ angle, x, y });
        } else if (instruction.branch === 1) {
          if (stack.length > 0) {
            const settings = stack.pop();
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
}

export default render;
