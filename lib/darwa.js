(function(){
  
  var root = this;
  
  var darwa = function(x){
    var mutation = null;
    if (typeof x === 'number'){
      mutation = darwa.float(x);
    }
    if (typeof x === 'string'){
      if (x.substr(0,4) === 'rgb('){
        mutation = darwa.rgb(x);
      } else {
        mutation = darwa.string(x);
      }
    }
    
    
    return mutation;  
  };
  
  darwa.letter = function(letter){
    if (letter === undefined){return null;}
    var vowels = ("aeiouy").split("");
    var consonants = ("bcdfghjklmnpqrstvwxyz").split("");
    if (vowels.indexOf(letter.toLowerCase())>-1){
      letter = darwa.sample(vowels);
    } else if (consonants.indexOf(letter.toLowerCase())>-1){
      letter = darwa.sample(consonants);
    }
    console.log(letter);
    return letter;
  };
  
  darwa.string = function(str){
    if (str === undefined){return null;}
    str = str.split("");
    var index = Math.floor(Math.random()*str.length);
    str[index] = darwa.letter(str[index]);
    for (var i=0;i<Math.floor(str.length/100);i++){
      index = Math.floor(Math.random()*str.length);
      str[index] = darwa.letter(str[index]);
    }
    return str.join("");
  };
  
  darwa.sample = function(arr){
    if (arr === undefined){return null;}
    return arr[Math.floor(Math.random()*arr.length)];
  };
  
  darwa.float = function(x,delta){
    if (delta === undefined){delta = 0.5;}
    if (typeof x !== 'number'){return null;}
    return x - (x*delta) + (Math.random()*(2*x*delta));
  };
  
  darwa.int = function(x,delta){
    if (typeof x !== 'number'){return null;}
    if (delta === undefined){delta = 0.5;}
    if (x === undefined){ x = 50;}
    return Math.floor(darwa.float(x,delta));
  }; 
  
    
  darwa.rgb = function(x, delta){
    if (delta === undefined){delta = 0.9;}
    if ( x === undefined ){ x = "rgb(128,128,128)"; }
    if (typeof x!=="string"){return null;}
    if (!x.match(/^rgb/) ){return null;}
    
    var colors = x.substr(4).split(',');
    if (colors.length !==3 ){return null;}
    for (var i=0;i<colors.length;i++){
      colors[i] = Math.floor( darwa.float( parseInt(colors[i], 10), delta ) );
      colors[i] = Math.max(colors[i], 0);
      colors[i] = Math.min(colors[i], 255);
    }
    return "rgb(" + ( colors.join(",") ) + ")";
  
  };
 
  darwa.hsl = function(x, delta){
    if (delta === undefined){delta = 0.9;}
    if (x === undefined){ x = 'hsl(180,50%,50%)';}

    var colors = x.substr(4).split(',');
    if (colors.length !==3){return null;}
    var hue = Math.floor(darwa.int( parseInt(colors[0], 10), delta));
    hue = Math.max(hue, 0);
    hue = Math.min(hue, 360);

    var saturation = Math.floor(darwa.int(parseInt(colors[1], 10), delta));
    saturation = Math.max(saturation, 0);
    saturation = Math.min(saturation, 100);

    var lightness = Math.floor(darwa.int(parseInt(colors[2], 10), delta));
    lightness = Math.max(lightness, 0);
    lightness = Math.min(lightness, 100);

    return 'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)';
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = darwa;
    }
    exports.darwa = darwa;
  } else {
    root.darwa= darwa;
  }
        
}).call(this);
