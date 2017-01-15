import { getObjectEncoder } from './util';

const keyLookup = {
  e: 'enable',
  s: 'seed',
  o: 'order',
  i: 'iteration',
};

const objectEncoder = getObjectEncoder(keyLookup, ',');

const markov = {
  decode: objectEncoder.decode,
  encode: objectEncoder.encode,
};

export default markov;