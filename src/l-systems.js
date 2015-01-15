var LS = {
  // *** DATA ***
  /*
    decode / encode  data to URL hash

    hash is split into the following sections delimited by '/'
    1. axiom
      example: F[A]
      chars: [A-Z]\[\]
    2. rules
      example: F:F+[F-FF]F+
      chars: [A-Z]\[\]\:\+\-
    3. instructions - delimited by ';' then split into parameters: distance(d), angle(d), push(u)/pop(o)
      example: F,d10,a25,u;A,d5,a10
      chars: [0-9],\.up
    4. iterations
      example: 3
      chars: [0-9]
    5. starting drawing values - delimited by ',' : x, y, angle
      x and y can have 'm' and 'w' or 'h' as values which mean 'middle', 'width' and 'height'
      example: xm,yh,a10
      chars: [0-9]xyamwh
  */
  decodeHash: function () {
    var dataStrings = window.location.hash.substr(1).split('/');
    var data = {};
    var axiomString = dataStrings[0];
    var rulesString = dataStrings[1];
    var instructionsString = dataStrings[2];
    var iterations = dataStrings[3];
    var startString = dataStrings[4];
    return {
      axiom: axiomString.split(''),
      rules: this.decodeRules(rulesString),
      instructions: this.decodeInstructions(instructionsString),
      iterations: iterations,
      start: this.decodeStart(startString)
    };
  },
  decodeRules: function (rulesString) {
    var rulesList = rulesString.split(',');
    return rulesList.reduce(function (rules, ruleString) {
      var splitRule = ruleString.split(':');
      var predecessor = splitRule[0];
      var successor = splitRule[1].split('');
      rules[predecessor] = successor;

      return rules;
    }, {});
  },
  decodeInstructions: function (instructionsString) {
    var instructionsList = instructionsString.split(';');
    return instructionsList.reduce(function (instructions, instructionParamString) {
      var instructionParams = instructionParamString.split(',');
      var instructionName = instructionParams.shift();

      // decode instruction params
      instructions[instructionName] = instructionParams.reduce(function (params, paramString) {
        var keyChar = paramString[0];
        var keyLookup = {
          'd':'distance',
          'a':'angle',
          'o':'pop',
          'u':'push'
        };
        var key = keyLookup[keyChar];
        var value = parseFloat(paramString.substr(1));
        params[key] = value;
        return params;
      }, {});

      return instructions;
    }, {});
  },
  decodeStart: function (startString) {
    var startList = startString.split(',');
    return startList.reduce(function (params, paramString) {
      var keyChar = paramString[0];
      var keyLookup = {
        'x':'x',
        'y':'y',
        'a':'angle'
      };
      var key = keyLookup[keyChar];
      var valueLookup = {
        'm':'middle',
        'w':'width',
        'h':'height'
      };
      var valueString = paramString.substr(1);
      var value;
      if ((String(valueString) === valueString) &&
          (valueLookup.hasOwnProperty(valueString))) {
        value = valueLookup[valueString];
      } else {
        value = parseFloat(valueString);
      }
      params[key] = value;
      return params;
    }, {});
  },
  encodeHash: function () {
  },

  // *** PARSING ***
  parseRules: function (rules, axiom, max_iter) {
    var generatedOutput = [axiom];
    var input = axiom;
    for (var i = 0; i < max_iter; i++) {
      var generated = input.reduce(function(output, char) {
        result = (rules[char] !== undefined) ? rules[char] : char;
        return output.concat(result);
      }, []);
      generatedOutput.push(generated);
      input = generated.concat();
    }
    return generatedOutput;
  },

  // *** UI ***


  // *** DRAWING ***
  draw: function (canvas, start, rules, instructions) {
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    var x;
    switch (start.x) {
      case 'middle':
        x = canvas.width/2;
        break;
      case 'width':
        x = canvas.width;
        break;
      default:
        x = start.x;
        break;
    }

    var y;
    switch (start.y) {
      case 'middle':
        y = canvas.height/2;
        break;
      case 'height':
        y = canvas.height;
        break;
      default:
        y = start.y;
        break;
    }
    var angle = start.angle;
    console.log(start, x, y, angle);
    var stack = [];
    var forward = 5;
    var radians = Math.PI/180;
    for (var i = 0, len = rules.length; i < len; i++) {
      var rule = rules[i];
      if (instructions.hasOwnProperty(rule)) {
        var instruction = instructions[rule];
        if (instruction.hasOwnProperty('angle')) {
          angle += instruction.angle;
        }
        if (instruction.hasOwnProperty('distance')) {
          forward = instruction.distance;
          x += Math.cos(angle * radians) * forward;
          y += Math.sin(angle * radians) * forward;
          ctx.lineTo(x, y);
        }
        if (instruction.hasOwnProperty('push')) {
          stack.push({angle: angle, x: x, y: y});
        }
        if (instruction.hasOwnProperty('pop')) {
          var settings = stack.pop();
          angle = settings.angle;
          x = settings.x;
          y = settings.x;
          ctx.moveTo(x, y);
        }
      }
    }
    ctx.stroke();
  }
};

var data = LS.decodeHash();
console.log(data);
var rules = LS.parseRules(data.rules, data.axiom, data.iterations);
var canvas = document.getElementById('canvas');
LS.draw(canvas, data.start, rules[rules.length - 1], data.instructions);

var stringRules = rules.map(function(item) {
  return item.join('');
});
console.table(stringRules);
