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

/* Package-scope variables */
var React, ReactLayout;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/kadira_react-layout/lib/react_layout.js                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
if(Package['react-runtime']) {                                       // 1
  React = Package['react-runtime'].React;                            // 2
}                                                                    // 3
                                                                     // 4
ReactLayout = {};                                                    // 5
ReactLayout._domLoaded = false;                                      // 6
                                                                     // 7
ReactLayout._getRootNode = function() {                              // 8
  var rootNode = document.getElementById('react-root');              // 9
                                                                     // 10
  if(rootNode) {                                                     // 11
    return rootNode;                                                 // 12
  } else {                                                           // 13
    rootNode = document.createElement("div");                        // 14
    rootNode.id = "react-root";                                      // 15
    document.getElementsByTagName('body')[0].appendChild(rootNode);  // 16
    return rootNode;                                                 // 17
  }                                                                  // 18
};                                                                   // 19
                                                                     // 20
ReactLayout.render = function(layoutClass, regions) {                // 21
  if(Meteor.isClient) {                                              // 22
    return ReactLayout._renderClient(layoutClass, regions);          // 23
  } else {                                                           // 24
    return ReactLayout._renderServer(layoutClass, regions);          // 25
  }                                                                  // 26
};                                                                   // 27
                                                                     // 28
ReactLayout._renderServer = function(layoutClass, regions) {         // 29
  var el = React.createElement(layoutClass, regions);                // 30
  var html = React.renderToString(el);                               // 31
                                                                     // 32
  if(Package['kadira:flow-router-ssr']) {                            // 33
    var FlowRouter = Package['kadira:flow-router-ssr'].FlowRouter;   // 34
    var ssrContext = FlowRouter.ssrContext.get();                    // 35
    ssrContext.setHtml(html);                                        // 36
  }                                                                  // 37
};                                                                   // 38
                                                                     // 39
ReactLayout._renderClient = function(layoutClass, regions) {         // 40
  this._ready(function() {                                           // 41
    var rootNode = ReactLayout._getRootNode();                       // 42
    var el = React.createElement(layoutClass, regions);              // 43
    React.render(el, rootNode);                                      // 44
  });                                                                // 45
};                                                                   // 46
                                                                     // 47
ReactLayout._ready = function(cb) {                                  // 48
  var self = this;                                                   // 49
  if(self._domLoaded) {                                              // 50
    cb();                                                            // 51
    return;                                                          // 52
  }                                                                  // 53
                                                                     // 54
  // wait for DOM is loading                                         // 55
  Meteor.startup(function() {                                        // 56
    setTimeout(function() {                                          // 57
      cb();                                                          // 58
      self._domLoaded = true;                                        // 59
    }, 0);                                                           // 60
  });                                                                // 61
};                                                                   // 62
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['kadira:react-layout'] = {
  ReactLayout: ReactLayout
};

})();
