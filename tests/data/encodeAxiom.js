var test = require('tape');
var encodeAxiom = require('../../src/data/encodeAxiom.js');

test('encodeAxiom decode', function(t) {
  var actual = encodeAxiom.decode('F+-%5B%5D');
  var expected = 'F+-[]';
  t.equal(actual, expected);
  t.end();
});

test('encodeAxiom encode', function(t) {
  var actual = encodeAxiom.encode('F+-[]');
  var expected = 'F+-%5B%5D';
  t.equal(actual, expected);
  t.end();
});
