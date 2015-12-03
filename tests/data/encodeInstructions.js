var test = require('tape');
var encodeInstructions = require('../../src/data/encodeInstructions.js');

var encoded = 'F,d4;+,a25;-,a-25;%5B,b0;%5D,b1';
var decoded = [
  {
    rule: 'F',
    distance: 4
  },
  {
    rule: '+',
    angle: 25
  },
  {
    rule: '-',
    angle: -25
  },
  {
    rule: '[',
    branch: 0
  },
  {
    rule: ']',
    branch: 1
  }
];

var encodedInstruction = 'F,d10.5,a20.2,b0';
var decodedInstruction = {
  rule: 'F',
  distance: 10.5,
  angle: 20.2,
  branch: 0
};

test('encodeInstructions decodeInstruction', function(t) {
  var actual = encodeInstructions.decodeInstruction(encodedInstruction);
  var expected = decodedInstruction;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeInstructions decode', function(t) {
  var actual = encodeInstructions.decode(encoded);
  var expected = decoded;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeInstructions encodeInstruction', function(t) {
  var actual = encodeInstructions.encodeInstruction(decodedInstruction);
  var expected = encodedInstruction;
  t.equal(actual, expected);
  t.end();
});

test('encodeInstructions encode', function(t) {
  var actual = encodeInstructions.encode(decoded);
  var expected = encoded;
  t.equal(actual, expected);
  t.end();
});
