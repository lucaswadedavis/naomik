var darwa = require('../../lib/js/darwa.js');

var auto1 = {
  'background-color': darwa.rgb()
};

var auto2 = {
  'background-color': darwa.rgb()
};

var auto3 = {
  'background': 'transparent',
  'border': '0px'
};

var style = {
  '.gridster' : {
    'li': {
      'list-style-type': 'none',
      'background': '#ccc',
      'border': '1px solid #fff'
      },
      
      'li.auto1': auto1,
      'li.auto2': auto2,
      'li.auto3': auto3
    }

};


module.exports = style;
