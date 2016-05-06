const test = require('tape');
const rewrite = require('../src/rewrite.js');

const rules = [
  { rule: 'A', transform: 'AB' },
  { rule: 'B', transform: 'A' },
];

const ruleLookup = { A: 'AB', B: 'A' };

const rewriteOutput = ['A', 'AB', 'ABA', 'ABAAB'];

test('rewrite rule lookup', (t) => {
  const actual = rewrite.getRuleLookup(rules);
  const expected = ruleLookup;
  t.deepEqual(actual, expected);
  t.end();
});

test('rewrite single', (t) => {
  const actual = rewrite.single(ruleLookup, 'ABA');
  const expected = 'ABAAB';
  t.equal(actual, expected);
  t.end();
});

test('rewrite multiple', (t) => {
  const actual = rewrite.multiple(ruleLookup, 'A', 3);
  const expected = rewriteOutput;
  t.deepEqual(actual, expected);
  t.end();
});

test('rewrite write', (t) => {
  const actual = rewrite.write(rules, 'A', 3);
  const expected = rewriteOutput;
  t.deepEqual(actual, expected);
  t.end();
});
