const rules = {
  decode(rulesString) {
    return rulesString.split(',').map((ruleString) => {
      const splitRule = ruleString.split(':');
      return { rule: window.unescape(splitRule[0]), transform: window.unescape(splitRule[1]) };
    });
  },
  encode(rulesObj) {
    const ruleStrings = rulesObj.map((ruleObj) => {
      const ruleExists = (ruleObj.rule !== undefined) && (ruleObj.rule.length > 0);
      return (ruleExists) ? `${window.escape(ruleObj.rule[0])}:${window.escape(ruleObj.transform)}` : '';
    });
    return ruleStrings.join(',');
  },
};

export default rules;
