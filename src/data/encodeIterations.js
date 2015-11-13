var iterations = {
  decode: function(iterationsString) {
    return parseInt(iterationsString, 10);
  },
  encode: function(iterations) {
    return (iterations).toString(10);
  }
};

module.exports = iterations;
