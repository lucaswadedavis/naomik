var _ = require('../../lib/js/underscore.js');

var Content = function(html, numberAllowed){
  var c = {};
  c.html = html || '';
  c.numberAllowed = numberAllowed || Infinity;
  c.ancillaryClasses = [];
  return c;
};

var cellPopulator = function(){
  var content = [];
  content.push(Content('<h1 class="payload">Title</h1>', 1));
  content.push(Content('<p class="payload">some paragraph text</p>', 4));
  content.push(Content('<h2 class="payload">Section Title</h2>', 4));
  content.push(Content('<h3 class="topbar">Imagine</h3><p class="subtext">A different kind of world.</p>'));

  var imagePaths = [
    'headshot-128.png'
    ];
/*
  for (var i=0;i<imagePaths.length;i++){
    var img = Content('<img src="./images/' + imagePaths[i] + '" />', 1);
    img.ancillaryClasses.push('no-background', 'middled');
    content.push(img);
  }
*/
  return content[Math.floor(Math.random() * content.length)];
};

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
  console.log(content);
  var d = '<li';
  d += ' class="' + autoClass + ' ' + content.ancillaryClasses.join(' ') + '" ';
  d += ' data-row="' + row + '" data-col="' + col + '" ';
  d += ' data-sizex="' + w + '" data-sizey="' + h + '" >';
  d += '' + content.html + '</li>';
  return d;
};

module.exports = grid;

