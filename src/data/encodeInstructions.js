
var _ = require('lodash');
var encodeUtil = require('./encodeUtil.js');

var keyLookup = {
  'd': 'distance',
  'a': 'angle',
  'b': 'branch'
};

var paramEncoder = encodeUtil.getParamEncoder(keyLookup);

var decodeInstruction = function (paramString) {
  var params = paramString.split(',');
  var decodedRule = window.unescape(params.shift());
  return params.reduce(paramEncoder.decode, {rule: decodedRule});
};

var decode = function(instructionString) {
  var instructionList = instructionString.split(';');
  return instructionList.map(decodeInstruction);
};

var encodeInstruction = function(instruction) {
  var encodedRule = window.escape(instruction.rule);
  var instructionParams = _.omit(instruction, 'rule');
  var encodedInstruction = _.map(instructionParams, paramEncoder.encode);
  encodedInstruction.unshift(encodedRule);
  return encodedInstruction.join(',');
};

var encode = function(instructions) {
  var encodedInstructions = instructions.map(encodeInstruction);
  return encodedInstructions.join(';');
};

exports.decodeInstruction = decodeInstruction;
exports.decode = decode;
exports.encodeInstruction = encodeInstruction;
exports.encode = encode;
