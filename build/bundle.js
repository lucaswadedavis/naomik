/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var app = function(){
	 $('body').html(templates.grid());
	 $(".gridster ul").gridster({
	        widget_margins: [5, 5],
	        widget_base_dimensions: [140, 140],
	        helper: 'clone',
	        resize: {
	            enabled: true
	          }
	    });  
	};

	var templates = {};

	templates.grid = function(n){
	  n = n || 10;
	  var d = '';
	  d += '<div class="gridster">';
	  d += '<ul>';
	  for (var i=0;i<n;i++){
	    d += templates.grid.cell();
	  }
	  d += '<ul>';
	  d += '</div>';
	  return d;
	};

	templates.grid.cell = function(row, col, w, h){
	  row = row || 1;
	  col = col || 1;
	  w = w || 1;
	  h = h || 1;
	  var d = '<li';
	  d += ' data-row="' + row + '" data-col="' + col + '" ';
	  d += ' data-sizex="' + w + '" data-sizey="' + h + '" >';
	  d += Math.round( 1000 * Math.random()) + '</li>';
	  return d;
	};

	$(document).ready(function(){app();});

	module.exports = app;


/***/ }
/******/ ]);