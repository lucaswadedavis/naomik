var grid = require('./grid.js');
var styles = require('./styles.js');
var _ = require('../../lib/js/underscore.js');
var darwa = require('../../lib/js/darwa.js');
var rezi = require('../../lib/js/rezi.js');

var rows = [
  [1,1,1,1,1,1],
  [2,2,2],
  [3,3],
  [2,4],
  [4,2]
  ];

var autoClasses = ['auto1', 'auto2', 'auto3'];

  var genome = {};
  genome.rows = [];
for (var i=0;i<10;i++){
  var row = _.sample(rows);
  var genomeRow = [];
  for (var j=0;j<row.length;j++){
    genomeRow.push({width: row[j], autoClass: _.sample(autoClasses)});
  }
  genome.rows.push(genomeRow);
}
genome.colors = [];
for (var i=0;i<3;i++){
  genome.colors.push(darwa.rgb());
}

var app = function(){
  $('body').html(templates.grid(genome));
  var gridster = $('.gridster ul').gridster({
    widget_margins: [5, 5],
      widget_base_dimensions: [150, 100],
      helper: 'clone',
      resize: {
        enabled: true
      }
  }).data('gridster');  

  rezi(styles);
};



var templates = {
  grid: grid
};

$(document).ready(function(){app();});

module.exports = app;
