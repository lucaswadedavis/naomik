var grid = require('./grid.js');
var styles = require('./styles.js');
var _ = require('../../lib/js/underscore.js');
var rezi = require('../../lib/js/rezi.js');
var Genome = require('./genome.js');

var app = function(){
    app.createTemplate();
    app.listeners();
  };

app.listeners = function(){
  var KEYS = {L: 108, N: 110};
  $('body').keypress(function(e){
    if (e.which === KEYS.L){
      app.saveCurrentModel()
    } else if (e.which === KEYS.N) {
      app.createTemplate();
    }
  });
};

app.saveCurrentModel = function(){
  console.log('saved');
  app.genePool.push(app.currentModel);
};

app.currentModel;
app.genePool = [];
app.carryingCapacity = 100;

app.createTemplate = function(){
  if (app.genePool > app.carryingCapacity) {
    app.genePool.splice(0, 1);
  }
  var genome = Genome(app.genePool);
  app.currentModel = genome;
  $('body').html(templates.grid(genome));
  var gridster = $('.gridster ul').gridster({
    widget_margins: [genome.margin, genome.margin],
      max_cols: 6,
      draggable: {
        stop: function(e, ui, $widget){
          console.log('drag stop');
          console.log(this.serialize());
          app.currentModel.cells = this.serialize();
        }
      },
      resize: {
        enabled: true,
        stop: function(e, ui, $widget){
          console.log('resize stop');
          console.log(this.serialize());
          app.currentModel.cells = this.serialize();
        }
      },
      widget_base_dimensions: [150, 100],
      helper: 'clone'
  }).data('gridster');  
  
  rezi(styles(genome));
};

var templates = {
  grid: grid
};

$(document).ready(function(){app();});

module.exports = app;
