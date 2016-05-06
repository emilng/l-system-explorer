const hashSections = [
  {
    name: 'axiom',
    encoder: require('./encodeAxiom.js'),
  },
  {
    name: 'rules',
    encoder: require('./encodeRules.js'),
  },
  {
    name: 'instructions',
    encoder: require('./encodeInstructions.js'),
  },
  {
    name: 'iterations',
    encoder: require('./encodeIterations.js'),
  },
  {
    name: 'start',
    encoder: require('./encodeStart.js'),
  },
];

function decodeWith(hash, sections) {
  const data = {};
  const encodedSections = hash.split('/');

  sections.forEach((section, index) => {
    const encodedSection = encodedSections[index];
    data[section.name] = section.encoder.decode(encodedSection);
  });
  return data;
}

function decode(hash) {
  return decodeWith(hash, hashSections);
}

function encodeWith(data, sections) {
  const encodedData = sections.map((section) => {
    return section.encoder.encode(data[section.name]);
  });
  return '#' + encodedData.join('/');
}

function encode(data) {
  return encodeWith(data, hashSections);
}

exports.decode = decode;
exports.decodeWith = decodeWith;
exports.encode = encode;
exports.encodeWith = encodeWith;
