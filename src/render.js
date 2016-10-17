function render(canvas, start, rules, instructions) {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const radians = Math.PI / 180;
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
