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
          return (Object.prototype.toString.call(message) + ": " + JSON.stringify(message))
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
