var ContentAggregate = require('./content_aggregate.js');
var _ = require('../lib/underscore.js');

var app={};

////////////////////////////////////////////

app.m={};
app.c={};
app.v={};
app.t={};

////////////////////////////////////////////

app.m.fontSize=1;
app.m.showPhoto = false;
app.m.genome = [];
app.m.genePool = [];
app.m.name="Luke Davis";
app.m.phone="(415) 610-2391";
app.m.website="http://lucaswadedavis.com";
app.m.email="lucaswadedavis@gmail.com";
app.m.twitter="@lukedavis";
app.m.linkedin="http://linkedin.com/in/lucaswadedavis";
app.m.github="http://github.com/lucaswadedavis";

app.m.coverLetters = [
  {
    text:"Here's some cover letter text",
    organization:"LukeX"
  }
];

app.m.projects=[
  {
    title:"Holograf",
    exposition:"Displays Javascript programs in 3D for education and visual debugging",
    role: "Product Owner, 3D expert",
    notes: "(THREE JS, Esprima and Abstract Syntax Trees)"
  },
  {
    title:"Counterspell",
    exposition:"Counters cyberbullying by replacing 'curses' (abusive text) with 'counterspells' on any webpage the user visits",
    role:"Creator",
    notes:"(Chrome Extension, Regular Expressions)"
  },
  {
    title:"Lexponential",
    exposition:"Accelerates foreign language vocabulary acquisition by using Zipf’s Law and the Google Translate API",
    role:"Creator",
    notes:"(Backbone, Parse, Stripe)"
  },
  {
    title:"ResumeAI",
    exposition:"AI resume designer (crafted the resume you're reading now, actually)",
    role:"Creator",
    notes:"(Evolutionary Algorithm, CSS3, Offline-First)"
  },
  {
    title:"Faux Poe",
    notes:"(Parse, Express, Mandrill, Coinbase API)",
    exposition:"Procedurally generates imitation Edgar Allan Poe verse and sells it for Bitcoin",
    role:"Creator"
  },
  {
    title:"Coloroordinates",
    exposition:"Displays the colors of an uploaded image by projecting the  red, green, and blue color values of each pixel in the image along the x, y, and z axes in 3-space",
    role:"Creator",
    notes:"(THREE JS, HTML5 Canvas)"
  },
  {
    title:"Iconaria",
    exposition:"Machine-generated art: logos for open source projects",
    role:"Creator",
    notes:"(HTML5 Canvas, Procedural Generation)"
  }
];

app.m.positions=[
  { 
    title:"Software Engineer",
    exposition:"Built software used to command the largest fleet of satellites ever flown, and understand the data coming back down to Earth. Special focus on data visualization using D3, C3, Plotly, front-end work with React, and back-end work with Python, Django, Flask, Celery, ZMQ, and AWS.",
    period:"2015-2016",
    organization:"Planet Labs: Mission Control"
  },
  {
    title:"Shepherd",
    exposition:"Mentored 100+ students in an advanced Software Engineering Immersive course over 3 months, and created during the time of the residency, a simple yet novel FRP framework for SPAs, a CSS compiler, a mutation engine for evolutionary algorithms, and a Chrome extension for passive cyberbullying defense",
    period:"2015",
    organization:"Hack Reactor: Instruction Team"
  },
  {
    title:"Software Engineer",
    exposition:"Built over 2 dozen user-facing applications used daily by operators pursuing national level military objectives, saving over 10,000 man-hours of work in the first year alone",
    period:"2013-2014",
    organization:"NSA"},
  {
    title:"Mission Manager",
    exposition:"Managed a team of highly qualified personnel from all branches of the armed service, civilians, and contractors in pursuit of national level military objectives",
    period:"2011-2013",
    organization:"NSA"},
  {
    title:"Cryptologic Technician, Interpretive",
    exposition:"Graduated from the intensive two year Modern Standard Arabic training program at the Defense Language Institute and went on to become an Arabic translator at the National Security Agency during the last days of the  American drawdown in Iraq and the beginning of the Arab Spring",
    period:"2009-2011",
    organization:"USN"}
];

app.m.personalNote="Vegetarian, Lover of Dinosaurs and Space-Things, Southerner, Darwinian";

