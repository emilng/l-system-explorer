var draw = function(guides) {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.fillStyle = 'black';
  var rowHeight = 1/guides.length * canvas.height;

  for(var row = 0; row < guides.length; row++) {
    var guide = guides[row];
    for(var col = 0; col < guide.length; col++) {
      var c = guide[col];
      var colWidth = 1/(guide.length) * canvas.width;
      switch(c) {
        case 'A': //draw forward
          var a = row/guides.length;
          colors = [0,0,0].join(',');
          context.fillStyle = 'rgb(' + colors + ')';
          context.strokeStyle = 'red';
          var x = col * colWidth;
        context.fillRect(col * colWidth, row * rowHeight, colWidth, rowHeight);
        break;
        case 'B': //move forward
        break;
        default:
          break;
      }
    }
  }
}

var grammar = {
  'A': 'ABA',
  'B': 'BBB'
};

var result = rewrite(grammar, 'A', 7);

draw(result);

console.table(result);
