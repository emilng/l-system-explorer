var encodeUtil = require('./encodeUtil.js');

var keyLookup = {
  'x': 'x',
  'y': 'y',
  'a': 'angle',
  'z': 'zoom',
  'i': 'iterations'
};

var objectEncoder = encodeUtil.getObjectEncoder(keyLookup, ',');

var start = {
  decode: objectEncoder.decode,
  encode: objectEncoder.encode
};

module.exports = start;