app.m.technologies={
  strengths:["Genetic Algorithms","Javascript","Data Visualization","APIs","REST","React","D3","jQuery","HTML5 Canvas","Python","Django","Linux","VIM","Git"],
  experience:["AWS","Flask","ZMQ","SQL","Node","Angular","TDD","CI","Express","Backbone"]
};


////////////////////////////////////////////

app.c.init=function(){
  var appState=simpleStorage.get('appState');
  if (!appState){
    simpleStorage.set('appState',app.m);
  } else { 
    _.extend(app.m,appState);
  }
  
  if (!app.m.genePool){
    app.m.genePool = [];
  }
  
  for (var i=0, genome = [];i<100;genome.push(0.5), i++){}
  
  if (app.m.genome){
    if (app.m.genome.length<1){ app.m.genome = genome;}
  } else {
    app.m.genome = genome;
  }

  
  
  app.v.init();
  app.v.listeners();
};

app.c.eraseData=function(){
  simpleStorage.set('appState',undefined);
};

app.c.fontIncrement=function(){
  app.m.fontSize+=0.02;
  app.v.fontMod();
};

app.c.fontDecrement=function(){
  app.m.fontSize=Math.max(app.m.fontSize-0.02,0.1);
  app.v.fontMod();
};

////////////////////////////////////////////

app.v.init=function(){
  zi.css();
  
  var d="<div class='screen-wrapper'></div>";
  d+="<div id='navigation'>";
    d+="<span id='toggle-menu'>Menu</span>";
    d+="<span id='again'>New <span class='ancillary-text'>Resume Layout!</span></span>";
    d+="<span id='increment'>+</span></span><span id='decrement'>-</span>";
    d+="<span id='change-data'><span class='ancillary-text'>Adjust Data</span></span>";
    d+="<span id='erase-data'><span class='ancillary-text'>Erase Saved Data</span></span>";
  d+="</div>";
  $("body").html(d);
  $(".screen-wrapper").html(app.t.resume() );
 
  app.v.inputView();
};

app.v.listeners=function(){
  var toggled = false; 

  $("body").on("click","#toggle-menu",function(){
    if (toggled){
      toggled = !toggled;
      $(".ancillary-text").hide();
    } else {
      toggled = !toggled;
      $(".ancillary-text").fadeIn("fast");
    }
  });

  $("body").on("click","#add-another-project",function(){
    $(app.t.priorProjectInput() ).insertAfter(".user-project-input-area:last");
  });

  $("body").on("click","#add-another-position",function(){
    $(app.t.priorPositionInput() ).insertAfter(".user-position-input-area:last");
  });

  $("body").on("click","#add-another-cover-letter",function(){
    $(app.t.coverLetterInput() ).insertAfter(".cover-letter-input-area:last");
  });
    
  $("body").on("click","#erase-data",function(){
    app.c.eraseData();
  });

  $("body").on("click","#increment",function(){
    app.c.fontIncrement();
  });
  $("body").on("click","#decrement",function(){
    app.c.fontDecrement();
  });
  $("body").on("click","#again",function(){
    for (var i=0, genome=[]; i<100 ; genome.push(0.5), i++){}
    app.m.genome = davis.darwin([genome],app.m.genePool);
    for (var i=0;i<app.m.genome.length;i++){
      app.m.genome[i] = Math.min(1,Math.max(0,darwa.float(app.m.genome[i],0.3) ) );
    }
    zi.css();
    $(".screen-wrapper").html(app.t.resume() );
  });
  $("body").on("click","#change-data",function(){
    app.v.inputView();
  });
  
  $("body").keypress(function(event) {
		if (event.which == 108) {
		  //console.log("LOVE!");
		  if (app.m.genome.length>0){
		    app.m.genePool.push(app.m.genome);
		  }
		}
		
    simpleStorage.set('appState',app.m);
  });
  
  
  $("body").on("click","#save-data",function(){
    app.m.name = $("#user-name").val();
    app.m.phone = $("#user-phone").val();
    app.m.email = $("#user-email").val();
    app.m.website = $("#user-website").val();
    app.m.twitter = $("#user-twitter").val();
    app.m.linked = $("#user-linkedin").val();
    app.m.github = $("#user-github").val();
    app.m.personalNote = $("#user-personal-note").val();
    app.m.technologies.strengths = [];
    app.m.technologies.strengths.push( $("#user-strengths").val() );
    app.m.technologies.experience = [];
    app.m.technologies.experience.push( $("#user-experience").val() );
    
    app.m.projects=[];
    $(".user-project-input-area").each(function(index,instance){
      var project = {};
      
      project.title = _.escape($(this).children(".user-project-title").val() );
      project.role = _.escape($(this).children(".user-project-role").val() );
      project.notes = _.escape($(this).children(".user-project-notes").val() );
      project.exposition = _.escape($(this).children(".user-project-exposition").val() );
      
      if (!project.title && !project.role && !project.notes && !project.exposition){
        
      } else {
        app.m.projects.push(project);
      }
    });

    app.m.positions=[];
    $(".user-position-input-area").each(function(index,instance){
      var position = {};
      
      position.title = _.escape($(this).children(".user-position-title").val() );
      position.organization = _.escape($(this).children(".user-position-organization").val() );
      position.period = _.escape($(this).children(".user-position-period").val() );
      position.exposition = _.escape($(this).children(".user-position-exposition").val() );
            
      if (!position.title && !position.organization && !position.period && !position.exposition){
      } else {
        app.m.positions.push(position);
      }
    });


    app.m.coverLetters = [];
    $(".cover-letter-input-area").each(function(index,instance){
      var coverLetter = {};
      
      coverLetter.text = _.escape($(this).children(".cover-letter-text").val() );

      if (coverLetter.text){ app.m.coverLetters.push(coverLetter) };

    });

    simpleStorage.set('appState',app.m);
  });
};

