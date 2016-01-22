var app = function(){
 $('body').html(templates.grid());
 $(".gridster ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [140, 140],
        helper: 'clone',
        resize: {
            enabled: true
          }
    });  
};

var templates = {};

templates.grid = function(n){
  n = n || 10;
  var d = '';
  d += '<div class="gridster">';
  d += '<ul>';
  for (var i=0;i<n;i++){
    d += templates.grid.cell();
  }
  d += '<ul>';
  d += '</div>';
  return d;
};

templates.grid.cell = function(row, col, w, h){
  row = row || 1;
  col = col || 1;
  w = w || 1;
  h = h || 1;
  var d = '<li';
  d += ' data-row="' + row + '" data-col="' + col + '" ';
  d += ' data-sizex="' + w + '" data-sizey="' + h + '" >';
  d += Math.round( 1000 * Math.random()) + '</li>';
  return d;
};

$(document).ready(function(){app();});

module.exports = app;
