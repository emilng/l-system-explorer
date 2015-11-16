var test = require('./encodeTestHelper.js');
var encodeInstructions = require('../../src/data/encodeInstructions.js');

test({
  encoder: encodeInstructions,
  name: 'encodeInstructions',
  encoded: 'F,d4;+,a25;-,a-25;%5B,b0;%5D,b1',
  decoded: [
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
  ]
});
