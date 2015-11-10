/*global cordova, module*/
var PoManagerCordova = function() {};  

PoManagerCordova.prototype.startDiscovery = function(successCallback, errorCallback, appsecret) {  
    cordova.exec(successCallback, errorCallback, "PoManagerCordova", "startDiscovery", [appsecret]);
};

PoManagerCordova.prototype.stopDiscovery = function(successCallback, errorCallback, appsecret) {  
    cordova.exec(successCallback, errorCallback, "PoManagerCordova", "stopDiscovery", [appsecret]);
};

PoManagerCordova.prototype.connectDevice = function(successCallback, errorCallback, appsecret, mac) {
    cordova.exec(successCallback, errorCallback, "PoManagerCordova", "connectDevice", [appsecret, mac]);
};

PoManagerCordova.prototype.startMeasure = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "PoManagerCordova", "startMeasure", [appsecret, mac]);
}; 
PoManagerCordova.prototype.getOfflineData = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "PoManagerCordova", "getOfflineData", [appsecret, mac]);
}; 

PoManagerCordova.prototype.getBattery = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "PoManagerCordova", "getBattery", [appsecret, mac]);
};  
PoManagerCordova.prototype.getIDPS = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "PoManagerCordova", "getIDPS", [appsecret, mac]);
};
  
PoManagerCordova.prototype.disConnectDevice = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "PoManagerCordova", "disConnectDevice", [appsecret, mac]);
};

PoManagerCordova.prototype.setDisconnectCallback = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "PoManagerCordova", "setDisconnectCallback", [appsecret, mac]);
};

var poManagerCordova = new PoManagerCordova();  
module.exports = poManagerCordova; 
