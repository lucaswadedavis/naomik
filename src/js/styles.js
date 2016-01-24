var darwa = require('../../lib/js/darwa.js');

var style = function(genome){
  var auto1 = {
    'background-color': genome.greys[0],
    'color': '#fff'
  };

  var auto2 = {
    'background-color': genome.colors[1],
    'color': '#fff'
  };

  var auto3 = {
    'background-color': genome.colors[2],
    'color': '#fff'
  };

  var auto0 = {
    'background': 'transparent',
    'border': '0px'
  };

  return {
    '.payload': {
      'margin': '5px'
    },
    
    '.gridster' : {
      'li': {
        'list-style-type': 'none',
          'background': '#ccc',
          'border': genome.borderWidth + 'px solid ' + genome.borderColor
      },
      'h1, h2': {
        'text-align': 'center'
      },
        'margin': '0 auto',      
        'li.auto0': auto0,
        'li.auto1': auto1,
        'li.auto2': auto2,
        'li.auto3': auto3
    }

  };
};

module.exports = style;
