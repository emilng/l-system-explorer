// *** UI ***
var ui = {
  initExamples: function(data) {
    var exampleCollection = document.getElementsByClassName('example');
    var i = exampleCollection.length;
    var examples = [];
    while(i--) {
      exampleCollection[i].addEventListener("click", function(event) {
        window.location.hash = event.target.hash;
        data.needsDecode = true;
      });
    }
  }
};

module.exports = ui;