app.v.fontMod=function(){
  var d="body{font-size:"+app.m.fontSize+"em;}";
  if ($("head style#font-mod").length<1){
    $("head").append("<style type='text/css' id='font-mod'></style>");
  }
  $("head style#font-mod").html(d);
};

app.v.inputView=function(){
  $(".screen-wrapper").html(app.t.form() );
    $("#user-name").val(app.m.name);
    $("#user-phone").val(app.m.phone);
    $("#user-email").val(app.m.email);
    $("#user-website").val(app.m.website);
    $("#user-twitter").val(app.m.twitter);
    $("#user-linkedin").val(app.m.linkedin);
    $("#user-github").val(app.m.github);
    $("#user-personal-note").val(app.m.personalNote);
    $("#user-strengths").val(app.m.technologies.strengths.join(", "));
    $("#user-experience").val(app.m.technologies.experience.join(", "));

    $(".user-project-input-area").each(function(index,instance){
      var project = app.m.projects[index];
      
      $(this).children(".user-project-title").val(_.unescape(project.title));
      $(this).children(".user-project-role").val(_.unescape(project.role));
      $(this).children(".user-project-notes").val(_.unescape(project.notes));
      $(this).children(".user-project-exposition").val(_.unescape(project.exposition));
    });

    $(".user-position-input-area").each(function(index,instance){
      var position = app.m.positions[index];
      
      $(this).children(".user-position-title").val(_.unescape(position.title));
      $(this).children(".user-position-organization").val(_.unescape(position.organization));
      $(this).children(".user-position-period").val(_.unescape(position.period));
      $(this).children(".user-position-exposition").val(_.unescape(position.exposition));
    });

    $(".cover-letter-input-area").each(function(index,instance){
      var coverLetter = app.m.coverLetters[index];

      $(this).children(".cover-letter-text").val(_.unescape(coverLetter.text) );
    });

};

////////////////////////////////////////////


app.t.resume=function(){
  var d="";
    d+=app.t.layouts();
  return d;
};

app.t.layouts=function(){
  //return app.t.hybrid();
  var layout = app.t.sequential();
  davis.maybe(app.m.genome[12],function(){
    layout = app.t.sideBySide();
    console.log("sidebyside");
  });
  davis.maybe(app.m.genome[13],function(){
    layout = app.t.hybrid();
    console.log("hybrid");
  })
  return layout;
};

