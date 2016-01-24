var _ = require('../../lib/js/underscore.js');
var darwa = require('../../lib/js/darwa.js');

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

var Genome = function(ancestors){
  var genome = {};
  genome.rows = [];
  for (var i=0;i<10;i++){
    var row = _.sample(rows);
    var genomeRow = [];
    var height = Math.ceil(Math.random() * 3);
    for (var j=0;j<row.length;j++){
      genomeRow.push({width: row[j], height: height, autoClass: _.sample(autoClasses)});
    }
    genome.rows.push(genomeRow);
  }
  genome.colors = [];
  for (var i=0;i<3;i++){
    genome.colors.push(darwa.rgb());
  }
  genome.greys = [];
  for (var i=0;i<3;i++){
    var n = Math.floor(Math.random() * 255);
    genome.greys.push('rgb(' + n + ',' + n + ',' + n + ')');
  }

  genome.margin = _.random(20);
  genome.borderWidth = Math.floor(Math.random() * genome.margin);
  return genome;
};

module.exports = Genome;
