
var mk_rule = function (pred, succ) {
    return { pred: pred, succ: succ };
};

var rewrite = function (grammar, start, max_iter) {

    var result = start;
    var grammarLength = grammar.length;

    for (var i = 0; i < max_iter; i++) {

        for (var j = 0; j < grammarLength; j++) {

            var rule = grammar[j];

            result = result.replace(rule.pred, rule.succ);
        }
    }

    return result;
};

var grammar = [
    mk_rule('A', 'AB'),
    mk_rule('B', 'A')
];

var result = rewrite(grammar, 'A', 1);

console.log(result);
