import axiom from './axiom';
import start from './start';
import rules from './rules';
import instructions from './instructions';
import iterations from './iterations';

const hashSections = [
  {
    name: 'axiom',
    encoder: axiom,
  },
  {
    name: 'rules',
    encoder: rules,
  },
  {
    name: 'instructions',
    encoder: instructions,
  },
  {
    name: 'iterations',
    encoder: iterations,
  },
  {
    name: 'start',
    encoder: start,
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

export { decode, decodeWith, encode, encodeWith };