app.t.hybrid=function(){
  var d="";
  davis.maybe(app.m.genome[14],function(){
    d+="<table>";
    d+="<tr>";
      d+="<td colspan=2>";
        d+=app.t.name();
      d+="</td>";
    d+="</tr>";
    d+="<tr>";
      d+="<td>";
        d+=app.t.personalNote();
        d+=app.t.contactInformation();
      d+="</td>";
      d+="<td>";
        d+=app.t.technologies();
        davis.maybe(app.m.genome[20],function(){
          d+=app.t.positions();
          d+=app.t.projects();
        }, function(){
          d+=app.t.projects();
          d+=app.t.positions();
        });
      d+="</td>";
    d+="</tr>";
    d+="</table>";
  },function(){
    d+="<table>";
    d+="<tr>";
      d+="<td>";
        d+=app.t.name();
       // d+=app.t.photo();
      d+="</td>";
      d+="<td>";
        d+=app.t.contactInformation();
      d+="</td>";
    d+="</tr>";
    d+="<tr>";
      d+="<td colspan=2>";
        d+=app.t.technologies();
      d+="</td>";
    d+="</tr>";
    d+="<tr>";
    davis.maybe(app.m.genome[20],function(){
      d+="<td class='col-2'>";
        d+=app.t.projects();
      d+="</td><td>";
        d+=app.t.positions();
      d+="</td>";
    }, function(){
      d+="<td class='col-2'>";
        d+=app.t.positions();
      d+="</td><td>";
        d+=app.t.projects();
      d+="</td>";
    });
    d+="</tr>";
    d+="<tr>";
      d+="<td colspan=2>";
        d+=app.t.personalNote();
      d+="</td>";
    d+="</tr>";
    d+="</table>";
  });
  return d;
};

app.t.sequential=function(){
  var d="";
  davis.maybe(app.m.genome[15],function(){
    d+="<table>";
    d+="<tr>";
      d+="<td>";
        d+=app.t.name();
      d+="</td>";
      d+="<td>";
        d+=app.t.contactInformation();
      d+="</td>";
    d+="</tr>";
    d+="<tr>";
      d+="<td colspan=2>";
        d+=app.t.technologies();
        davis.maybe(app.m.genome[20],function(){
          d+=app.t.positions();
          d+=app.t.projects();
        }, function(){
          d+=app.t.projects();
          d+=app.t.positions();
        });
        d+=app.t.personalNote();
      d+="</td>";
    d+="</tr>";
    d+="</table>";
  },function(){
    d+="<table>";
    d+="<tr>";
      d+="<td>";
        d+=app.t.name();
      d+="</td>";
      d+="<td>";
        d+=app.t.contactInformation();
      d+="</td>";
    d+="</tr>";
    d+="<tr>";
      d+="<td colspan=2>";
        d+=app.t.technologies();
      d+="</td>";
    d+="</tr>";
    d+="<tr>";
    davis.maybe(app.m.genome[20],function(){
      d+="<td class='col-2'>";
        d+=app.t.projects();
      d+="</td><td>";
        d+=app.t.positions();
      d+="</td>";
    }, function(){
      d+="<td class='col-2'>";
        d+=app.t.positions();
      d+="</td><td>";
        d+=app.t.projects();
      d+="</td>";
    });
    d+="</tr>";
    d+="<tr>";
      d+="<td colspan=2>";
        d+=app.t.personalNote();
      d+="</td>";
    d+="</tr>";
    d+="</table>";
  });
  return d;
};

app.t.sideBySide=function(){
  var d="";
  davis.maybe(app.m.genome[16],function(){
    d+="<table>";
      d+="<tr>";
        d+="<td>";
          d+=app.t.name();
          d+=app.t.photo();
          d+=app.t.contactInformation();
          d+=app.t.technologies();
          d+=app.t.personalNote();
        d+="</td>";
        d+="<td>";
          davis.maybe(app.m.genome[20],function(){
            d+=app.t.projects();
            d+=app.t.positions();
          }, function(){
            d+=app.t.positions();
            d+=app.t.projects();
          });
        d+="</td>";
      d+="</tr>";
    d+="</table>";
  },function(){
    d+="<table>";
      d+="<tr>";
        d+="<td>";
          d+=app.t.name();
          d+=app.t.photo();
          d+=app.t.contactInformation();
          d+=app.t.personalNote();
        d+="</td>";
        d+="<td>";
          d+=app.t.technologies();
          davis.maybe(app.m.genome[20],function(){
            d+=app.t.projects();
            d+=app.t.positions();
          }, function(){
            d+=app.t.positions();
            d+=app.t.projects();
          });
        d+="</td>";
      d+="</tr>";
    d+="</table>";
  })
  return d;
};

