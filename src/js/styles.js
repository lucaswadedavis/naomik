var darwa = require('../../lib/js/darwa.js');

var style = function(genome){
  var auto1 = {
    'background-color': '#fff',
    'color': '#000'
  };

  var auto2 = {
    'background-color': genome.backgroundColors[1],
    'color': '#fff'
  };

  var auto3 = {
    'background-color': genome.backgroundColors[2],
    'color': '#fff'
  };

  var auto0 = {
    'background': 'transparent',
    'border': '0px'
  };

  var topbar = {
    'background': '#fff',
    'color': genome.colors[1],
    'text-align': 'center',
    'margin': '0',
    'padding': '20px'
  };

  var subtext = {
    'text-align': 'center'
  };

  var body = {
    'background-color': genome.pageBackground
  };

  var siteWrapper = {
    'border': '0',
    'margin': '0',
    'padding': '0'
  };

  var controls = {
    'position': 'fixed',
    'z-index': '2',
    'left': window.innerWidth - 200 + 'px',
    'top': window.innerHeight - 50 + 'px',
    '#love': {
      'background-color': '#3f7',
      'color': '#000',
      'cursor': 'pointer'
    },
    '#next': {
      'background-color': '#f37',
      'color': '#fff',
      'cursor': 'pointer'
    },
    '#see-all-designs': {
      'background-color': '#333',
      'color': '#fff',
      'cursor': 'pointer'
    }
  };

  var savedDesigns = {
    'opacity': '0',
    'z-index': '-1',
    'position': 'fixed',
    'top': '30px',
    'height': window.innerHeight - 100 + 'px',
    'margin': '20px',
    'background': '#333',
    'border': '1px solid #fff',
    'overflow': 'scroll'
  };

  return {   
    'body': body,
      '.site-wrapper': siteWrapper,
      '.saved-designs': savedDesigns,

      '.payload': {
        'margin': '5px'
      },

      '.topbar': topbar,  

      '.subtext': subtext,

      '.controls': controls,

      '.gridster' : {
        'li': {
          'list-style-type': 'none',
          'background': '#ccc',
          'border': genome.borderWidth + 'px solid ' + genome.borderColor,

        },
        'h1, h2, h3': {
          'text-align': 'center'
        },
        'margin': '0 auto',      
        'li.auto0': auto0,
        'li.auto1': auto1,
        'li.auto2': auto2,
        'li.auto3': auto3,

        'li.no-background': {
          'background-color': 'transparent',
          'border': '0'
        }

      },
      '.middled': {
        'text-align': 'center',
        'vertical-align': 'middle'
      }

  };
};

module.exports = style;
