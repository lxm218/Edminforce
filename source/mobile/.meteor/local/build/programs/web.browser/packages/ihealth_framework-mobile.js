//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var DefaultRoutes = Package['ihealth:utils'].DefaultRoutes;
var h = Package['ihealth:utils'].h;
var IH = Package['ihealth:utils'].IH;
var RC = Package['ihealth:framework-engine'].RC;
var React = Package['react-runtime'].React;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var Roles = Package['alanning:roles'].Roles;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var moment = Package['momentjs:moment'].moment;
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var __init_fast_render = Package['meteorhacks:fast-render'].__init_fast_render;
var FastClick = Package.fastclick.FastClick;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var RC;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/ihealth_framework-mobile/startup.js                                                                   //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
if (Meteor.isCordova) {                                                                                           // 2
                                                                                                                  // 3
  Meteor.startup( function() {                                                                                    // 4
                                                                                                                  // 5
    // Back Handler                                                                                               // 6
    document.addEventListener("backbutton", function(e){                                                          // 7
      e.preventDefault()                                                                                          // 8
      if (FlowRouter.current().path=="/") {                                                                       // 9
        navigator.app.exitApp()                                                                                   // 10
      } else {                                                                                                    // 11
        FlowRouter.BackButton = true                                                                              // 12
        navigator.app.backHistory()                                                                               // 13
      }                                                                                                           // 14
    }, false)                                                                                                     // 15
                                                                                                                  // 16
    // Important : Meta                                                                                           // 17
    var metaTag=document.createElement('meta');                                                                   // 18
    metaTag.name = "viewport"                                                                                     // 19
    metaTag.content = "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"                       // 20
    document.getElementsByTagName('head')[0].appendChild(metaTag)                                                 // 21
                                                                                                                  // 22
  })                                                                                                              // 23
                                                                                                                  // 24
}                                                                                                                 // 25
                                                                                                                  // 26
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/ihealth_framework-mobile/RC/swipe/swipe.jsx                                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  //
/*                                                                                                                //
 * Swipe 2.0.0                                                                                                    //
 * Brad Birdsall                                                                                                  //
 * https://github.com/thebird/Swipe                                                                               //
 * Copyright 2013-2015, MIT License                                                                               //
 *                                                                                                                //
*/                                                                                                                //
var SwipeJS = function (container, options) {                                                                     // 9
  // utilities                                                                                                    //
  var noop = function () {}; // simple no operation function                                                      // 11
  var offloadFn = function (fn) {                                                                                 // 12
    setTimeout(fn || noop, 0);                                                                                    // 12
  }; // offload a functions execution                                                                             //
                                                                                                                  //
  // check browser capabilities                                                                                   //
  var browser = {                                                                                                 // 15
    addEventListener: !!window.addEventListener,                                                                  // 16
    touch: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,                 // 17
    transitions: (function (temp) {                                                                               // 18
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];     // 19
      for (var i in babelHelpers.sanitizeForInObject(props)) if (temp.style[props[i]] !== undefined) return true;
      return false;                                                                                               // 21
    })(document.createElement('swipe'))                                                                           //
  };                                                                                                              //
                                                                                                                  //
  // quit if no root element                                                                                      //
  if (!container) return;                                                                                         // 26
  var element = container.children[0];                                                                            // 27
  var slides, slidePos, width, length;                                                                            // 28
  options = options || {};                                                                                        // 29
  var index = parseInt(options.startSlide, 10) || 0;                                                              // 30
  var speed = options.speed || 300;                                                                               // 31
  options.continuous = options.continuous !== undefined ? options.continuous : true;                              // 32
                                                                                                                  //
  function setup() {                                                                                              // 34
                                                                                                                  //
    // cache slides                                                                                               //
    slides = element.children;                                                                                    // 37
    length = slides.length;                                                                                       // 38
                                                                                                                  //
    // set continuous to false if only one slide                                                                  //
    if (slides.length < 2) options.continuous = false;                                                            // 41
                                                                                                                  //
    //special case if two slides                                                                                  //
    if (browser.transitions && options.continuous && slides.length < 3) {                                         // 44
      element.appendChild(slides[0].cloneNode(true));                                                             // 45
      element.appendChild(element.children[1].cloneNode(true));                                                   // 46
      slides = element.children;                                                                                  // 47
    }                                                                                                             //
                                                                                                                  //
    // create an array to store current positions of each slide                                                   //
    slidePos = new Array(slides.length);                                                                          // 51
                                                                                                                  //
    // determine width of each slide                                                                              //
    width = container.getBoundingClientRect().width || container.offsetWidth;                                     // 54
                                                                                                                  //
    element.style.width = slides.length * width + 'px';                                                           // 56
                                                                                                                  //
    // stack elements                                                                                             //
    var pos = slides.length;                                                                                      // 59
    while (pos--) {                                                                                               // 60
                                                                                                                  //
      var slide = slides[pos];                                                                                    // 62
                                                                                                                  //
      slide.style.width = width + 'px';                                                                           // 64
      slide.setAttribute('data-index', pos);                                                                      // 65
                                                                                                                  //
      if (browser.transitions) {                                                                                  // 67
        slide.style.left = pos * -width + 'px';                                                                   // 68
        move(pos, index > pos ? -width : index < pos ? width : 0, 0);                                             // 69
      }                                                                                                           //
    }                                                                                                             //
                                                                                                                  //
    // reposition elements before and after index                                                                 //
    if (options.continuous && browser.transitions) {                                                              // 75
      move(circle(index - 1), -width, 0);                                                                         // 76
      move(circle(index + 1), width, 0);                                                                          // 77
    }                                                                                                             //
                                                                                                                  //
    if (!browser.transitions) element.style.left = index * -width + 'px';                                         // 80
                                                                                                                  //
    container.style.visibility = 'visible';                                                                       // 82
  }                                                                                                               //
                                                                                                                  //
  function prev() {                                                                                               // 86
                                                                                                                  //
    if (options.continuous) slide(index - 1);else if (index) slide(index - 1);                                    // 88
  }                                                                                                               //
                                                                                                                  //
  function next() {                                                                                               // 93
                                                                                                                  //
    if (options.continuous) slide(index + 1);else if (index < slides.length - 1) slide(index + 1);                // 95
  }                                                                                                               //
                                                                                                                  //
  function circle(index) {                                                                                        // 100
                                                                                                                  //
    // a simple positive modulo using slides.length                                                               //
    return (slides.length + index % slides.length) % slides.length;                                               // 103
  }                                                                                                               //
                                                                                                                  //
  function slide(to, slideSpeed) {                                                                                // 107
                                                                                                                  //
    // do nothing if already on requested slide                                                                   //
    if (index == to) return;                                                                                      // 110
                                                                                                                  //
    if (browser.transitions) {                                                                                    // 112
                                                                                                                  //
      var direction = Math.abs(index - to) / (index - to); // 1: backward, -1: forward                            // 114
                                                                                                                  //
      // get the actual position of the slide                                                                     //
      if (options.continuous) {                                                                                   // 117
        var natural_direction = direction;                                                                        // 118
        direction = -slidePos[circle(to)] / width;                                                                // 119
                                                                                                                  //
        // if going forward but to < index, use to = slides.length + to                                           //
        // if going backward but to > index, use to = -slides.length + to                                         //
        if (direction !== natural_direction) to = -direction * slides.length + to;                                // 123
      }                                                                                                           //
                                                                                                                  //
      var diff = Math.abs(index - to) - 1;                                                                        // 127
                                                                                                                  //
      // move all the slides between index and to in the right direction                                          //
      while (diff--) move(circle((to > index ? to : index) - diff - 1), width * direction, 0);                    // 130
                                                                                                                  //
      to = circle(to);                                                                                            // 132
                                                                                                                  //
      move(index, width * direction, slideSpeed || speed);                                                        // 134
      move(to, 0, slideSpeed || speed);                                                                           // 135
                                                                                                                  //
      if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place
    } else {                                                                                                      //
                                                                                                                  //
        to = circle(to);                                                                                          // 141
        animate(index * -width, to * -width, slideSpeed || speed);                                                // 142
        //no fallback for a circular continuous if the browser does not accept transitions                        //
      }                                                                                                           //
                                                                                                                  //
    index = to;                                                                                                   // 146
    offloadFn(options.callback && options.callback(index, slides[index]));                                        // 147
  }                                                                                                               //
                                                                                                                  //
  function move(index, dist, speed) {                                                                             // 150
                                                                                                                  //
    translate(index, dist, speed);                                                                                // 152
    slidePos[index] = dist;                                                                                       // 153
  }                                                                                                               //
                                                                                                                  //
  function translate(index, dist, speed) {                                                                        // 157
                                                                                                                  //
    var slide = slides[index];                                                                                    // 159
    var style = slide && slide.style;                                                                             // 160
                                                                                                                  //
    if (!style) return;                                                                                           // 162
                                                                                                                  //
    style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = speed + 'ms';
                                                                                                                  //
    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';                                      // 170
    style.msTransform = style.MozTransform = style.OTransform = 'translateX(' + dist + 'px)';                     // 171
  }                                                                                                               //
                                                                                                                  //
  function animate(from, to, speed) {                                                                             // 177
                                                                                                                  //
    // if not an animation, just reposition                                                                       //
    if (!speed) {                                                                                                 // 180
                                                                                                                  //
      element.style.left = to + 'px';                                                                             // 182
      return;                                                                                                     // 183
    }                                                                                                             //
                                                                                                                  //
    var start = +new Date();                                                                                      // 187
                                                                                                                  //
    var timer = setInterval(function () {                                                                         // 189
                                                                                                                  //
      var timeElap = +new Date() - start;                                                                         // 191
                                                                                                                  //
      if (timeElap > speed) {                                                                                     // 193
                                                                                                                  //
        element.style.left = to + 'px';                                                                           // 195
                                                                                                                  //
        if (delay) begin();                                                                                       // 197
                                                                                                                  //
        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);                         // 199
                                                                                                                  //
        clearInterval(timer);                                                                                     // 201
        return;                                                                                                   // 202
      }                                                                                                           //
                                                                                                                  //
      element.style.left = (to - from) * (Math.floor(timeElap / speed * 100) / 100) + from + 'px';                // 206
    }, 4);                                                                                                        //
  }                                                                                                               //
                                                                                                                  //
  // setup auto slideshow                                                                                         //
  var delay = options.auto || 0;                                                                                  // 213
  var interval;                                                                                                   // 214
                                                                                                                  //
  function begin() {                                                                                              // 216
                                                                                                                  //
    interval = setTimeout(next, delay);                                                                           // 218
  }                                                                                                               //
                                                                                                                  //
  function stop() {                                                                                               // 222
                                                                                                                  //
    delay = 0;                                                                                                    // 224
    clearTimeout(interval);                                                                                       // 225
  }                                                                                                               //
                                                                                                                  //
  // setup initial vars                                                                                           //
  var start = {};                                                                                                 // 231
  var delta = {};                                                                                                 // 232
  var isScrolling;                                                                                                // 233
                                                                                                                  //
  // setup event capturing                                                                                        //
  var events = {                                                                                                  // 236
                                                                                                                  //
    handleEvent: function (event) {                                                                               // 238
                                                                                                                  //
      switch (event.type) {                                                                                       // 240
        case 'touchstart':                                                                                        // 241
          this.start(event);break;                                                                                // 241
        case 'touchmove':                                                                                         // 241
          this.move(event);break;                                                                                 // 242
        case 'touchend':                                                                                          // 242
          offloadFn(this.end(event));break;                                                                       // 243
        case 'webkitTransitionEnd':                                                                               // 244
        case 'msTransitionEnd':                                                                                   // 245
        case 'oTransitionEnd':                                                                                    // 246
        case 'otransitionend':                                                                                    // 247
        case 'transitionend':                                                                                     // 248
          offloadFn(this.transitionEnd(event));break;                                                             // 248
        case 'resize':                                                                                            // 249
          offloadFn(setup);break;                                                                                 // 249
      }                                                                                                           // 249
                                                                                                                  //
      if (options.stopPropagation) event.stopPropagation();                                                       // 252
    },                                                                                                            //
    start: function (event) {                                                                                     // 255
                                                                                                                  //
      var touches = event.touches[0];                                                                             // 257
                                                                                                                  //
      // measure start values                                                                                     //
      start = {                                                                                                   // 260
                                                                                                                  //
        // get initial touch coords                                                                               //
        x: touches.pageX,                                                                                         // 263
        y: touches.pageY,                                                                                         // 264
                                                                                                                  //
        // store time to determine touch duration                                                                 //
        time: +new Date()                                                                                         // 267
                                                                                                                  //
      };                                                                                                          //
                                                                                                                  //
      // used for testing first move event                                                                        //
      isScrolling = undefined;                                                                                    // 272
                                                                                                                  //
      // reset delta and end measurements                                                                         //
      delta = {};                                                                                                 // 275
                                                                                                                  //
      // attach touchmove and touchend listeners                                                                  //
      element.addEventListener('touchmove', this, false);                                                         // 278
      element.addEventListener('touchend', this, false);                                                          // 279
    },                                                                                                            //
    move: function (event) {                                                                                      // 282
                                                                                                                  //
      // ensure swiping with one touch and not pinching                                                           //
      if (event.touches.length > 1 || event.scale && event.scale !== 1) return;                                   // 285
                                                                                                                  //
      if (options.disableScroll) event.preventDefault();                                                          // 287
                                                                                                                  //
      var touches = event.touches[0];                                                                             // 289
                                                                                                                  //
      // measure change in x and y                                                                                //
      delta = {                                                                                                   // 292
        x: touches.pageX - start.x,                                                                               // 293
        y: touches.pageY - start.y                                                                                // 294
      };                                                                                                          //
                                                                                                                  //
      // determine if scrolling test has run - one time test                                                      //
      if (typeof isScrolling == 'undefined') {                                                                    // 298
        isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));                                   // 299
      }                                                                                                           //
                                                                                                                  //
      // if user is not trying to scroll vertically                                                               //
      if (!isScrolling) {                                                                                         // 303
                                                                                                                  //
        // prevent native scrolling                                                                               //
        event.preventDefault();                                                                                   // 306
                                                                                                                  //
        // stop slideshow                                                                                         //
        stop();                                                                                                   // 309
                                                                                                                  //
        // increase resistance if first or last slide                                                             //
        if (options.continuous) {                                                                                 // 312
          // we don't add resistance at the end                                                                   //
                                                                                                                  //
          translate(circle(index - 1), delta.x + slidePos[circle(index - 1)], 0);                                 // 314
          translate(index, delta.x + slidePos[index], 0);                                                         // 315
          translate(circle(index + 1), delta.x + slidePos[circle(index + 1)], 0);                                 // 316
        } else {                                                                                                  //
                                                                                                                  //
          delta.x = delta.x / (!index && delta.x > 0 // if first slide and sliding left                           // 320
           || index == slides.length - 1 // or if last slide and sliding right                                    //
           && delta.x < 0 // and if sliding at all                                                                //
          ? Math.abs(delta.x) / width + 1 : // determine resistance level                                         //
          1); // no resistance if false                                                                           // 327
                                                                                                                  //
          // translate 1:1                                                                                        //
          translate(index - 1, delta.x + slidePos[index - 1], 0);                                                 // 330
          translate(index, delta.x + slidePos[index], 0);                                                         // 331
          translate(index + 1, delta.x + slidePos[index + 1], 0);                                                 // 332
        }                                                                                                         //
      }                                                                                                           //
    },                                                                                                            //
    end: function (event) {                                                                                       // 338
                                                                                                                  //
      // measure duration                                                                                         //
      var duration = +new Date() - start.time;                                                                    // 341
                                                                                                                  //
      // determine if slide attempt triggers next/prev slide                                                      //
      var isValidSlide = Number(duration) < 250 // if slide duration is less than 250ms                           // 344
       && Math.abs(delta.x) > 20 // and if slide amt is greater than 20px                                         //
       || Math.abs(delta.x) > width / 2; // or if slide amt is greater than half the width                        //
                                                                                                                  //
      // determine if slide attempt is past start and end                                                         //
      var isPastBounds = !index && delta.x > 0 // if first slide and slide amt is greater than 0                  // 350
       || index == slides.length - 1 && delta.x < 0; // or if last slide and slide amt is less than 0             //
                                                                                                                  //
      if (options.continuous) isPastBounds = false;                                                               // 354
                                                                                                                  //
      // determine direction of swipe (true:right, false:left)                                                    //
      var direction = delta.x < 0;                                                                                // 357
                                                                                                                  //
      // if not scrolling vertically                                                                              //
      if (!isScrolling) {                                                                                         // 360
                                                                                                                  //
        if (isValidSlide && !isPastBounds) {                                                                      // 362
                                                                                                                  //
          if (direction) {                                                                                        // 364
                                                                                                                  //
            if (options.continuous) {                                                                             // 366
              // we need to get the next in this direction in place                                               //
                                                                                                                  //
              move(circle(index - 1), -width, 0);                                                                 // 368
              move(circle(index + 2), width, 0);                                                                  // 369
            } else {                                                                                              //
              move(index - 1, -width, 0);                                                                         // 372
            }                                                                                                     //
                                                                                                                  //
            move(index, slidePos[index] - width, speed);                                                          // 375
            move(circle(index + 1), slidePos[circle(index + 1)] - width, speed);                                  // 376
            index = circle(index + 1);                                                                            // 377
          } else {                                                                                                //
            if (options.continuous) {                                                                             // 380
              // we need to get the next in this direction in place                                               //
                                                                                                                  //
              move(circle(index + 1), width, 0);                                                                  // 382
              move(circle(index - 2), -width, 0);                                                                 // 383
            } else {                                                                                              //
              move(index + 1, width, 0);                                                                          // 386
            }                                                                                                     //
                                                                                                                  //
            move(index, slidePos[index] + width, speed);                                                          // 389
            move(circle(index - 1), slidePos[circle(index - 1)] + width, speed);                                  // 390
            index = circle(index - 1);                                                                            // 391
          }                                                                                                       //
                                                                                                                  //
          options.callback && options.callback(index, slides[index]);                                             // 395
        } else {                                                                                                  //
                                                                                                                  //
          if (options.continuous) {                                                                               // 399
                                                                                                                  //
            move(circle(index - 1), -width, speed);                                                               // 401
            move(index, 0, speed);                                                                                // 402
            move(circle(index + 1), width, speed);                                                                // 403
          } else {                                                                                                //
                                                                                                                  //
            move(index - 1, -width, speed);                                                                       // 407
            move(index, 0, speed);                                                                                // 408
            move(index + 1, width, speed);                                                                        // 409
          }                                                                                                       //
        }                                                                                                         //
      }                                                                                                           //
                                                                                                                  //
      // kill touchmove and touchend event listeners until touchstart called again                                //
      element.removeEventListener('touchmove', events, false);                                                    // 417
      element.removeEventListener('touchend', events, false);                                                     // 418
    },                                                                                                            //
    transitionEnd: function (event) {                                                                             // 421
                                                                                                                  //
      if (parseInt(event.target.getAttribute('data-index'), 10) == index) {                                       // 423
                                                                                                                  //
        if (delay) begin();                                                                                       // 425
                                                                                                                  //
        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);                         // 427
      }                                                                                                           //
    }                                                                                                             //
                                                                                                                  //
  };                                                                                                              //
                                                                                                                  //
  // trigger setup                                                                                                //
  setup();                                                                                                        // 436
                                                                                                                  //
  // start auto slideshow if applicable                                                                           //
  if (delay) begin();                                                                                             // 439
                                                                                                                  //
  // add event listeners                                                                                          //
  if (browser.addEventListener) {                                                                                 // 443
                                                                                                                  //
    // set touchstart event on element                                                                            //
    if (browser.touch) element.addEventListener('touchstart', events, false);                                     // 446
                                                                                                                  //
    if (browser.transitions) {                                                                                    // 448
      element.addEventListener('webkitTransitionEnd', events, false);                                             // 449
      element.addEventListener('msTransitionEnd', events, false);                                                 // 450
      element.addEventListener('oTransitionEnd', events, false);                                                  // 451
      element.addEventListener('otransitionend', events, false);                                                  // 452
      element.addEventListener('transitionend', events, false);                                                   // 453
    }                                                                                                             //
                                                                                                                  //
    // set resize event on window                                                                                 //
    window.addEventListener('resize', events, false);                                                             // 457
  } else {                                                                                                        //
                                                                                                                  //
    window.onresize = function () {                                                                               // 461
      setup();                                                                                                    // 461
    }; // to play nice with old IE                                                                                //
  }                                                                                                               //
                                                                                                                  //
  // expose the Swipe API                                                                                         //
  return {                                                                                                        // 466
    setup: function () {                                                                                          // 467
                                                                                                                  //
      setup();                                                                                                    // 469
    },                                                                                                            //
    slide: function (to, speed) {                                                                                 // 472
                                                                                                                  //
      // cancel slideshow                                                                                         //
      stop();                                                                                                     // 475
                                                                                                                  //
      slide(to, speed);                                                                                           // 477
    },                                                                                                            //
    prev: function () {                                                                                           // 480
                                                                                                                  //
      // cancel slideshow                                                                                         //
      stop();                                                                                                     // 483
                                                                                                                  //
      prev();                                                                                                     // 485
    },                                                                                                            //
    next: function () {                                                                                           // 488
                                                                                                                  //
      // cancel slideshow                                                                                         //
      stop();                                                                                                     // 491
                                                                                                                  //
      next();                                                                                                     // 493
    },                                                                                                            //
    stop: function () {                                                                                           // 496
                                                                                                                  //
      // cancel slideshow                                                                                         //
      stop();                                                                                                     // 499
    },                                                                                                            //
    getPos: function () {                                                                                         // 502
                                                                                                                  //
      // return current index position                                                                            //
      return index;                                                                                               // 505
    },                                                                                                            //
    getNumSlides: function () {                                                                                   // 508
                                                                                                                  //
      // return total number of slides                                                                            //
      return length;                                                                                              // 511
    },                                                                                                            //
    kill: function () {                                                                                           // 513
                                                                                                                  //
      // cancel slideshow                                                                                         //
      stop();                                                                                                     // 516
                                                                                                                  //
      // reset element                                                                                            //
      element.style.width = '';                                                                                   // 519
      element.style.left = '';                                                                                    // 520
                                                                                                                  //
      // reset slides                                                                                             //
      var pos = slides.length;                                                                                    // 523
      while (pos--) {                                                                                             // 524
                                                                                                                  //
        var slide = slides[pos];                                                                                  // 526
        slide.style.width = '';                                                                                   // 527
        slide.style.left = '';                                                                                    // 528
                                                                                                                  //
        if (browser.transitions) translate(pos, 0, 0);                                                            // 530
      }                                                                                                           //
                                                                                                                  //
      // removed event listeners                                                                                  //
      if (browser.addEventListener) {                                                                             // 535
                                                                                                                  //
        // remove current event listeners                                                                         //
        element.removeEventListener('touchstart', events, false);                                                 // 538
        element.removeEventListener('webkitTransitionEnd', events, false);                                        // 539
        element.removeEventListener('msTransitionEnd', events, false);                                            // 540
        element.removeEventListener('oTransitionEnd', events, false);                                             // 541
        element.removeEventListener('otransitionend', events, false);                                             // 542
        element.removeEventListener('transitionend', events, false);                                              // 543
        window.removeEventListener('resize', events, false);                                                      // 544
      } else {                                                                                                    //
                                                                                                                  //
        window.onresize = null;                                                                                   // 549
      }                                                                                                           //
    }                                                                                                             //
  };                                                                                                              //
};                                                                                                                //
                                                                                                                  //
