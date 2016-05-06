const test = require('tape');
const encodeHash = require('../../src/data/encodeHash.js');

const decodedRules = [
  {
    rule: 'F',
    transform: 'F+F-F-F+F',
  },
];

const decodedInstructions = [
  {
    rule: 'F',
    distance: 3.5,
  },
  {
    rule: '+',
    angle: 75,
  },
  {
    rule: '-',
    angle: -80,
  },
];

const decodedStart = {
  x: 347,
  y: 358,
  angle: 70,
  iterations: 6,
  zoom: 100,
};

const hashSectionsMock = [
  {
    name: 'axiom',
    encoder: {
      decode() { return 'F'; },
      encode() { return 'F'; },
    },
  },
  {
    name: 'rules',
    encoder: {
      decode() { return decodedRules; },
      encode() { return 'F:F+F-F-F+F'; },
    },
  },
  {
    name: 'instructions',
    encoder: {
      decode() { return decodedInstructions; },
      encode() { return 'F,d3.5;+,a75;-,a-80'; },
    },
  },
  {
    name: 'iterations',
    encoder: {
      decode() { return 6; },
      encode() { return '6'; },
    },
  },
  {
    name: 'start',
    encoder: {
      decode() { return decodedStart; },
      encode() { return 'x347,y358,a70,i6,z100'; },
    },
  },
];

const encoded = '#F/F:F+F-F-F+F/F,d3.5;+,a75;-,a-80/6/x347,y358,a70,i6,z100';
const decoded = {
  axiom: 'F',
  rules: decodedRules,
  instructions: decodedInstructions,
  iterations: 6,
  start: decodedStart,
};

test('encodeHash decodeWith', (t) => {
  const actual = encodeHash.decodeWith(encoded, hashSectionsMock);
  const expected = decoded;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeHash encodeWith', (t) => {
  const actual = encodeHash.encodeWith(decoded, hashSectionsMock);
  const expected = encoded;
  t.equal(actual, expected);
  t.end();
});
