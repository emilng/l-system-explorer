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
  3. instructions - delimited by ';' then split into parameters: distance(d), angle(a), branch(b):0,1 (push,pop)
    example: F,d10,a25,p0;A,d5,a10,p1
    chars: [0-9],\.dap
  4. iterations - max number of iterations
    example: 3
    chars: [0-9]
  5. starting drawing values - delimited by ',' : x, y, angle, iteration to display
    example: x500,y300,a10,i5
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
    var rulesString = dataStrings[1];
    var instructionsString = dataStrings[2];
    var iterations = dataStrings[3];
    var startString = dataStrings[4];

    data.axiom = dataStrings[0];
    data.rules = this.decodeRules(rulesString);
    data.instructions = this.decodeInstructions(instructionsString);
    data.iterations = iterations;
    data.start = this.decodeStart(startString);
  },
  decodeRules: function (rulesString) {
    var rulesList = rulesString.split(',');
    return rulesList.map(function(ruleString) {
      var splitRule = ruleString.split(':');
      return {rule: splitRule[0], transform: splitRule[1]};
    });
  },
  decodeInstructions: function (instructionsString) {
    var instructionsList = instructionsString.split(';');
    return instructionsList.map(function (instructionParamString) {
      var instructionParams = instructionParamString.split(',');
      var instructions = {rule: instructionParams.shift()};
      return instructionParams.reduce(function (params, paramString) {
        var keyChar = paramString[0];
        var keyLookup = {
          'd':'distance',
          'a':'angle',
          'b':'branch'
        };
        var key = keyLookup[keyChar];
        var value = parseFloat(paramString.substr(1));
        params[key] = value;
        return params;
      }, instructions);
    });
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
    var axiom = data.axiom;
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
    var ruleStrings = rules.map(function(rule) {
      if ((rule.rule !== undefined) && (rule.rule.length > 0)) {
        return rule.rule[0] + ':' + rule.transform;
      }
    });
    return ruleStrings.join(',');
  },
  encodeInstructions: function(instructions) {
    var encodedInstructions = instructions.map(function(instruction) {
      var paramKeys = Object.keys(instruction);
      paramKeys.splice(paramKeys.indexOf('rule'), 1);
      var paramLookup = {
          'distance':'d',
          'angle':'a',
          'branch':'b'
      };
      var params = paramKeys.map(function(paramKey) {
        return paramLookup[paramKey] + instruction[paramKey];
      });
      params.unshift(instruction.rule);
      return params.join(',');
    });
    return encodedInstructions.join(';');
  },
  encodeStart: function(start) {
    var startKeys = Object.keys(start);
    var keyLookup = {
      'angle':'a',
      'x':'x',
      'y':'y',
      'iterations':'i'
    };
    var startList = startKeys.reduce(function(startList, paramKey) {
      var startString = keyLookup[paramKey] + start[paramKey];
      startList.push(startString);
      return startList;
    }, []);
    return startList.join(',');
  }
};

module.exports = encoder;
