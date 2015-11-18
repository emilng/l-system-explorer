var decodeParams = function (params, paramString) {
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
};

var combineDecodedParams = function (paramString) {
  var params = paramString.split(',');
  var instructions = {rule: window.unescape(params.shift())};
  return params.reduce(decodeParams, instructions);
};

var decode = function(instructionString) {
  var instructionList = instructionString.split(';');
  return instructionList.map(combineDecodedParams);
};

var encodeParams = function(instruction) {
  var encodedRule = window.escape(instruction.rule);
  delete instruction.rule;
  var paramKeys = Object.keys(instruction);
  var paramLookup = {
      'distance': 'd',
      'angle': 'a',
      'branch': 'b'
  };
  var params = paramKeys.reduce(function(paramString, paramKey) {
    return paramString + ',' + paramLookup[paramKey] + instruction[paramKey];
  }, encodedRule);
  return params;
};

var encode = function(instructions) {
  var encodedInstructions = instructions.map(encodeParams);
  return encodedInstructions.join(';');
};

exports.decodeParams = decodeParams;
exports.combineDecodedParams = combineDecodedParams;
exports.decode = decode;
exports.encodeParams = encodeParams;
exports.encode = encode;
