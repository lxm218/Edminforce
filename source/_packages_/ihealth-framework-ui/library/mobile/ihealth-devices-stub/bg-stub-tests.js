var levelFilter = 4;
var debugL = _.partial(DevTools.consoleWithLevels, levelFilter);
var cbSuccess = debugL(2);
var sendMessages = DevicesStub.sendMessages;
var testaddress = "";
var noaddress = null;
var cb = function(functionName) {
  return function(message){
    debugL(2)(functionName + ': ' + message);
  }
};

Tinytest.add('BG no address', function (test) {
  var functionName = 'startDiscovery';
  DevicesStub.BG5.startDiscovery(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'stopDiscovery';
  DevicesStub.BG5.stopDiscovery(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'startMeasure';
  DevicesStub.BG5.startMeasure(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'connectDevice';
  DevicesStub.BG5.connectDevice(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'getBattery';
  DevicesStub.BG5.getBattery(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'disConnectDevice';
  DevicesStub.BG5.disConnectDevice(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));
  
  test.equal(true,true);
});
