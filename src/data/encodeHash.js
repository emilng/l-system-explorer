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

var hashSections = [
  {
    name: 'axiom',
    encoder: require('./encodeAxiom.js')
  },
  {
    name: 'rules',
    encoder: require('./encodeRules.js')
  },
  {
    name: 'instructions',
    encoder: require('./encodeInstructions.js')
  },
  {
    name: 'iterations',
    encoder: require('./encodeIterations.js')
  },
  {
    name: 'start',
    encoder: require('./encodeStart.js')
  }
];

var decodeWith = function(hash, sections) {
  var data = {};
  var encodedSections = hash.split('/');

  sections.forEach(function(section, index) {
    var encodedSection = encodedSections[index];
    data[section.name] = section.encoder.decode(encodedSection);
  });
  return data;
};

var decode = function (hash) {
  return decodeWith(hash, hashSections);
};

var encodeWith = function(data, sections) {
  var encodedData = sections.map(function(section) {
    return section.encoder.encode(data[section.name]);
  });
  return '#' + encodedData.join('/');
};

var encode = function (data) {
  return encodeWith(data, hashSections);
};

exports.decode = decode;
exports.decodeWith = decodeWith;
exports.encode = encode;
exports.encodeWith = encodeWith;
