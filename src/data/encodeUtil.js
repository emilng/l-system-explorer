var _ = require('lodash');

var getParamEncoder = function(keyLookup) {
  var encodedKeyLookup = _.invert(keyLookup);

  return {
    decode: function(result, encodedParam) {
      var encodedKey = encodedParam[0];
      var key = keyLookup[encodedKey];
      var value = encodedParam.slice(1);
      var numberValue = parseFloat(value);
      result[key] = (value == numberValue) ? numberValue : value; // eslint-disable-line eqeqeq
      return result;
    },
    encode: function(value, key) {
      var encodedKey = encodedKeyLookup[key];
      return encodedKey + value;
    }
  };
};

var getObjectEncoder = function (keyLookup, delimiter) {
  var paramEncoder = getParamEncoder(keyLookup);

  return {
    decode: function(encodedObject) {
      var decodedParams = encodedObject.split(delimiter);
      return decodedParams.reduce(paramEncoder.decode, {});
    },
    encode: function(decodedObject) {
      var encodedParams = _.map(decodedObject, paramEncoder.encode);
      return encodedParams.join(delimiter);
    }
  };
};

exports.getParamEncoder = getParamEncoder;
exports.getObjectEncoder = getObjectEncoder;

