// *** DATA ***
/*
  decode / encode  data to URL hash

  hash is split into the following sections delimited by '/'
  1. axiom
    example: F[A]
    chars: [A-Z]\[\]
  2. rules
    example: F:F+[F-FF]F+
    chars: [A-Z]\[\]\:\+\-
  3. instructions - delimited by ';' then split into parameters: distance(d), angle(a), branch(b):0,1 (push,pop)
    example: F,d10,a25,p0;A,d5,a10,p1
    chars: [0-9],\.dap
  4. iterations - max number of iterations
    example: 3
    chars: [0-9]
  5. starting drawing values - delimited by ',' : x, y, angle, iteration to display
    example: x500,y300,a10,i5
    chars: [0-9]xyamwh
*/

var start = require('./encodeStart.js');
var rules = require('./encodeRules.js');
var instructions = require('./encodeInstructions.js');

var hash = {
  decode: function (data) {
    var hash = window.location.hash.substr(1);
    //hardcoded default for now if nothing is set
    if (hash === '') {
      hash = 'F/F:F+F-F-F+F/F,d3.5;+,a75;-,a-80/6/x347,y358,a70,i6,z100';
    }
    var dataStrings = hash.split('/');

    data.axiom = window.unescape(dataStrings[0]);
    data.rules = rules.decode(dataStrings[1]);
    data.instructions = instructions.decode(dataStrings[2]);
    data.iterations = dataStrings[3];
    data.start = start.decode(dataStrings[4]);
  },
  encode: function (data) {
    var axiom = data.axiom;
    var iterations = data.iterations;
    return '#' +
        [axiom,
         rules.encode(data.rules),
         instructions.encode(data.instructions),
         iterations,
         start.encode(data.start)].join('/');
  }
};

module.exports = hash;
