const test = require('./encodeTestHelper.js');
const encodeIterations = require('../../src/data/encodeIterations.js');

test({
  encoder: encodeIterations,
  name: 'encodeIterations',
  encoded: '10',
  decoded: 10,
});
