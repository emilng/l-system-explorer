var axiom = {
  decode: function(axiomString) {
    return window.unescape(axiomString);
  },
  encode: function(axiom) {
    return window.escape(axiom);
  }
};

module.exports = axiom;
