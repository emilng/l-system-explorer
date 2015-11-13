var test = require('tape');
var encodeIterations = require('../../src/data/encodeIterations.js');

test('encodeIterations decode', function(t) {
  var actual = encodeIterations.decode('10');
  var expected = 10;
  t.equal(actual, expected);
  t.end();
});

test('encodeIterations encode', function(t) {
  var actual = encodeIterations.encode(10);
  var expected = '10';
  t.equal(actual, expected);
  t.end();
});
