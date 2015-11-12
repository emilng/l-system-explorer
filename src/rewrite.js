var rewrite = {
  multiple: function (rules, axiom, maxIter) {
    var generatedOutput = [axiom];
    var input = axiom;
    var ruleLookup = rules.reduce(function(lookup, rule) {
      lookup[rule.rule] = rule.transform;
      return lookup;
    }, {});
    var result = '';
    var char = '';
    for (var i = 0; i < maxIter; i++) {
      var len = input.length;
      var j = 0;
      var generated = '';
      while (j < len) {
        char = input[j];
        result = (ruleLookup[char] !== undefined) ? ruleLookup[char] : char;
        generated += result;
        j++;
      }
      generatedOutput.push(generated);
      input = generated;
    }
    return generatedOutput;
  }
};

module.exports = rewrite;
