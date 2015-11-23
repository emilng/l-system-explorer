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
