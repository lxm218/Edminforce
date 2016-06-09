getFormat = function(relativeLevel) {
  switch (relativeLevel) {
  case 5:
    formatting = {
      styles: ['underline'],
      color: 'red',
      bgc: 'yellow'
    }
    break;
  case 4:
    formatting = {
      color: Meteor.isServer ? 'red' : 'yellow',
      bgc: Meteor.isServer ? 'white' : 'black'
    }
    break;
  case 3:
    formatting = {
      styles: ['underline'],
      color: 'red',
    }
    break;
  case 2:
    formatting = {
      color: Meteor.isServer ? 'yellow' : 'blue'
    }
    break;
  case 1:
    formatting = {
      color: 'green',
    }
    break;
  default:
    formatting = {
      styles: Meteor.isServer ? ['reset'] : []
    }
  }
  return formatting;
}

DevTools.colorConsole = function() {
  var messagesRaw = Array.prototype.slice.call(arguments);
  var relativeLevel = messagesRaw[0]; // emphasis strength
  var messages = messagesRaw.slice(1).join("");
  var formatting = getFormat(relativeLevel);
  if (Meteor.isClient) {
    console.log("%c" + messages , DevTools.browserStyle(formatting));
  } else {
    console.log(DevTools.terminalStyle(formatting), messages, DevTools.terminalStyle({styles: ['reset']}));
  }
}

// call debugL(3) to make it a Level 3 debug console.log function
DevTools.consoleWithLevels = function(levelFilter, debugLevel) {
  return function() {
    // turn arguments into an array
    var messagesRaw = Array.prototype.slice.call(arguments)

    if(messagesRaw.length > 0) {
      // show variable type
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
      // print only if the user wants to see this level of debugging comments
      if (levelFilter >= debugLevel) {
        // remove 'debug' being printed over and over
        // var debugLine = "debug" + debugLevel + " - "
        // messagesMapped.unshift(debugLine, messagesRaw[0])
        messagesMapped.unshift(messagesRaw[0]);

        // var log = Function.prototype.bind.call(console.log, console);
        // log.apply(console, messagesMapped);

        // use color to emphasize different levels of debug comments
        var relativeLevel = levelFilter - debugLevel;
        DevTools.colorConsole(relativeLevel, messagesMapped);
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