RC.Swipe = React.createClass({                                                                                    // 559
  displayName: 'Swipe',                                                                                           //
                                                                                                                  //
  // https://github.com/thebird/Swipe#config-options                                                              //
  propTypes: {                                                                                                    // 561
    startSlide: React.PropTypes.number,                                                                           // 562
    slideToIndex: React.PropTypes.number,                                                                         // 563
    shouldUpdate: React.PropTypes.func,                                                                           // 564
    speed: React.PropTypes.number,                                                                                // 565
    auto: React.PropTypes.number,                                                                                 // 566
    continuous: React.PropTypes.bool,                                                                             // 567
    disableScroll: React.PropTypes.bool,                                                                          // 568
    stopPropagation: React.PropTypes.bool,                                                                        // 569
    callback: React.PropTypes.func,                                                                               // 570
    transitionEnd: React.PropTypes.func                                                                           // 571
  },                                                                                                              //
                                                                                                                  //
  componentDidMount: function () {                                                                                // 574
    if (this.isMounted()) {                                                                                       // 575
      this.swipe = SwipeJS(React.findDOMNode(this), this.props);                                                  // 576
    }                                                                                                             //
  },                                                                                                              //
                                                                                                                  //
  componentDidUpdate: function () {                                                                               // 580
    if (this.props.slideToIndex || this.props.slideToIndex === 0) {                                               // 581
      this.swipe.slide(this.props.slideToIndex);                                                                  // 582
    }                                                                                                             //
  },                                                                                                              //
                                                                                                                  //
  componentWillUnmount: function () {                                                                             // 586
    this.swipe.kill();                                                                                            // 587
    delete this.swipe;                                                                                            // 588
  },                                                                                                              //
                                                                                                                  //
  shouldComponentUpdate: function (nextProps) {                                                                   // 591
    return this.props.slideToIndex !== nextProps.slideToIndex || typeof this.props.shouldUpdate !== 'undefined' && this.props.shouldUpdate(nextProps);
  },                                                                                                              //
                                                                                                                  //
  getPos: function () {                                                                                           // 598
    return this.swipe.getPos();                                                                                   // 599
  },                                                                                                              //
                                                                                                                  //
  slideTo: function (n) {                                                                                         // 602
    return this.swipe.slide(n);                                                                                   // 603
  },                                                                                                              //
                                                                                                                  //
  render: function () {                                                                                           // 606
                                                                                                                  //
    var styles = {                                                                                                // 608
      container: {                                                                                                // 609
        overflow: 'hidden',                                                                                       // 610
        visibility: 'hidden',                                                                                     // 611
        position: 'relative'                                                                                      // 612
      },                                                                                                          //
      wrapper: {                                                                                                  // 614
        overflow: "hidden",                                                                                       // 615
        position: "relative",                                                                                     // 616
        height: "100%"                                                                                            // 617
      },                                                                                                          //
      child: {                                                                                                    // 619
        float: "left",                                                                                            // 620
        width: "100%",                                                                                            // 621
        height: "100%",                                                                                           // 622
        position: "relative"                                                                                      // 623
      }                                                                                                           //
    };                                                                                                            //
                                                                                                                  //
    var rootClasses = "overflow abs-full " + (this.props.className || "") + (this.props.createNavHeight ? " nav-padding" : "");
                                                                                                                  //
    return React.createElement('div', React.__spread({}, this.props, { className: rootClasses }), React.createElement('div', { style: styles.wrapper }, React.Children.map(this.props.children, function (child, index) {
      return React.cloneElement(child, {                                                                          // 632
        ref: child.props.ref,                                                                                     // 633
        key: child.props.key,                                                                                     // 634
        style: child.props.style ? objectAssign(child.props.style, styles.child) : styles.child                   // 635
      });                                                                                                         //
    })));                                                                                                         //
  }                                                                                                               //
});                                                                                                               //
                                                                                                                  //
