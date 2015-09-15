var self = {};
this.DbTools = self;

var levelFilter = 2
var debugL = _.partial(DevTools.consoleWithLevels, levelFilter)

self.renameKeys = function(keyDict, obj) {
  var keys, newKeys, newObj, oldKey, renameKey, values, _i, _len;
  keys = _.keys(obj);
  values = _.values(obj);
  renameKey = function(oldKey) {
    var newKey = keyDict[oldKey];
    debugL(4)("oldKey ", oldKey, " to ", newKey);
    return newKey != null ? newKey : oldKey;
  };
  newKeys = [];
  for (i = 0; i < keys.length; i++) {
    oldKey = keys[i];
    newKeys[i] = renameKey(oldKey);
  }
  newObj = _.object(newKeys, values);
  return _.object(newKeys, values);
};

self.bpResultKeyMap = {
  address: 'deviceAddress',
  name: 'deviceModel',
  heartrate: 'heartRate',
  lowpressure: 'diastolic',
  highpressure: 'systolic',
  pressure: 'finalPressure',
  wave: 'finalWave'
};

self.addType = function(obj) {
  obj.deviceType = obj.deviceModel.substring(0, 2);
  return obj
};
