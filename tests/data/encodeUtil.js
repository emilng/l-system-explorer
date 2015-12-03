var test = require('tape');
var encodeUtil = require('../../src/data/encodeUtil.js');

var keyLookup = {
  'd': 'distance',
  'a': 'angle',
  'b': 'branch'
};

var paramEncoder = encodeUtil.getParamEncoder(keyLookup);
var objectEncoder = encodeUtil.getObjectEncoder(keyLookup, ',');

var encodedParam = 'd100';
var decodedParamKey = 'distance';
var decodedParamValue = 100;
var decodedParam = { distance: 100 };

var encodedObject = 'd10,a20,b0';
var decodeObject = {
  distance: 10,
  angle: 20,
  branch: 0
};

test('encodeUtil paramEncoder decode', function(t) {
  var actual = paramEncoder.decode({}, encodedParam);
  var expected = decodedParam;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeUtil paramEncoder encode', function(t) {
  var actual = paramEncoder.encode(decodedParamValue, decodedParamKey);
  var expected = encodedParam;
  t.equal(actual, expected);
  t.end();
});

test('encodeUtil objectEncoder decode', function(t) {
  var actual = objectEncoder.decode(encodedObject);
  var expected = decodeObject;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeUtil objectEncoder encode', function(t) {
  var actual = objectEncoder.encode(decodeObject);
  var expected = encodedObject;
  t.equal(actual, expected);
  t.end();
});
