var parser = {
  parse: function (rules, axiom, max_iter) {
    var generatedOutput = [axiom];
    var input = axiom;
    var rule_lookup = rules.reduce(function(lookup, rule) {
      lookup[rule.rule] = rule.transform;
      return lookup;
    }, {});
    var result = '';
    var char = '';
    for (var i = 0; i < max_iter; i++) {
      var len = input.length;
      var j = 0;
      var generated = '';
      while (j < len) {
        char = input[j];
        result = (rule_lookup[char] !== undefined) ? rule_lookup[char] : char;
        generated += result;
        j++;
      }
      generatedOutput.push(generated);
      input = generated;
    }
    return generatedOutput;
  }
};

module.exports = parser;