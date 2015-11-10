/*global cordova, module*/
var HsManagerCordova = function() {};  
  
HsManagerCordova.prototype.startDiscovery = function(successCallback, errorCallback, appsecret) {  
    cordova.exec(successCallback, errorCallback, "HsManagerCordova", "startDiscovery", [appsecret]);
};

HsManagerCordova.prototype.stopDiscovery = function(successCallback, errorCallback, appsecret) {  
    cordova.exec(successCallback, errorCallback, "HsManagerCordova", "stopDiscovery", [appsecret]);
};

HsManagerCordova.prototype.connectDevice = function(successCallback, errorCallback, appsecret, mac) {
    cordova.exec(successCallback, errorCallback, "HsManagerCordova", "connectDevice", [appsecret, mac]);
};

HsManagerCordova.prototype.startMeasure = function(successCallback, errorCallback, appsecret, unit) {  
    cordova.exec(successCallback, errorCallback, "HsManagerCordova", "startMeasure", [appsecret,mac, unit]);

}; 

HsManagerCordova.prototype.getOfflineData = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "HsManagerCordova", "getOfflineData", [appsecret, mac]);
};  
  
HsManagerCordova.prototype.disConnectDevice = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "HsManagerCordova", "disConnectDevice", [appsecret, mac]);
};

HsManagerCordova.prototype.setDisconnectCallback = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "HsManagerCordova", "setDisconnectCallback", [appsecret, mac]);

};
HsManagerCordova.prototype.getIDPS = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "HsManagerCordova", "getIDPS", [appsecret, mac]);

};

var hsManagerCordova = new HsManagerCordova();  
module.exports = hsManagerCordova; 
