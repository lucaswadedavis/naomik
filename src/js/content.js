var Content = function(html, numberAllowed){
  var c = {};
  c.html = html || '';
  c.numberAllowed = numberAllowed || Infinity;
  c.ancillaryClasses = [];
  return c;
};

var content = [];
  content.push(Content('<h1 class="payload" contenteditable="true" >Title</h1>', 1));
  content.push(Content('<p class="payload"  contenteditable="true" >some paragraph text</p>', 4));
  content.push(Content('<h2 class="payload" contenteditable="true" >Small Title</h2>', 4));
  /*
  content.push(Content('<p class="payload">Okay, I\'m calling it. As of 2015, we\'ve officially passed the Web Singularity.' +
  'AI driven site design\'s still kind of on the horizon (I\'m looking at you Grid.io)' +
  ' but Kurzweil\'s baby was never actually about AI, it\'s about predictability. </p>'));

  content.push(Content('<p>The question of the Singularity is \'How far into the future can I predict the state of the world\'.' +
  ' The Singularity approaches when that time-distance approaches zero. </p>'));

  content.push(Content('<p>Ask yourself this, web dev: how far into the future is that day for you? A year in the future? A month? A week?</p>'));
  content.push(Content('<p>What if it\'s already passed you? What if the web world is actually already beyond where you predict it will be tomorrow?</p>'));
  content.push(Content('<p>The Web Singularity isn\'t just near - it\'s HERE, and for lots of us it may have already passed.</p>', 4));
  */
  
  //content.push(Content('<h3 class="topbar">Imagine</h3><p class="subtext">A different kind of world.</p>'));
  
  /*
  var imagePaths = [
    'headshot-128.png'
    ];

  for (var i=0;i<imagePaths.length;i++){
    var img = Content('<img src="./images/' + imagePaths[i] + '" />', 1);
    img.ancillaryClasses.push('no-background', 'middled');
    content.push(img);
  }
*/

/*
var quotes = [
  'He who is brave is free.',
  'An unimportant thing done well is still unimportant.',
  'Where there is life, there is hope'
];

for (var i=0;i<quotes.length;i++){
  var q = Content('<p>' + quotes[i] + '</p>');
  q.ancillaryClasses.push('topbar', 'middled');
  console.log(q);
  content.push(Content(quotes[i]));
};
*/

var cellPopulator = function(){
  return content[Math.floor(Math.random() * content.length)];
};

module.exports = cellPopulator;
