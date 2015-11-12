// converts array of rule objects to rules hash for fast lookup
var getRuleLookup = function(rules) {
  return rules.reduce(function(lookup, rule) {
    lookup[rule.rule] = rule.transform;
    return lookup;
  }, {});
};

// iterates through input once
var single = function(ruleLookup, input) {
  var char = '';
  var result = '';
  var output = '';
  for (var i = 0, len = input.length; i < len; i++) {
    char = input[i];
    result = (ruleLookup[char] !== undefined) ? ruleLookup[char] : char;
    output += result;
  }
  return output;
};

// iterates through input several times and outputs array of each iteration
var multiple = function (ruleLookup, input, maxIterations) {
  var output = [input];
  var generated = input;
  for (var i = 0; i < maxIterations; i++) {
    generated = single(ruleLookup, generated);
    output.push(generated);
  }
  return output;
};

// wrapper for multiple that converts rules to rulesLookup
var write = function(rules, input, maxIterations) {
  var ruleLookup = getRuleLookup(rules);
  return multiple(ruleLookup, input, maxIterations);
};

exports.getRuleLookup = getRuleLookup;
exports.single = single;
exports.multiple = multiple;
exports.write = write;

