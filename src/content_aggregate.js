var _ = require('../lib/underscore.js');

uuid = function(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

var Content = function(text, tag){
  var c = {};
  c.id = uuid();
  c.tag = tag || 'h2';
  c.text = text || '';
  c.html = function(){
    html = '<' + this.tag + ' ';
    html += 'class="' + 'payload' + '" ';
    html += 'id="' + this.id + '" ';
    html += ' >' + this.text;
    html += '</' + this.tag + '>';

    return html;
  };
  c.ancillaryClasses = [];
  return c;
};

var ContentAggregate = function(){
  var storage = {};

  return {
    get: function(id){
      return storage[id];
    },
      add: function(text, tag, numberToAdd){
        numberToAdd = numberToAdd || 3;
        for (var i=0;i<numberToAdd;i++){
          var c = Content(text, tag);
          var id = c.id;
          storage[id] = c;
        }
        return storage[id];
      },
      all: function(){
        return storage;
      }
  };
};

module.exports = ContentAggregate;
