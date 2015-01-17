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
var encoder = {
  decodeHash: function (data) {
    var hash = window.location.hash.substr(1);
    //hardcoded default for now if nothing is set
    if (hash === '') {
      hash = 'F/F:F+F-F-F+F/F,d3.5;+,a75;-,a-80/6/x347,y358,a70,i6';
    }
    var dataStrings = hash.split('/');
    var axiomString = dataStrings[0];
    var rulesString = dataStrings[1];
    var instructionsString = dataStrings[2];
    var iterations = dataStrings[3];
    var startString = dataStrings[4];

    data.axiom = axiomString.split('');
    data.rules = this.decodeRules(rulesString);
    data.instructions = this.decodeInstructions(instructionsString);
    data.iterations = iterations;
    data.start = this.decodeStart(startString);
    data.needsReparse = true;
    data.needsRedraw = true;
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
  encodeHash: function (data) {
    var axiom = data.axiom.join('');
    var rules = this.encodeRules(data.rules);
    var instructions = this.encodeInstructions(data.instructions);
    var iterations = data.iterations;
    var start = this.encodeStart(data.start);
    return '#' +
        [axiom,
         rules,
         instructions,
         iterations,
         start].join('/');
  },
  encodeRules: function (rules) {
    var keys = Object.keys(rules);
    var ruleList = keys.reduce(function(ruleList, rule) {
      ruleList.push(rule + ':' + rules[rule].join(''));
      return ruleList;
    }, []);
    return ruleList.join(',');
  },
  encodeInstructions: function(instructions) {
    var instructionKeys = Object.keys(instructions);
    var instructionList = instructionKeys.reduce(function(instructionList, instructionKey) {
      var instructionObj = instructions[instructionKey];
      var paramKeys = Object.keys(instructionObj);
      var paramLookup = {
          'distance':'d',
          'angle':'a',
          'pop':'o',
          'push':'u'
      }
      var paramString = paramKeys.reduce(function(paramString, paramKey) {
        return paramString + ',' + paramLookup[paramKey] + instructionObj[paramKey];
      }, '');
      instructionList.push(instructionKey + paramString);
      return instructionList;
    }, []);
    return instructionList.join(';');
  },
  encodeStart: function(start) {
    var startKeys = Object.keys(start);
    var keyLookup = {
      'angle':'a',
      'x':'x',
      'y':'y',
      'iterations':'i'
    }
    var startList = startKeys.reduce(function(startList, paramKey) {
      var startString = keyLookup[paramKey] + start[paramKey];
      startList.push(startString);
      return startList;
    }, []);
    return startList.join(',');
  }
};

// *** PARSING ***
var parseRules = function (rules, axiom, max_iter) {
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
};

// *** UI ***
var ui = {
  inputs: function (data) {
    var inputCollection = document.getElementsByTagName('input');
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
      });
    });
  },
  examples: function(data, callback) {
    var exampleCollection = document.getElementsByClassName('example');
    var i = exampleCollection.length;
    var examples = [];
    while(i--) {
      exampleCollection[i].addEventListener("click", function(event) {
        window.location.hash = event.target.hash;
        callback();
      });
    }
  }
};

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
};

var data = {};

encoder.decodeHash(data);
// console.log(data);
var canvas = document.getElementById('canvas');

// var stringRules = rules.map(function(item) {
//   return item.join('');
// });
// console.table(stringRules);

var exampleCallback = function() {
  encoder.decodeHash(data);
};

ui.inputs(data);
ui.examples(data, exampleCallback);

var update = function() {
  if (data.needsReparse) {
    data.parsedRules = parseRules(data.rules, data.axiom, data.iterations);
  }
  if (data.needsRedraw) {
    var iterations = Math.min(data.parsedRules.length - 1, data.start.iterations);
    render(canvas, data.start, data.parsedRules[iterations], data.instructions);
    data.needsRedraw = false;
    window.location.hash = encoder.encodeHash(data);
  }
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
