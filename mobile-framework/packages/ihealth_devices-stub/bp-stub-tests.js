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

Tinytest.add('BP no address', function (test) {
  var functionName = 'startDiscovery';
  DevicesStub.BP.startDiscovery(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'stopDiscovery';
  DevicesStub.BP.stopDiscovery(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'startMeasure';
  DevicesStub.BP.startMeasure(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'stopMeasure';
  DevicesStub.BP.stopMeasure(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'connectDevice';
  DevicesStub.BP.connectDevice(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'enableOffline';
  DevicesStub.BP.enableOffline(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'disenableOffline';
  DevicesStub.BP.disenableOffline(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'getOfflineNum';
  DevicesStub.BP.getOfflineNum(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'getOfflineData';
  DevicesStub.BP.getOfflineData(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'getBattery';
  DevicesStub.BP.getBattery(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'isEnableOffline';
  DevicesStub.BP.isEnableOffline(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'disConnectDevice';
  DevicesStub.BP.disConnectDevice(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));

  var functionName = 'confirmAngle';
  DevicesStub.BP.confirmAngle(noaddress, cb(functionName + ' success'), cb(functionName + ' fail'));
  test.equal(true,true);
});
