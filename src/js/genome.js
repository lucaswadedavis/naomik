var _ = require('../../lib/js/underscore.js');
var darwa = require('../../lib/js/darwa.js');
var simulatedAnnealing = require('./simulated_annealing.js');

var rows = [
  [1,1,1,1,1,1],
  [2,2,2],
  [3,3],
  [2,4],
  [4,2],
  [6],
  [1,4,1],
  [1,5],
  [5,1],
  [4,1,1],
  [1,1,4],
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
  ];

var autoClasses = ['auto0', 'auto1', 'auto2', 'auto3'];

var Genome = function(genePool){
  var genome = {};
  genome.cells = [];
  genome.autoClasses = autoClasses;
  // this needs some love later. genome.rows is only an intermediate step
  genome.rows = [];
  for (var i=0;i<3;i++){
    var row = _.sample(rows);
    var genomeRow = [];
    var height = Math.ceil(Math.random() * 3);
    for (var j=0;j<row.length;j++){
      genomeRow.push({width: row[j], height: height});
    }
    genome.rows.push(genomeRow);
  }

  var rowIndex = 1;
  for (var i=0;i<genome.rows.length;i++){
    var colIndex = 1;
    for (var j=0;j<genome.rows[i].length;j++){
      genome.cells.push({
        row: rowIndex, 
        col: colIndex,
        size_x: genome.rows[i][j].width,
        size_y: genome.rows[i][j].height,
      });
      colIndex += genome.rows[i][j].width;
    }
    rowIndex += genome.rows[i][0].height;
  }
  genome.cells = simulatedAnnealing([genome.cells], _.pluck(genePool, 'cells'));
  
  
  var potentialColors = [];
  for (var i=0;i<3;i++){
    potentialColors.push(darwa.rgb());
  }
  genome.colors = simulatedAnnealing([potentialColors], _.pluck(genePool, 'colors'));
  genome.greys = [];
  for (var i=0;i<3;i++){
    var n = Math.floor(Math.random() * 255);
    genome.greys.push('rgb(' + n + ',' + n + ',' + n + ')');
  }

  genome.margin = _.random(20);
  genome.borderWidth = Math.floor(Math.random() * genome.margin);
  genome.borderColor = Math.random() > 0.5 ? '#fff' : '#000';
  return genome;
};

module.exports = Genome;