if (h.nk(Meteor.settings, "public.env") != "live") RC.Swipe.Help = {                                              // 643
  Type: "Unique/Canvas",                                                                                          // 645
  PropTypes: {                                                                                                    // 646
    startSlide: "Number",                                                                                         // 647
    speed: "Number",                                                                                              // 648
    callback: "Function",                                                                                         // 649
    continuous: "Boolean"                                                                                         // 650
  },                                                                                                              //
  Description: "Creates multiple canvas components that can be swiped between each other (for navigation)."       // 652
};                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/ihealth_framework-mobile/RC/leftNav/leftNav.jsx                                                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  //
RC.LeftNav = React.createClass({                                                                                  // 2
  displayName: "LeftNav",                                                                                         //
                                                                                                                  //
  getInitialState: function () {                                                                                  // 3
    return {                                                                                                      // 4
      closing: false,                                                                                             // 5
      isOpen: this.props.openOnInit                                                                               // 6
    };                                                                                                            //
  },                                                                                                              //
  open: function () {                                                                                             // 9
    if (!this.state.closing) this.setState({ isOpen: true });                                                     // 10
  },                                                                                                              //
  close: function () {                                                                                            // 13
    var self = this;                                                                                              // 14
    this.setState({ closing: true });                                                                             // 15
    Meteor.setTimeout(function () {                                                                               // 16
      self.setState({ isOpen: false, closing: false });                                                           // 17
    }, 400);                                                                                                      //
  },                                                                                                              //
  linkClickHandler: function (e) {                                                                                // 20
    if (e.target.href) this.close();                                                                              // 21
  },                                                                                                              //
  render: function () {                                                                                           // 24
                                                                                                                  //
    if (!this.state.isOpen) return null;                                                                          // 26
                                                                                                                  //
    return React.createElement(                                                                                   // 28
      "nav",                                                                                                      //
      { className: "transition left-nav fixed-full " + (this.state.closing ? "out" : "in") },                     //
      React.createElement("div", { className: "back abs-full", onClick: this.close }),                            //
      React.createElement(                                                                                        //
        "div",                                                                                                    //
        { className: "inner bg-white scroll", onClick: this.linkClickHandler },                                   //
        React.createElement("div", { onClick: this.props.toggleNavFunc }),                                        //
        React.createElement(RC.NavList, { list: this.props.navList, showCurrent: false })                         //
      )                                                                                                           //
    );                                                                                                            //
  }                                                                                                               //
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/ihealth_framework-mobile/RC/leftNav/leftNav2.jsx                                                      //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  //
RC.LeftNav2 = React.createClass({                                                                                 // 2
    displayName: 'LeftNav2',                                                                                      //
                                                                                                                  //
    getInitialState: function () {                                                                                // 3
        return {                                                                                                  // 4
            closing: false,                                                                                       // 5
            isOpen: this.props.openOnInit                                                                         // 6
        };                                                                                                        //
    },                                                                                                            //
    open: function () {                                                                                           // 9
        if (!this.state.closing) this.setState({ isOpen: true });                                                 // 10
    },                                                                                                            //
    close: function () {                                                                                          // 13
        var self = this;                                                                                          // 14
        this.setState({ closing: true });                                                                         // 15
        Meteor.setTimeout(function () {                                                                           // 16
            self.setState({ isOpen: false, closing: false });                                                     // 17
        }, 400);                                                                                                  //
    },                                                                                                            //
    //linkClickHandler(e) {                                                                                       //
    //    if (e.target.href)                                                                                      //
    //        this.close()                                                                                        //
    //},                                                                                                          //
                                                                                                                  //
    ///////////////actions//////                                                                                  //
    /*                                                                                                            //
    *!!! Should not change private state directly                                                                 //
    *!!! must according to store.                                                                                 //
    * */                                                                                                          //
    action_close: function () {                                                                                   // 30
        Dispatcher.dispatch({ actionType: 'LEFT_NAV_CLOSE' });                                                    // 31
    },                                                                                                            //
    action_linkClickHandler: function (e) {                                                                       // 33
        if (e.target.href) {                                                                                      // 34
            Dispatcher.dispatch({ actionType: 'LEFT_NAV_CLOSE' });                                                // 35
        }                                                                                                         //
    },                                                                                                            //
                                                                                                                  //
    ////////////////////////////////////////                                                                      //
    //@@@ Sync parent props and private state                                                                     //
    // property is the only entry to update the private status                                                    //
    componentWillReceiveProps: function (nextProps) {                                                             // 42
                                                                                                                  //
        if (nextProps.openOnInit == false) {                                                                      // 44
            this.close();                                                                                         // 45
        } else if (nextProps.openOnInit == true) {                                                                //
            this.open();                                                                                          // 47
        }                                                                                                         //
    },                                                                                                            //
                                                                                                                  //
    render: function () {                                                                                         // 51
        if (!this.state.isOpen) return null;                                                                      // 52
                                                                                                                  //
        return React.createElement(                                                                               // 54
            'nav',                                                                                                //
            { className: "transition left-nav fixed-full " + (this.state.closing ? "out" : "in") },               //
            React.createElement('div', { className: 'back abs-full', onClick: this.action_close }),               //
            React.createElement(                                                                                  //
                'div',                                                                                            //
                { className: 'inner bg-white scroll', onClick: this.action_linkClickHandler },                    //
                React.createElement('div', { onClick: this.props.toggleNavFunc }),                                //
                React.createElement(RC.NavList, { list: this.props.navList, showCurrent: false })                 //
            )                                                                                                     //
        );                                                                                                        //
    }                                                                                                             //
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:framework-mobile'] = {
  RC: RC
};

})();
