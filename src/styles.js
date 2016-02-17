var darwa = require('../lib/darwa.js');
var _ = require('../lib/underscore.js');

var grey='#cccccc';
var margin=(_.random(5,10))+"px";

var css={
  "h2":{
    "margin-bottom":"0",
    "padding-bottom":"0"
  },
  "#navigation":{
    "position":"fixed",
    "height":"100%",
    "top":"0px",
    "left":"0px",
    "background":"#000",
    "opacity":"0.7",
    "overflow":"hidden"
  },
  "#navigation span":{
    "padding":"15px",
    "display":"block",
    "text-align":"center",
    "background":"#fff",
    "border":"1px solid #000",
    "cursor":"pointer",
    "font-size":"20px",
    "font-weight":"bold",
    "font-family":"courier"
  },
  "#navigation span.ancillary-text":{
    "display":"inline",
    "display":"none",
    "border":"0",
    "padding":"0",
    "margin":"0"
  },
  "table td":{
    "vertical-align":"top"
  },
  "td.col-2":{
    "width":"50%"
  },
  "table":{
    "width":"100%",
    "border-spacing":margin,
    "border-collapse":"separate"
  },
  "#contact-information":{
    "padding-top":margin,
    "padding-bottom":margin,
    "font-size":(0.1*_.random(7,9))+"em"
  },
  "#name":{
    "font-size":(0.1*_.random(20,50))+"em"
  },
  ".section-title":{
    "font-size":(0.1*_.random(8,20))+"em"
  },
  ".section":{
  },
  ".screen-wrapper":{
    "background":"#fff"
  },
  ".position-period":{
    "float":"right"
  },
  ".position-metadata":{
  },
  ".position":{
    "margin-top":margin,
    "margin-bottom":margin,
  },
  ".project":{
    "margin-top":margin,
    "margin-bottom":margin,
  },
  ".project-title":{
  },
  ".project-notes":{
  },
  ".section":{
    "margin-bottom":margin
  },
  ".collection":{
    "margin-top":margin,
    "margin-bottom":margin
  },
  "#personal-note":{
    "margin-top":margin,
    "margin-bottom":margin,
  },
  "input[type=text]":{
    "width":"100%"
  },
  "#save-data":{
    "cursor":"pointer",
    "display":"block",
    "margin-top":"20px",
    "background":"#333",
    "color":"#fff"
  },
  ".user-position-input-area, .user-project-input-area":{
    "margin-bottom":"20px"
  }
};
/*j  
  davis.maybe(app.m.genome[17],function(){
  css["#name"]["color"]="#fff";
  css["#name"]["background"]=grey;
  css["#name"]["text-align"]="center";
  css["#name"]["padding"]=(_.random(20,50) )+"px";
  });

  davis.maybe(app.m.genome[18],function(){
  css[".position-metadata"]["font-weight"]="bold";
  css[".project-title"]["font-weight"]="bold";
  css[".project-notes"]["font-weight"]="bold";
  },function(){
  css[".position-metadata"]["color"]=grey;
  css[".project-title"]["color"]=grey;
  css[".project-notes"]["color"]=grey;
  });

  davis.maybe(app.m.genome[19],function(){
  css[".section"]["border-bottom"]=(_.random(0,5)+"px solid "+grey);
  },function(){
  css[".section-title"]["color"]="#fff";
  css[".section-title"]["background"]=grey;
  css[".section-title"]["padding"]=(_.random(5,10))+"px";
  });
  */


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

  var siteWrapper = css;

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
