const axiom = {
  decode(axiomString) {
    return window.unescape(axiomString);
  },
  encode(axiomObj) {
    return window.escape(axiomObj);
  },
};

export default axiom;
