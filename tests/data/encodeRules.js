var test = require('./encodeTestHelper.js');
var encodeRules = require('../../src/data/encodeRules.js');

test({
  encoder: encodeRules,
  name: 'encodeRules',
  encoded: 'X:X+YF+,Y:-FX-Y',
  decoded: [
    {
      rule: 'X',
      transform: 'X+YF+'
    },
    {
      rule: 'Y',
      transform: '-FX-Y'
    }
  ]
});
