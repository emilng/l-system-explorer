const _ = require('lodash');

function getParamEncoder(keyLookup) {
  const encodedKeyLookup = _.invert(keyLookup);

  return {
    decode(result, encodedParam) {
      const encodedKey = encodedParam[0];
      const key = keyLookup[encodedKey];
      const value = encodedParam.slice(1);
      const numberValue = parseFloat(value);
      result[key] = (value == numberValue) ? numberValue : value; // eslint-disable-line eqeqeq
      return result;
    },
    encode(value, key) {
      const encodedKey = encodedKeyLookup[key];
      return encodedKey + value;
    },
  };
}

function getObjectEncoder(keyLookup, delimiter) {
  const paramEncoder = getParamEncoder(keyLookup);

  return {
    decode(encodedObject) {
      const decodedParams = encodedObject.split(delimiter);
      return decodedParams.reduce(paramEncoder.decode, {});
    },
    encode(decodedObject) {
      const encodedParams = _.map(decodedObject, paramEncoder.encode);
      return encodedParams.join(delimiter);
    },
  };
}

exports.getParamEncoder = getParamEncoder;
exports.getObjectEncoder = getObjectEncoder;

