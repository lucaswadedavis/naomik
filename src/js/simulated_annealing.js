var _ = require('../../lib/js/underscore.js');
var darwa = require('../../lib/js/darwa.js');

var simulatedAnnealing = function(mutants, ancestors){
  // takes two arrays, one with mutatants, the other ancestors
  var a = ancestors.length;
  var m = (9 * a * a) / ((a * a) + 100);
  var d = 1 + _.random(10);
  if (m > d){
    return _.sample(ancestors);
  } else {
    return _.sample(mutants);
  }
};

/*
var simulatedAnnealing = function(ancestor, ancestorCount){
  // takes two arrays, one with mutatants, the other ancestors
  var a = ancestorCount;
  var m = (9 * a * a) / ((a * a) + 100);
  var d = 1 + _.random(10);
  if (m > d){
    // don't mutate
    return ancestor
  } else {
    return darwa(ancestor, delta);
  }
};
*/

module.exports = simulatedAnnealing;
