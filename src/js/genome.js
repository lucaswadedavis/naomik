var _ = require('../../lib/js/underscore.js');
var darwa = require('../../lib/js/darwa.js');
var simulatedAnnealing = require('./simulated_annealing.js');

var mutateColors = function(genomeColors, genePoolSize){
  // as the genepool grows larger, turn the heat down
  for (var i=0;i<genomeColors.length;i++){
    genomeColors[i] = darwa.hsl(genomeColors[i], 0.2);
  };
};

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

var autoClasses = ['auto0', 'auto1', 'auto1', 'auto1', 'auto2', 'auto2', 'auto3'];

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

  genome.hue1 = simulatedAnnealing([_.random(360)], _.pluck(genePool, 'hue1'));
  genome.hue2 =  simulatedAnnealing([_.random(360)], _.pluck(genePool, 'hue2'));
  genome.saturation1 = simulatedAnnealing([_.random(0,100)], _.pluck(genePool, 'saturation1'));
  genome.saturation2 = simulatedAnnealing([_.random(0,100)], _.pluck(genePool, 'saturation2'));
  genome.lightness1 =  simulatedAnnealing([_.random(100)], _.pluck(genePool, 'lightness1'));
  genome.lightness2 =  simulatedAnnealing([_.random(100)], _.pluck(genePool, 'lightness2'));

  genome.colors = [];
  genome.colors.push('hsl(' + genome.hue1 + ',' + genome.saturation1 + '%,' + genome.lightness1 + '%)');
  genome.colors.push('hsl(' + genome.hue2 + ',' + genome.saturation2 + '%,' + genome.lightness2 + '%)');

  genome.colors = simulatedAnnealing([genome.colors], _.pluck(genePool, 'colors'));

  genome.greys = [];
  for (var i=0;i<3;i++){
    var n = Math.floor(Math.random() * 255);
    genome.greys.push('rgb(' + n + ',' + n + ',' + n + ')');
  }

  genome.margin = simulatedAnnealing([_.random(20)], _.pluck(genePool, 'margin'));
  genome.borderWidth = simulatedAnnealing([Math.floor(Math.random() * genome.margin)], _.pluck(genePool, 'borderWidth'));
  genome.borderColor = simulatedAnnealing([Math.random() > 0.5 ? '#fff' : '#000'], _.pluck(genePool, 'borderColor'));
  
  genome.backgroundColors = [];

  genome.liklihoodOfColoredBackground = simulatedAnnealing([Math.random()], _.pluck(genePool, 'liklihoodOfColoredBackground'));

  if (Math.random() > genome.liklihoodOfColoredBackground){
    genome.backgroundColors = genome.backgroundColors.concat(genome.colors);
    genome.pageBackground = genome.greys[0];
  } else {
    genome.backgroundColors = genome.backgroundColors.concat(genome.greys);
    genome.pageBackground = genome.colors[0];
  }

  mutateColors(genome.colors, genePool.length);
  
  return genome;
};

module.exports = Genome;
