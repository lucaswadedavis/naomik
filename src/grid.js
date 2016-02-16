var _ = require('../lib/underscore.js');

var grid = function(genome, content){
  var d = '';
  d += '<div class="gridster-wrapper">';
  d += '<div class="gridster">';
  d += '<ul>';
  var cc = content;
  var i = 0;
  for (var key in cc){
    if (i>=genome.cells.length){break;}
    var c = genome.cells[i];
    var autoClass = _.sample(genome.autoClasses);
    d += grid.cell(cc[key], c.row, c.col, c.size_x, c.size_y, autoClass);
    i++;
  }
  d += '<ul>';
  d += '</div>';
  d += '</div>';
  return d;
};

grid.cell = function(content, row, col, w, h, autoClass){
  row = row || 1;
  col = col || 1;
  w = w || 1;
  h = h || 1;
  var d = '<li';
  d += ' class="' + autoClass + ' ' + content.ancillaryClasses.join(' ') + '" ';
  d += ' data-row="' + row + '" data-col="' + col + '" ';
  d += ' data-sizex="' + w + '" data-sizey="' + h + '" >';
  d += '' + content.html() + '</li>';
  return d;
};

module.exports = grid;