app.t.name=function(){
  var d="";
  d+="<div id='name'>"+_.unescape(app.m.name)+"</div>";
  return d;
};

app.t.photo=function(){
  if (app.m.showPhoto === true){
    return "<img src='./images/profile-wide.jpg' alt='me' width='"+(app.m.fontSize*275)+"px' />";
  } else {
    return "";
  }
};

app.t.contactInformation=function(){
  var d="";
  d+="<div id='contact-information' class='section'>";
    d+="<div id='contact-github'>"+_.unescape(app.m.github)+"</div>";
    d+="<div id='contact-email'>"+_.unescape(app.m.email)+"</div>";
    d+="<div id='contact-phone'>"+_.unescape(app.m.phone)+"</div>";
    //d+="<div id='contact-linkedin'>linkedIn: "+app.m.linkedin+"</div>";
  d+="</div>";
  return d;
};

app.t.project=function(project){
  var d="";
  d+="<div class='project'>";
    d+="<span class='project-title'>"+_.unescape(project.title)+"</span>";
    d+="<span class='project-notes'> "+_.unescape(project.notes)+"</span>";
    d+="<div>"+_.unescape(project.exposition)+"</div>";
  d+="</div>";
  return d;
};

app.t.projects=function(){
  var projects=app.m.projects;
  var d="";
  d+="<div id='projects' class='section'>";
  d+="<div class='section-title'>Recent Projects</div>";
    for (var i=0;i<projects.length;i++){
      d+=app.t.project(projects[i]);
    }
  d+="</div>";
  return d;
};

app.t.technologies=function(){
  var d="";
  d+="<div class='section'>";
    d+="<div class='section-title'>Strengths</div>";
    d+="<div class='collection'>";
      for (var i=0, a=[];i<app.m.technologies.strengths.length;i++){
        a.push("<span class='technology-strength'>"+_.unescape(app.m.technologies.strengths[i])+"</span>");
      }
    d+=a.join(", ");
    d+="</div>";
    d+="<div class='section-title'>Experience</div>";
    d+="<div class='collection'>";
      for (var i=0, a=[];i<app.m.technologies.experience.length;i++){
        a.push("<span class='technology-experience'>"+_.unescape(app.m.technologies.experience[i])+"</span>");
      }
    d+=a.join(", ");
    d+="</div>";
  d+="</div>";
  return d;
};

app.t.position=function(position){
  var d="";
  d+="<div class='position'>";
    d+="<div  class='position-metadata'>";      
      d+="<span class='position-period'>"+_.unescape(position.period)+"</span>";
      d+="<span class='position-title'>"+_.unescape(position.title)+"</span>";
      d+="<span class='position-organization'> ("+_.unescape(position.organization)+") </span>";
    d+="</div>";
    d+="<div>"+_.unescape(position.exposition)+"</div>";
  d+="</div>";
  return d;
};

app.t.positions=function(){
  var positions=app.m.positions;
  var d="";
  d+="<div class='section' id='positions'>";
    d+="<div class='section-title'>Prior Positions</div>";
    for (var i=0;i<positions.length;i++){
      d+=app.t.position(positions[i]);
    }
  d+="</div>";
  return d;
};

app.t.personalNote=function(){
  var d="";
  d+="<div  class='section'>";
    d+="<div class='section-title'>About Me</div>";
    d+="<div id='personal-note'>"+_.unescape(app.m.personalNote)+"</div>";
  d+="</div>";
  return d;
};

app.t.textInput=function(id,placeholder,className){
  var id=id||"";
  var placeholder=placeholder||"";
  var className=className||"";
  return "<input type='text' id='"+id+"' placeholder='"+placeholder+"' class='"+className+"'></input>";
};

app.t.priorPositionInput=function(){
  var d="";
  d+="<div class='user-position-input-area'>";
    d+=app.t.textInput(null,"the name of the organization","user-position-organization");
    d+=app.t.textInput(null,"your position at that organization","user-position-title");
    d+=app.t.textInput(null,"when you worked there","user-position-period");
    d+=app.t.textInput(null,"describe what you did there","user-position-exposition");
  d+="</div>";
  return d;
};

