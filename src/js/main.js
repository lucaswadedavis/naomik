var grid = require('./grid.js');
var styles = require('./styles.js');
var _ = require('../../lib/js/underscore.js');
var rezi = require('../../lib/js/rezi.js');
var Genome = require('./genome.js');
var cellsContent = require('./cellsContent.js');

/*
var makeEditable = function(className){ 
  var pennables = document.getElementsByClassName(className || 'pennable');
  for (var i=0;i<pennables.length;i++){
    new Pen(pennables[i]);
  }
};
*/

var makeEditable = function(className){
// Sample: Massive Inline Editing
 
  for (var key in app.content) {
    var editor = CKEDITOR.inline(key);
    editor.on('change', function(event){
      console.log(event.editor.getData());
      console.log(event.editor.container.$.id);
      app.content[event.editor.container.$.id].text = event.editor.getData();
    });
  }

  // This code is generally not necessary, but it is here to demonstrate
  // how to customize specific editor instances on the fly. This fits this
  // demo well because some editable elements (like headers) may
  // require a smaller number of features.

  // The "instanceCreated" event is fired for every editor instance created.

  CKEDITOR.on( 'instanceCreated', function ( event ) {
    var editor = event.editor,
        element = editor.element;

    // Customize editors for headers and tag list.
    // These editors do not need features like smileys, templates, iframes etc.
    if ( element.is( 'h1', 'h2', 'h3' ) || element.getAttribute( 'id' ) == 'taglist' ) {
      // Customize the editor configuration on "configLoaded" event,
      // which is fired after the configuration file loading and
      // execution. This makes it possible to change the
      // configuration before the editor initialization takes place.
      editor.on( 'configLoaded', function () {

        // Remove redundant plugins to make the editor simpler.
        editor.config.removePlugins = 'colorbutton,find,flash,font,' +
            'forms,iframe,image,newpage,removeformat,' +
            'smiley,specialchar,stylescombo,templates';

        // Rearrange the toolbar layout.
        editor.config.toolbarGroups = [
          { name: 'editing', groups: [ 'basicstyles', 'links' ] },
          { name: 'undo' },
          { name: 'clipboard', groups: [ 'selection', 'clipboard' ] },
          { name: 'about' }
        ];
      } );
    }
  } );

  

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
  app.genePool.push(app.currentModel);
};

app.currentModel;
app.genePool = [];
app.carryingCapacity = 10000;
app.content = cellsContent.all();

app.createTemplate = function(){
  if (app.genePool > app.carryingCapacity) {
    app.genePool.splice(0, 1);
  }
  var genome = Genome(app.genePool);
  app.currentModel = genome;
  $('body').html(templates.grid(genome, app.content));
  var gridster = $('.gridster ul').gridster({
    widget_margins: [genome.margin, genome.margin],
      max_cols: 6,
      draggable: {
        stop: function(e, ui, $widget){
          app.currentModel.cells = this.serialize();
        }
      },
      resize: {
        enabled: true,
        stop: function(e, ui, $widget){
          app.currentModel.cells = this.serialize();
        }
      },
      widget_base_dimensions: [150, 100],
      helper: 'clone'
  }).data('gridster');  

  //CKEDITOR.inlineAll();

  rezi(styles(genome));
  makeEditable();
};

var templates = {
  grid: grid
};

$(document).ready(function(){app();});

window.app = app;

module.exports = app;
