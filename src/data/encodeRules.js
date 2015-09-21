var rules = {
  decode: function(rulesString) {
    return rulesString.split(',').map(function(ruleString) {
      var splitRule = ruleString.split(':');
      return {rule: splitRule[0], transform: splitRule[1]};
    });
  },
  encode: function(rules) {
    var ruleStrings = rules.map(function(rule) {
      if ((rule.rule !== undefined) && (rule.rule.length > 0)) {
        return rule.rule[0] + ':' + rule.transform;
      }
    });
    return ruleStrings.join(',');
  }
};

module.exports = rules;
