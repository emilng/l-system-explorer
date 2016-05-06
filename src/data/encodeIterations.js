const iterations = {
  decode(iterationsString) {
    return parseInt(iterationsString, 10);
  },
  encode(iterationsObj) {
    return (iterationsObj).toString(10);
  },
};

module.exports = iterations;
