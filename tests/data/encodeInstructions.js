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

var combinedEncodedParams = 'F,d10,a20,b0,r5,o3,s1,t1,R30,O10,S5,T1';
var combinedDecodedParams = {
  rule: 'F',
  distance: 10,
  angle: 20,
  branch: 0,
  distanceRange: 5,
  distanceOffset: 3,
  distanceSpeed: 1,
  distanceType: 1,
  angleRange: 30,
  angleOffset: 10,
  angleSpeed: 5,
  angleType: 1
};

test('encodeInstructions decodeParams', function(t) {
  var actual = encodeInstructions.decodeParams({rule: 'F'}, 'd10,a20,b0');
  var expected = {rule: 'F', distance: 10};
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeInstructions combineDecodedParams', function(t) {
  var actual = encodeInstructions.combineDecodedParams(combinedEncodedParams);
  var expected = combinedDecodedParams;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeInstructions decode', function(t) {
  var actual = encodeInstructions.decode(encoded);
  var expected = decoded;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeInstructions encodeParams', function(t) {
  var actual = encodeInstructions.encodeParams(combinedDecodedParams);
  var expected = combinedEncodedParams;
  t.equal(actual, expected);
  t.end();
});

test('encodeInstructions encode', function(t) {
  var actual = encodeInstructions.encode(decoded);
  var expected = encoded;
  t.equal(actual, expected);
  t.end();
});
