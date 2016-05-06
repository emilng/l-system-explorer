const test = require('tape');
const encodeUtil = require('../../src/data/encodeUtil.js');

const keyLookup = {
  d: 'distance',
  a: 'angle',
  b: 'branch',
};

const paramEncoder = encodeUtil.getParamEncoder(keyLookup);
const objectEncoder = encodeUtil.getObjectEncoder(keyLookup, ',');

const encodedParam = 'd100';
const decodedParamKey = 'distance';
const decodedParamValue = 100;
const decodedParam = { distance: 100 };

const encodedObject = 'd10,a20,b0';
const decodeObject = {
  distance: 10,
  angle: 20,
  branch: 0,
};

test('encodeUtil paramEncoder decode', (t) => {
  const actual = paramEncoder.decode({}, encodedParam);
  const expected = decodedParam;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeUtil paramEncoder encode', (t) => {
  const actual = paramEncoder.encode(decodedParamValue, decodedParamKey);
  const expected = encodedParam;
  t.equal(actual, expected);
  t.end();
});

test('encodeUtil objectEncoder decode', (t) => {
  const actual = objectEncoder.decode(encodedObject);
  const expected = decodeObject;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeUtil objectEncoder encode', (t) => {
  const actual = objectEncoder.encode(decodeObject);
  const expected = encodedObject;
  t.equal(actual, expected);
  t.end();
});
