var instructions = {
  decode: function(instructionsString) {
    var instructionsList = instructionsString.split(';');
    return instructionsList.map(function (instructionParamString) {
      var instructionParams = instructionParamString.split(',');
      var instructions = {rule: window.unescape(instructionParams.shift())};
      return instructionParams.reduce(function (params, paramString) {
        var keyChar = paramString[0];
        var keyLookup = {
          'd': 'distance',
          'a': 'angle',
          'b': 'branch'
        };
        var key = keyLookup[keyChar];
        var value = parseFloat(paramString.substr(1));
        params[key] = value;
        return params;
      }, instructions);
    });
  },
  encode: function(instructions) {
    var encodedInstructions = instructions.map(function(instruction) {
      var paramKeys = Object.keys(instruction);
      paramKeys.splice(paramKeys.indexOf('rule'), 1);
      var paramLookup = {
          'distance': 'd',
          'angle': 'a',
          'branch': 'b'
      };
      var params = paramKeys.map(function(paramKey) {
        return paramLookup[paramKey] + instruction[paramKey];
      });
      params.unshift(window.escape(instruction.rule));
      return params.join(',');
    });
    return encodedInstructions.join(';');
  }
};

module.exports = instructions;
