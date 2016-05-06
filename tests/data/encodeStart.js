const test = require('./encodeTestHelper.js');
const encodeStart = require('../../src/data/encodeStart.js');

test({
  encoder: encodeStart,
  name: 'encodeStart',
  encoded: 'x347,y358,a70,i6,z100',
  decoded: {
    x: 347,
    y: 358,
    angle: 70,
    iterations: 6,
    zoom: 100,
  },
});
