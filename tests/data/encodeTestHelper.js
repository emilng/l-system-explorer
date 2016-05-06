const test = require('tape');

/*
  options = {
    encoder: <encoder with decode and encode methods>,
    name: <name of encoder>,
    encoded: <encoded value>,
    decoded: <decoded value>
  }
*/

const getCompareMethod = (decoded) => {
  const compareMethod = (typeof decoded === 'object') ? 'deepEqual' : 'equal';
  return (t, actual, expected) => {
    t[compareMethod](actual, expected);
    t.end();
  };
};

const testHelper = (options) => {
  const compare = getCompareMethod(options.decoded);

  test(`${options.name} decode`, (t) => {
    const actual = options.encoder.decode(options.encoded);
    const expected = options.decoded;
    compare(t, actual, expected);
  });

  test(`${options.name} encode`, (t) => {
    const actual = options.encoder.encode(options.decoded);
    const expected = options.encoded;
    compare(t, actual, expected);
  });
};

module.exports = testHelper;
