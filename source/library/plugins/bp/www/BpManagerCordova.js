/*global cordova, module*/
var BpManagerCordova = function() {};  
  
BpManagerCordova.prototype.startDiscovery = function(successCallback, errorCallback, appsecret) {     
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "startDiscovery", [appsecret]);
};

BpManagerCordova.prototype.stopDiscovery = function(successCallback, errorCallback, appsecret) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "stopDiscovery", [appsecret]);
};

BpManagerCordova.prototype.startMeasure = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "startMeasure", [appsecret, mac]);
}; 

BpManagerCordova.prototype.stopMeasure = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "stopMeasure", [appsecret, mac]);
}; 
BpManagerCordova.prototype.connectDevice = function(successCallback, errorCallback, appsecret, mac) {
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "connectDevice", [appsecret, mac]);
}

BpManagerCordova.prototype.enableOffline = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "enableOffline", [appsecret, mac]);
}; 

BpManagerCordova.prototype.disenableOffline = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "disenableOffline", [appsecret, mac]);
};  

BpManagerCordova.prototype.getOfflineNum = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "getOfflineNum", [appsecret, mac]);
}; 

BpManagerCordova.prototype.getOfflineData = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "getOfflineData", [appsecret, mac]);
};

BpManagerCordova.prototype.getBattery = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "getBattery", [appsecret, mac]);
};

BpManagerCordova.prototype.isEnableOffline = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "isEnableOffline", [appsecret, mac]);
};
  
BpManagerCordova.prototype.disConnectDevice = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "disConnectDevice", [appsecret, mac]);
};

BpManagerCordova.prototype.setDisconnectCallback = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "setDisconnectCallback", [appsecret, mac]);
};

BpManagerCordova.prototype.confirmAngle = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "confirmAngle", [appsecret, mac]);
};
BpManagerCordova.prototype.getIDPS = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BpManagerCordova", "getIDPS", [appsecret, mac]);
};

var bpManagerCordova = new BpManagerCordova();  
module.exports = bpManagerCordova; 
