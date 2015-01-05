
var mk_rule = function (pred, succ) {
    return { pred: pred, succ: succ };
};

var grammar = [
    mk_rule('A', 'AB'),
    mk_rule('B', 'A')
];

var rewrite = function (start, max_iter) {

    var result = start;

    for (var i = 0; i < max_iter; i++) {

        // loop through grammar and replace
    }
        
    return result;
};

var result = rewrite('A', 10);

console.log(result);

