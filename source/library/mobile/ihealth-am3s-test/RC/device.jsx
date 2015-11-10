
var debugLevel = 2
var debugL = _.partial(DevTools.consoleWithLevels, debugLevel);

var getLocalPath = function (localPath) {
  return cordova.file.applicationDirectory.replace('file://', '').replace(/%20/g,' ') + 'www/application/' + localPath.substr(1);
};

var cb = function(tag) {
  return function(a) {
  // console.log(tag, a)
  }
}

IH.RC.pluginCall = function(deviceSelected, pluginLabel, commandName, args, successCB0, statusUpdatesCB) {
  let plugin = window[pluginLabel];

  let addDesc = function(desc, m0) {
    let r = m0 ? desc + ' - ' + m0 : desc
    return r;
  };

  let addTS = function(m0) {
    return (new Date).toLocaleTimeString() + ': ' + m0;
  };

  let consoleCB = function(desc, messageRaw) {
    let message = addTS(addDesc(desc,messageRaw));
    debugL(3)(message);
    if(statusUpdatesCB) statusUpdatesCB(message); // optional
  };

  var successCB = function(m) {
    consoleCB(commandName + ' success', m);
    if (successCB0) successCB0(m);
  };

  consoleCB(commandName + "...");

  var argsArray = [successCB, consoleCB.bind(null, commandName + ' failure'), '123456', deviceSelected].concat(args || []);
  // (pluginLabel === 'BpManagerCordova')
  //   ? [deviceSelected, successCB, consoleCB.bind(null, commandName + ' failure')].concat(args || [])
  //   : [successCB, consoleCB.bind(null, commandName + ' failure'), '123456', deviceSelected].concat(args || [])
  // debugL(2)(commandName + ' argsArray: ' + argsArray);
  plugin[commandName].apply(plugin, argsArray);
};

let packageName = 'ihealth_am3s'


DeviceRC.playAudio = function(soundName) {
  if(Meteor.isCordova) {
    var sone = new Media(getLocalPath('/packages/'+packageName+'/assets/audio/'+soundName),cb('success ' + getLocalPath('/assets/audio/'+soundName)), cb('fail ' + soundName), cb('status ', soundName))
  } else {
    var sone = new Audio('/packages/'+packageName+'/assets/audio/'+soundName,cb('success '+ soundName), cb('fail '+ soundName), cb('status '+ soundName))
  }
  sone.play()
}
