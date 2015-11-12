var test = require('tape');
var rewrite = require('../src/rewrite.js');

var rules = [
  {rule: 'A', transform: 'AB'},
  {rule: 'B', transform: 'A'}
];

var ruleLookup = {'A': 'AB', 'B': 'A'};

var rewriteOutput = [ 'A', 'AB', 'ABA', 'ABAAB' ];

test('rewrite rule lookup', function(t) {
  var actual = rewrite.getRuleLookup(rules);
  var expected = ruleLookup;
  t.deepEqual(actual, expected);
  t.end();
});

test('rewrite single', function(t) {
  var actual = rewrite.single(ruleLookup, 'ABA');
  var expected = 'ABAAB';
  t.equal(actual, expected);
  t.end();
});

test('rewrite multiple', function(t) {
  var actual = rewrite.multiple(ruleLookup, 'A', 3);
  var expected = rewriteOutput;
  t.deepEqual(actual, expected);
  t.end();
});

test('rewrite write', function(t) {
  var actual = rewrite.write(rules, 'A', 3);
  var expected = rewriteOutput;
  t.deepEqual(actual, expected);
  t.end();
});
