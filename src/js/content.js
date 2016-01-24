var Content = function(html, numberAllowed){
  var c = {};
  c.html = html || '';
  c.numberAllowed = numberAllowed || Infinity;
  c.ancillaryClasses = [];
  return c;
};

var content = [];
  content.push(Content('<h1 class="payload">Title</h1>', 1));
  content.push(Content('<p class="payload">some paragraph text</p>', 4));
  content.push(Content('<h2 class="payload">Section Title</h2>', 4));
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
