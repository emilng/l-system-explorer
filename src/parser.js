var parser = {
  parse: function (rules, axiom, max_iter) {
    var generatedOutput = [axiom];
    var input = axiom;
    for (var i = 0; i < max_iter; i++) {
      var generated = input.reduce(function(output, char) {
        var result = (rules[char] !== undefined) ? rules[char] : char;
        return output.concat(result);
      }, []);
      generatedOutput.push(generated);
      input = generated.concat();
    }
    return generatedOutput;
  }
};

module.exports = parser;