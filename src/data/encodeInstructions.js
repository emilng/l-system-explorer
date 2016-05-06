const _ = require('lodash');
const encodeUtil = require('./encodeUtil.js');

const keyLookup = {
  d: 'distance',
  a: 'angle',
  b: 'branch',
};

const paramEncoder = encodeUtil.getParamEncoder(keyLookup);

function decodeInstruction(paramString) {
  const params = paramString.split(',');
  const decodedRule = window.unescape(params.shift());
  return params.reduce(paramEncoder.decode, { rule: decodedRule });
}

function decode(instructionString) {
  const instructionList = instructionString.split(';');
  return instructionList.map(decodeInstruction);
}

function encodeInstruction(instruction) {
  const encodedRule = window.escape(instruction.rule);
  const instructionParams = _.omit(instruction, 'rule');
  const encodedInstruction = _.map(instructionParams, paramEncoder.encode);
  encodedInstruction.unshift(encodedRule);
  return encodedInstruction.join(',');
}

function encode(instructions) {
  const encodedInstructions = instructions.map(encodeInstruction);
  return encodedInstructions.join(';');
}

exports.decodeInstruction = decodeInstruction;
exports.decode = decode;
exports.encodeInstruction = encodeInstruction;
exports.encode = encode;
