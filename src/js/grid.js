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
  var rowIndex = 1;
  for (var i=0;i<genome.rows.length;i++){
    var colIndex = 1;
    for (var j=0;j<genome.rows[i].length;j++){
      d += grid.cell(rowIndex, colIndex, genome.rows[i][j].width, genome.rows[i][j].height, genome.rows[i][j].autoClass);
      colIndex += genome.rows[i][j].width;
    }
    rowIndex += genome.rows[i][0].height;
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
  d += cellPopulator() + '</li>';
  return d;
};

module.exports = grid;

