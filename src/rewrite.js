// converts array of rule objects to rules hash for fast lookup
function getRuleLookup(rules) {
  return rules.reduce((lookup, rule) => {
    lookup[rule.rule] = rule.transform;
    return lookup;
  }, {});
}

// iterates through input once
function single(ruleLookup, input) {
  let output = '';
  for (let i = 0, len = input.length; i < len; i++) {
    const char = input[i];
    const result = (ruleLookup[char] !== undefined) ? ruleLookup[char] : char;
    output += result;
  }
  return output;
}

// iterates through input several times and outputs array of each iteration
function multiple(ruleLookup, input, maxIterations) {
  const output = [input];
  let generated = input;
  for (let i = 0; i < maxIterations; i++) {
    generated = single(ruleLookup, generated);
    output.push(generated);
  }
  return output;
}

// wrapper for multiple that converts rules to rulesLookup
function write(rules, input, maxIterations) {
  const ruleLookup = getRuleLookup(rules);
  return multiple(ruleLookup, input, maxIterations);
}

module.exports = { getRuleLookup, single, multiple, write };
