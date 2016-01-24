var _ = require('../../lib/js/underscore.js');

var cellPopulator = function(){
  var content = [
    "<h1>Section Title</h1>",
    "<p>some paragraph text</p>",
    "<h2>A Header</h2>"
    ];

  return content[Math.floor(Math.random() * content.length)];
};

var grid = function(genome){
  var d = '';
  d += '<div class="gridster-wrapper">';
  d += '<div class="gridster">';
  d += '<ul>';
  for (var i=0;i<genome.cells.length;i++){
    var c = genome.cells[i];
    var autoClass = _.sample(genome.autoClasses);
    d += grid.cell(c.row, c.col, c.size_x, c.size_y, autoClass);
  }
  d += '<ul>';
  d += '</div>';
  d += '</div>';
  return d;
};

grid.cell = function(row, col, w, h, autoClass){
  row = row || 1;
  col = col || 1;
  w = w || 1;
  h = h || 1;
  var d = '<li';
  d += ' class="' + autoClass + '" ';
  d += ' data-row="' + row + '" data-col="' + col + '" ';
  d += ' data-sizex="' + w + '" data-sizey="' + h + '" >';
  d += '<div class="payload">' + cellPopulator() + '</div></li>';
  return d;
};

module.exports = grid;

