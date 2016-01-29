var _ = require('../../lib/js/underscore.js');

cellPopulator = require('./content.js');

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
  var content = cellPopulator();
  var d = '<li';
  d += ' class="' + autoClass + ' ' + content.ancillaryClasses.join(' ') + '" ';
  d += ' data-row="' + row + '" data-col="' + col + '" ';
  d += ' data-sizex="' + w + '" data-sizey="' + h + '" >';
  d += '' + content.html + '</li>';
  return d;
};

module.exports = grid;

