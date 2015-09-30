var rules = {
  decode: function(rulesString) {
    return rulesString.split(',').map(function(ruleString) {
      var splitRule = ruleString.split(':');
      return {rule: window.unescape(splitRule[0]), transform: window.unescape(splitRule[1])};
    });
  },
  encode: function(rules) {
    var ruleStrings = rules.map(function(rule) {
      if ((rule.rule !== undefined) && (rule.rule.length > 0)) {
        return window.escape(rule.rule[0]) + ':' + window.escape(rule.transform);
      }
    });
    return ruleStrings.join(',');
  }
};

module.exports = rules;