app.t.priorPositionsInput=function(){
  var d="";
  for (var i=0;i<app.m.positions.length;i++){
    d+=app.t.priorPositionInput();
  }
  d+="<input type='button' value='Add Another' id='add-another-position'></input>";
  return d;
};

app.t.priorProjectInput=function(){
  var d="";
  d+="<div class='user-project-input-area'>";
    d+=app.t.textInput(null,"the name of a project you've worked on recently","user-project-title");
    d+=app.t.textInput(null,"your role in the project","user-project-role");
    d+=app.t.textInput(null,"any special notes","user-project-notes");  
    d+=app.t.textInput(null,"explain the project in a sentence or two","user-project-exposition");
  d+="</div>";
  return d;
};

app.t.priorProjectsInput=function(){
  var d="";
  for (var i=0;i<app.m.projects.length;i++){
    d+=app.t.priorProjectInput();
  }
  d+="<input type='button' value='Add Another' id='add-another-project'></input>";
  return d;
};

app.t.coverLetterInput=function(){
  var d = "";
  d+="<div class='cover-letter-input-area'>";
    d+=app.t.textInput(null,"cover letter info goes here","cover-letter-text");
  d+="</div>";
  return d;
};

app.t.coverLettersInput=function(){
  var d = "";
  for (var i=0;i<app.m.coverLetters.length;i++){
    d+=app.t.coverLetterInput();
  }
  d+="<input type='button' value='Add Another' id='add-another-cover-letter'></input>";
  return d;
};

app.t.form=function(){
  var d="";
  d+="<h1>Adjust Your Information</h1>";
  d+="<h2>Name</h2>";
  d+=app.t.textInput("user-name","your name");
  d+="<h2>Email</h2>";
  d+=app.t.textInput("user-email","email address");
  d+="<h2>Github</h2>";
  d+=app.t.textInput("user-github","github profile");
  d+="<h2>Linkedin</h2>";
  d+=app.t.textInput("user-linkedin","your linkedin profile");
  d+="<h2>Website</h2>";
  d+=app.t.textInput("user-website","your website");
  d+="<h2>Phone Number</h2>";
  d+=app.t.textInput("user-phone","phone number");
  d+="<h2>Strengths</h2>";
  d+=app.t.textInput("user-strengths","list your strengths");
  d+="<h2>Experience</h2>";
  d+=app.t.textInput("user-experience","in what areas do you have experience?");
  d+="<h2>A Personal Note</h2>";
  d+=app.t.textInput("user-personal-note","add a personal note");
  d+="<h2>Recent Projects</h2>";
  d+=app.t.priorProjectsInput();
  d+="<h2>Prior Positions</h2>";
  d+=app.t.priorPositionsInput();
  d+="<h2>Cover Letters</h2>";
  d+=app.t.coverLettersInput();
  d+="<input type='button' value='Save' id='save-data'></input>";
  return d;
};

///////////////////////////////////////////////////////begin css

zi={};
zi.config=function(){
  var grey=davis.randomColor("gray");
  var margin=(_.random(5,10))+"px";
  
  var css={
    "body":{
      "margin":"0",
      "padding":"0",
      "background":"#ccc",
      "font-size":app.m.fontSize+"em",
      "font-family":_.sample(["arial","times","garamond","verdana"])
    },
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
  
  return css;
};
zi.transform=function(css){
    var c="";
    for (var selector in css){
        c+=selector+"{";
        for (var property in css[selector]){
            c+=property+" : "+css[selector][property]+";";
        }
        c+="}";
    }
    return c;
};
zi.css=function(){
    if ($("head style#zi").length<1){
        $("head").append("<style type='text/css' id='zi'></style>");
    }
    $("head style#zi").html( this.transform( this.config() ) );
};
/////////////////////////////////////////////////////// end css section
///////////////////////////////////////////////////////

var content = ContentAggregate();

content.add(app.t.projects(), 'div', 1);
content.add(app.t.positions(), 'div', 1);
content.add(app.t.technologies(), 'div', 1);
content.add(app.t.personalNote(), 'div', 1);
content.add(app.t.name(), 'div', 1);


module.exports = content;
