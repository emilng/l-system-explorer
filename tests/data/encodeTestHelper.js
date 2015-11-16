var test = require('tape');

/*
  options = {
    encoder: <encoder with decode and encode methods>,
    name: <name of encoder>,
    encoded: <encoded value>,
    decoded: <decoded value>
  }
*/

var getCompareMethod = function(decoded) {
  var compareMethod = (typeof decoded === 'object') ? 'deepEqual' : 'equal';
  return function(t, actual, expected) {
    t[compareMethod](actual, expected);
    t.end();
  };
};

var testHelper = function(options) {
  var compare = getCompareMethod(options.decoded);

  test(options.name + ' decode', function(t) {
    var actual = options.encoder.decode(options.encoded);
    var expected = options.decoded;
    compare(t, actual, expected);
  });

  test(options.name + ' encode', function(t) {
    var actual = options.encoder.encode(options.decoded);
    var expected = options.encoded;
    compare(t, actual, expected);
  });
};

module.exports = testHelper;
