import { getObjectEncoder } from './util';

const keyLookup = {
  x: 'x',
  y: 'y',
  a: 'angle',
  z: 'zoom',
  i: 'iterations',
};

const objectEncoder = getObjectEncoder(keyLookup, ',');

const start = {
  decode: objectEncoder.decode,
  encode: objectEncoder.encode,
};

export default start;
