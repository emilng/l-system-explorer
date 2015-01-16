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
    4. iterations - max number of iterations
      example: 3
      chars: [0-9]
    5. starting drawing values - delimited by ',' : x, y, angle, iteration to display
      example: x500,y300,a10
      chars: [0-9]xyamwh
  */
  decodeHash: function () {
    var dataStrings = window.location.hash.substr(1).split('/');
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
      start: this.decodeStart(startString),
      needsReparse: true,
      needsRedraw: true
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
        'a':'angle',
        'i':'iterations'
      };
      var key = keyLookup[keyChar];
      var value = parseFloat(paramString.substr(1));
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
  ui: function(context, updateFunction, data) {
    var inputCollection = document.getElementsByTagName('input');
    var update = updateFunction.bind(context);
    var inputs = [];
    var i = inputCollection.length;
    while(i--) {
      inputs.push(inputCollection[i]);
    }
    inputs.map(function(input) {
      var splitInput = input.id.split('-');
      var type = splitInput[0];
      var param = splitInput[1];
      switch (type) {
        case 'initial':
          input.value = data.start[param];
          break;
      }
      input.addEventListener("input", function(event) {
        switch(type) {
          case 'initial':
            data.start[param] = parseInt(event.currentTarget.value);
            data.needsRedraw = true;
            break;
        }
        update();
      });
    });
  },

  // *** DRAWING ***
  draw: function (canvas, start, rules, instructions) {
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var x = start.x;
    var y = start.y;
    var angle = start.angle;
    var stack = [];
    var forward = 5;
    var radians = Math.PI/180;
    ctx.moveTo(x,y);
    ctx.beginPath();
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
    ctx.closePath();
  }
};

var data = LS.decodeHash();
// console.log(data);
var rules = LS.parseRules(data.rules, data.axiom, data.iterations);
var canvas = document.getElementById('canvas');

// var stringRules = rules.map(function(item) {
//   return item.join('');
// });
// console.table(stringRules);

var update = function() {
  if (data.needsRedraw) {
    console.log('update');
    var iterations = Math.min(rules.length - 1, data.start.iterations);
    console.log(iterations);
    LS.draw(canvas, data.start, rules[iterations], data.instructions);
    requestAnimationFrame(update);
    data.needsRedraw = false;
  }
}

LS.ui(this, update, data);

requestAnimationFrame(update);
