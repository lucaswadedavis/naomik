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
  content.push(Content('<p class="payload">Okay, I\'m calling it. As of 2015, we\'ve officially passed the Web Singularity.' +
  'AI driven site design\'s still kind of on the horizon (I\'m looking at you Grid.io)' +
  ' but Kurzweil\'s baby was never actually about AI, it\'s about predictability. </p>' +
  '<p>The question of the Singularity is \'How far into the future can I predict the state of the world\'.' +
  ' The Singularity approaches when that time-distance approaches zero. </p>' +
  '<p>Ask yourself this, web dev: how far into the future is that day for you? A year in the future? A month? A week?</p>' +
  '<p>What if it\'s already passed you? What if the web world is actually already beyond where you predict it will be tomorrow?</p>' +
  '<p>The Web Singularity isn\'t just near - it\'s HERE, and for lots of us it may have already passed.</p>', 4));
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

