var test = require('tape');
var encodeHash = require('../../src/data/encodeHash.js');

var decodedRules = [
  {
    rule: 'F',
    transform: 'F+F-F-F+F'
  }
];

var decodedInstructions = [
  {
    rule: 'F',
    distance: 3.5
  },
  {
    rule: '+',
    angle: 75
  },
  {
    rule: '-',
    angle: -80
  }
];

var decodedStart = {
  x: 347,
  y: 358,
  angle: 70,
  iterations: 6,
  zoom: 100
};

var hashSectionsMock = [
  {
    name: 'axiom',
    encoder: {
      decode: function() { return 'F'; },
      encode: function() { return 'F'; }
    }
  },
  {
    name: 'rules',
    encoder: {
      decode: function() { return decodedRules; },
      encode: function() { return 'F:F+F-F-F+F'; }
    }
  },
  {
    name: 'instructions',
    encoder: {
      decode: function() { return decodedInstructions; },
      encode: function() { return 'F,d3.5;+,a75;-,a-80'; }
    }
  },
  {
    name: 'iterations',
    encoder: {
      decode: function() { return 6; },
      encode: function() { return '6'; }
    }
  },
  {
    name: 'start',
    encoder: {
      decode: function() { return decodedStart; },
      encode: function() { return 'x347,y358,a70,i6,z100'; }
    }
  }
];

var encoded = '#F/F:F+F-F-F+F/F,d3.5;+,a75;-,a-80/6/x347,y358,a70,i6,z100';
var decoded = {
  axiom: 'F',
  rules: decodedRules,
  instructions: decodedInstructions,
  iterations: 6,
  start: decodedStart
};

test('encodeHash decodeWith', function(t) {
  var actual = encodeHash.decodeWith(encoded, hashSectionsMock);
  var expected = decoded;
  t.deepEqual(actual, expected);
  t.end();
});

test('encodeHash encodeWith', function(t) {
  var actual = encodeHash.encodeWith(decoded, hashSectionsMock);
  var expected = encoded;
  t.equal(actual, expected);
  t.end();
});
