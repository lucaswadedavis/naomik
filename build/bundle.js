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
/***/ function(module, exports, __webpack_require__) {

	var grid = __webpack_require__(1);
	var styles = __webpack_require__(3);
	var _ = __webpack_require__(2);
	var rezi = __webpack_require__(5);
	var Genome = __webpack_require__(6);
	var cellsContent = __webpack_require__(8);

	var app = function(){

	  $('body').html(templates.wrapper);
	  $('body').append(templates.controls);
	  $('body').append(templates.savedDesignsOverlay);
	  app.createTemplate();
	  app.listeners();
	};

	app.listeners = function(){
	  $('body').on('click', '.controls #love', function(){
	    app.saveCurrentModel();
	  });

	  $('body').on('click', '.controls #next', function(){
	    app.createTemplate();
	  });

	  $('body').on('click', '.controls #see-all-designs', function(){
	    app.showSavedDesigns();
	  });

	  $('body').on('click', '.saved-designs .close', function(){
	    app.hideSavedDesigns();
	  });
	  /*
	  var KEYS = {L: 108, N: 110};
	  $('body').keypress(function(e){
	    if (e.which === KEYS.L){
	      app.saveCurrentModel()
	    } else if (e.which === KEYS.N) {
	      app.createTemplate();
	    }
	  });
	  */
	};

	app.saveCurrentModel = function(){
	  html2canvas(document.getElementsByClassName('site-wrapper')[0], {
	    background: app.currentModel.pageBackground,
	    onrendered: function(canvas){
	      var design ={
	        canvas: canvas,
	        code: rezi(styles(app.currentModel))
	      };
	      app.savedDesigns.push(design);
	    }
	  });
	  app.genePool.push(app.currentModel);
	};

	app.currentModel;
	app.genePool = [];
	app.carryingCapacity = 10000;
	app.content = cellsContent.all();
	app.savedDesigns = [];

	app.showSavedDesigns = function(){
	      $(".saved-designs").animate({
	        opacity: 1,
	        zIndex: 5,
	      }, 400, function() {
	        $(".saved-designs").html('<span class="close">Close</span>');
	        for (var i = 0; i < app.savedDesigns.length; i++) {
	          document.getElementsByClassName('saved-designs')[0].appendChild(app.savedDesigns[i].canvas);
	        }
	        $("canvas").css({
	          "zoom": "30%",
	          "margin": "20px"
	        });
	      });
	};

	app.hideSavedDesigns = function(){
	  $('.saved-designs').animate({
	    opacity: 0,
	    zIndex: -1
	  }, 300, function(){
	    $('.saved-designs').html('');
	  });
	};


	app.createTemplate = function(){
	  if (app.genePool > app.carryingCapacity) {
	    app.genePool.splice(0, 1);
	  }
	  var genome = Genome(app.genePool);
	  app.currentModel = genome;
	  $('.site-wrapper').html(templates.grid(genome, app.content));
	  var gridster = $('.gridster ul').gridster({
	    widget_margins: [genome.margin, genome.margin],
	      max_cols: 60,
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
	      widget_base_dimensions: [10, 15],
	      helper: 'clone'
	  }).data('gridster');  

	  rezi(styles(genome));
	};

	var templates = {
	  grid: grid,
	  wrapper: '<div class="site-wrapper"></div>',
	  controls: '<div class="controls"><button id="love">Love</button><button id="next">Next</button><button id="see-all-designs">See All</button></div>',
	  savedDesignsOverlay: '<div class="saved-designs"></div>'
	};

	$(document).ready(function(){app();});

	window.app = app;

	module.exports = app;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2);

	var grid = function(genome, content){
	  var d = '';
	  d += '<div class="gridster-wrapper">';
	  d += '<div class="gridster">';
	  d += '<ul>';
	  var cc = content;
	  var i = 0;
	  for (var key in cc){
	    if (i>=genome.cells.length){break;}
	    var c = genome.cells[i];
	    var autoClass = _.sample(genome.autoClasses);
	    d += grid.cell(cc[key], c.row, c.col, c.size_x, c.size_y, autoClass);
	    i++;
	  }
	  d += '<ul>';
	  d += '</div>';
	  d += '</div>';
	  return d;
	};

	grid.cell = function(content, row, col, w, h, autoClass){
	  row = row || 1;
	  col = col || 1;
	  w = w || 1;
	  h = h || 1;
	  var d = '<li';
	  d += ' class="' + autoClass + ' ' + content.ancillaryClasses.join(' ') + '" ';
	  d += ' data-row="' + row + '" data-col="' + col + '" ';
	  d += ' data-sizex="' + w + '" data-sizey="' + h + '" >';
	  d += '' + content.html() + '</li>';
	  return d;
	};

	module.exports = grid;



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var darwa = __webpack_require__(4);
	var _ = __webpack_require__(2);

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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

	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = darwa;
	    }
	    exports.darwa = darwa;
	  } else {
	    root.darwa= darwa;
	  }
	        
	}).call(this);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function() {

	  var root = this;


	  var rezi = function(jcss) {
	    if (jcss === undefined) {
	      return null;
	    }

	    try {
	      JSON.stringify(jcss);
	    }
	    catch (err) {
	      return null;
	    }

	    if (document.getElementById("rezi") === null) {
	      var cssNode = document.createElement("STYLE");
	      cssNode.id = "rezi";
	      cssNode.setAttribute("type", "text/css");
	      document.head.appendChild(cssNode);
	    }
	    var cssTag = document.getElementById("rezi");
	    cssTag.innerHTML = rezi.transpile(jcss);
	  };

	  rezi.transpile = function(jcss) {
	    var css = "";

	    var compile = function(child, parent) {
	      if (parent === undefined) {
	        parent = "";
	      }
	      for (var key in child) {
	        if (typeof child[key] === 'string') {
	          css += "\n" + parent + " {\n" + key + ": " + child[key] + ";\n}";
	        }
	        else {
	          compile(child[key], parent + " " + key);
	        }
	      }
	    };

	    compile(jcss);
	    return css;
	  };



	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = rezi;
	    }
	    exports.rezi = rezi;
	  }
	  else {
	    root.rezi = rezi;
	  }

	}).call(this);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2);
	var darwa = __webpack_require__(4);
	var simulatedAnnealing = __webpack_require__(7);

	var mutateColors = function(genomeColors, genePoolSize){
	  // as the genepool grows larger, turn the heat down
	  for (var i=0;i<genomeColors.length;i++){
	    genomeColors[i] = darwa.hsl(genomeColors[i], 0.2);
	  };
	};

	var rows = [
	  [30,10,20],
	  [30,20,10]
	  ];

	var autoClasses = ['auto0', 'auto1', 'auto1', 'auto1', 'auto2', 'auto2', 'auto3'];

	var Genome = function(genePool){
	  var genome = {};
	  genome.cells = [];
	  genome.autoClasses = autoClasses;
	  // this needs some love later. genome.rows is only an intermediate step
	  genome.rows = [];
	  for (var i=0;i<3;i++){
	    var row = _.sample(rows);
	    var genomeRow = [];
	    var height = Math.ceil(Math.random() * 3);
	    for (var j=0;j<row.length;j++){
	      genomeRow.push({width: row[j], height: height});
	    }
	    genome.rows.push(genomeRow);
	  }

	  var rowIndex = 1;
	  for (var i=0;i<genome.rows.length;i++){
	    var colIndex = 1;
	    for (var j=0;j<genome.rows[i].length;j++){
	      genome.cells.push({
	        row: rowIndex, 
	        col: colIndex,
	        size_x: genome.rows[i][j].width,
	        size_y: genome.rows[i][j].height,
	      });
	      colIndex += genome.rows[i][j].width;
	    }
	    rowIndex += genome.rows[i][0].height;
	  }
	  genome.cells = simulatedAnnealing([genome.cells], _.pluck(genePool, 'cells'));

	  genome.hue1 = simulatedAnnealing([_.random(360)], _.pluck(genePool, 'hue1'));
	  genome.hue2 =  simulatedAnnealing([_.random(360)], _.pluck(genePool, 'hue2'));
	  genome.saturation1 = simulatedAnnealing([_.random(0,100)], _.pluck(genePool, 'saturation1'));
	  genome.saturation2 = simulatedAnnealing([_.random(0,100)], _.pluck(genePool, 'saturation2'));
	  genome.lightness1 =  simulatedAnnealing([_.random(100)], _.pluck(genePool, 'lightness1'));
	  genome.lightness2 =  simulatedAnnealing([_.random(100)], _.pluck(genePool, 'lightness2'));

	  genome.colors = [];
	  genome.colors.push('hsl(' + genome.hue1 + ',' + genome.saturation1 + '%,' + genome.lightness1 + '%)');
	  genome.colors.push('hsl(' + genome.hue2 + ',' + genome.saturation2 + '%,' + genome.lightness2 + '%)');

	  genome.colors = simulatedAnnealing([genome.colors], _.pluck(genePool, 'colors'));

	  genome.greys = [];
	  for (var i=0;i<3;i++){
	    var n = Math.floor(Math.random() * 255);
	    genome.greys.push('rgb(' + n + ',' + n + ',' + n + ')');
	  }

	  genome.margin = simulatedAnnealing([_.random(20)], _.pluck(genePool, 'margin'));
	  genome.borderWidth = simulatedAnnealing([Math.floor(Math.random() * genome.margin)], _.pluck(genePool, 'borderWidth'));
	  genome.borderColor = simulatedAnnealing([Math.random() > 0.5 ? '#fff' : '#000'], _.pluck(genePool, 'borderColor'));
	  
	  genome.backgroundColors = [];

	  genome.liklihoodOfColoredBackground = simulatedAnnealing([Math.random()], _.pluck(genePool, 'liklihoodOfColoredBackground'));

	  if (Math.random() > genome.liklihoodOfColoredBackground){
	    genome.backgroundColors = genome.backgroundColors.concat(genome.colors);
	    genome.pageBackground = genome.greys[0];
	  } else {
	    genome.backgroundColors = genome.backgroundColors.concat(genome.greys);
	    genome.pageBackground = genome.colors[0];
	  }

	  mutateColors(genome.colors, genePool.length);
	  
	  return genome;
	};

	module.exports = Genome;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2);
	var darwa = __webpack_require__(4);

	var simulatedAnnealing = function(mutants, ancestors){
	  // takes two arrays, one with mutatants, the other ancestors
	  var a = ancestors.length;
	  var m = (9 * a * a) / ((a * a) + 100);
	  var d = 1 + _.random(10);
	  if (m > d){
	    return _.sample(ancestors);
	  } else {
	    return _.sample(mutants);
	  }
	};

	/*
	var simulatedAnnealing = function(ancestor, ancestorCount){
	  // takes two arrays, one with mutatants, the other ancestors
	  var a = ancestorCount;
	  var m = (9 * a * a) / ((a * a) + 100);
	  var d = 1 + _.random(10);
	  if (m > d){
	    // don't mutate
	    return ancestor
	  } else {
	    return darwa(ancestor, delta);
	  }
	};
	*/

	module.exports = simulatedAnnealing;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var ContentAggregate = __webpack_require__(9);
	var _ = __webpack_require__(2);

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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2);

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


/***/ }
/******/ ]);