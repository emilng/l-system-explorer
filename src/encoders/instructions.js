import { map, omit } from 'lodash';
import { getParamEncoder } from './util.js';

const keyLookup = {
  d: 'distance',
  a: 'angle',
  b: 'branch',
  p: 'pen',
};

const paramEncoder = getParamEncoder(keyLookup);

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
  const instructionParams = omit(instruction, 'rule');
  const encodedInstruction = map(instructionParams, paramEncoder.encode);
  encodedInstruction.unshift(encodedRule);
  return encodedInstruction.join(',');
}

function encode(instructions) {
  const encodedInstructions = instructions.map(encodeInstruction);
  return encodedInstructions.join(';');
}

export default { decode, decodeInstruction, encode, encodeInstruction };