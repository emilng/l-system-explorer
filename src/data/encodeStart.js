const encodeUtil = require('./encodeUtil.js');

const keyLookup = {
  x: 'x',
  y: 'y',
  a: 'angle',
  z: 'zoom',
  i: 'iterations',
};

const objectEncoder = encodeUtil.getObjectEncoder(keyLookup, ',');

const start = {
  decode: objectEncoder.decode,
  encode: objectEncoder.encode,
};

module.exports = start;
