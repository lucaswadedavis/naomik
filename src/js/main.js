var grid = require('./grid.js');
var styles = require('./styles.js');
var _ = require('../../lib/js/underscore.js');
var darwa = require('../../lib/js/darwa.js');
var rezi = require('../../lib/js/rezi.js');
var Genome = require('./genome.js');

// takes two arrays, one with mutatants, the other ancestors
var simulatedAnnealing = function(mutants, ancestors){
  var a = ancestors.length;
  var m = (9 * a * a) / ((a * a) + 100);
  var d = 1 + _.random(10);
  if (m > d){
    return _.sample(ancestors);
  } else {
    return _.sample(mutants);
  }
};

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
  console.log('saved! (not really...)');
};

app.createTemplate = function(){
  var genome = Genome();
  $('body').html(templates.grid(genome));
  var gridster = $('.gridster ul').gridster({
    widget_margins: [genome.margin, genome.margin],
      max_cols: 6,
      widget_base_dimensions: [150, 100],
      helper: 'clone',
      resize: {
        enabled: true
      }
  }).data('gridster');  

  rezi(styles(genome));
};

var templates = {
  grid: grid
};

$(document).ready(function(){app();});

module.exports = app;
