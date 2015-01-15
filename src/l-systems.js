var LS = {
  // *** DATA ***
  /*
    decode / encode  data to URL hash

    hash is spit into 4 sections delimited by '/'
    1. axiom
      example: F[A]
      chars: [A-Z]\[\]
    2. rules
      example: F:F+[F-FF]F+
      chars: [A-Z]\[\]\:\+\-
    3. instructions - delimited by ';' then broken out into parameters: distance, angle, push(u)/pop(o)
      example: F,d10,a25,u;A,d5,a10
      chars: [0-9],\.up
    4. iterations
      example: 3
      chars: [0-9]
  */
  decodeHash: function () {
    var dataStrings = window.location.hash.substr(1).split('/');
    var data = {};
    var axiomString = dataStrings[0];
    var rulesString = dataStrings[1];
    var instructionsString = dataStrings[2];
    return {
      axiom: axiomString.split(''),
      rules: this.decodeRules(rulesString),
      instructions: this.decodeInstructions(instructionsString),
      iterations: iterations
    };
  },
  decodeRules: function (rulesString) {
    var rulesList = rulesString.split(',');
    return rulesList.reduce(function (rules, ruleString) {
      var splitRule = ruleString.split(':');
      var predecessor = splitRule[0];
      var successor = splitRule[1].split('');
      rules[predecessor] = successor;

      return rules;
    }, {});
  },
  decodeInstructions: function (instructionsString) {
    var instructionsList = instructionsString.split(';');
    return instructionsList.reduce(function (instructions, instructionParamString) {
      var instructionParams = instructionParamString.split(',');
      var instructionName = instructionParams.shift();

      // decode instruction params
      instructions[instructionName] = instructionParams.reduce(function (params, paramString) {
        var keyChar = paramString[0];
        var keyLookup = {
          'd':'distance',
          'a':'angle',
          'o':'pop',
          'u':'push'
        };
        var key = keyLookup[keyChar];
        var value = parseFloat(paramString.substr(1));
        params[key] = value;
        return params;
      }, {});

      return instructions;
    }, {});
  }
  // *** PARSING ***
  parseRules: function (rules, axiom, max_iter) {
    var generatedOutput = [axiom];
    var input = axiom;
    for (var i = 0; i < max_iter; i++) {
      var generated = input.reduce(function(output, char) {
        result = (rules[char] !== undefined) ? rules[char] : char;
        return output.concat(result);
      }, []);
      generatedOutput.push(generated);
      input = generated.concat();
    }
    return generatedOutput;
  }

  // *** UI ***


  // *** DRAWING ***

};var stringRules = rules.map(function(item) {
  return item.join('');
});
console.table(stringRules);
