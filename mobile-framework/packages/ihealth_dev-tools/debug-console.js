DevTools = {}

// call debugL(3) to make it a Level 3 debug console.log function
DevTools.consoleWithLevels = function(levelFilter, debugLevel) {
  return function() {
    var messagesRaw = Array.prototype.slice.call(arguments)
    if(messagesRaw.length > 0) {
      var messagesMapped = messagesRaw.slice(1).map(function(message) {
        if (typeof(message) === "string") {
          return (message)
          // return ("string: " + message)
        } else {
          // only show Object type for debugLevel > 3
          if(debugLevel>3) {
            var objectType = Object.prototype.toString.call(message) + ": "
          }

          // Get the deep size of an object
          if (_.isObject(message) && DevTools.getObjSize(message)>3) {
            var jsonString = JSON.stringify(message, null, 2)
          } else {
            var jsonString = JSON.stringify(message)
          }
          return (objectType + jsonString);
        }
      })
      if (levelFilter >= debugLevel) {
        var debugLine = "debug" + debugLevel + " - "
        messagesMapped.unshift(debugLine, messagesRaw[0])

        var log = Function.prototype.bind.call(console.log, console);
        log.apply(console, messagesMapped);
      }
    }
  }
}

// Get the deep size of an object
DevTools.getObjSize = function(obj0) {
  // console.log('obj0', obj0, typeof(obj0));
  var getObjSizeF = function(obj) {
    // console.log('obj', obj);
    var sizes = _.map(_.pairs(obj), function(pair) {
      var key = _.first(pair)
      var val = _.last(pair)
      // console.log('key val', key, val);
      if (_.isObject(obj[key])) {
        return 1+getObjSizeF(obj[key])
      } else {
        return 1
      }
    })
  // console.log('sizes', sizes)
  var totalsize = _.reduce(sizes, function(a,b) {return a+b}, 0)
  return totalsize ;
  }
  var result = getObjSizeF(obj0);
  // console.log('result', result);
  return result;
};
