const test = require('tape');
const encodeInstructions = require('../../src/data/encodeInstructions.js');

const encoded = 'F,d4;+,a25;-,a-25;%5B,b0;%5D,b1';
const decoded = [
  {
    rule: 'F',
    distance: 4,
  },
  {
    rule: '+',
    angle: 25,
  },
  {
    rule: '-',
    angle: -25,
  },
  {
    rule: '[',
    branch: 0,
  },
  {
    rule: ']',
    branch: 1,
  },
];

const encodedInstruction = 'F,d10.5,a20.2,b0';
const decodedInstruction = {
  rule: 'F',
  distance: 10.5,
  angle: 20.2,
  branch: 0,
};

test('encodeInstructions decodeInstruction', (t) => {
  const actual = encodeInstructions.decodeInstruction(encodedInstruction);
  const expected = decodedInstruction;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeInstructions decode', (t) => {
  const actual = encodeInstructions.decode(encoded);
  const expected = decoded;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeInstructions encodeInstruction', (t) => {
  const actual = encodeInstructions.encodeInstruction(decodedInstruction);
  const expected = encodedInstruction;
  t.equal(actual, expected);
  t.end();
});

test('encodeInstructions encode', (t) => {
  const actual = encodeInstructions.encode(decoded);
  const expected = encoded;
  t.equal(actual, expected);
  t.end();
});
