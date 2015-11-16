var test = require('./encodeTestHelper.js');
var encodeAxiom = require('../../src/data/encodeAxiom.js');

test({
  encoder: encodeAxiom,
  name: 'encodeAxiom',
  encoded: 'F+-%5B%5D',
  decoded: 'F+-[]'
});
