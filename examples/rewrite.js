var rewrite = function (grammar, start, max_iter) {
    var output = [start];
    var inList = start.split('');
    for (var i = 0; i < max_iter; i++) {
      var outString = inList.reduce(function(outString, char) {
        result = (grammar[char] !== undefined) ? grammar[char] : char;
        return outString + result;
      }, "");
      output.push(outString);
      inList = outString.split('');
    }
    return output;
};