var start = {
  decode: function(startString) {
    var startList = startString.split(',');
    return startList.reduce(function (params, paramString) {
      var keyChar = paramString[0];
      var keyLookup = {
        'x': 'x',
        'y': 'y',
        'a': 'angle',
        'z': 'zoom',
        'i': 'iterations'
      };
      var key = keyLookup[keyChar];
      var value = parseFloat(paramString.substr(1));
      params[key] = value;
      return params;
    }, {});
  },
  encode: function(start) {
    var startKeys = Object.keys(start);
    var keyLookup = {
      'angle': 'a',
      'x': 'x',
      'y': 'y',
      'zoom': 'z',
      'iterations': 'i'
    };
    var startList = startKeys.reduce(function(startList, paramKey) {
      var startString = keyLookup[paramKey] + start[paramKey];
      startList.push(startString);
      return startList;
    }, []);
    return startList.join(',');
  }
};

module.exports = start;
