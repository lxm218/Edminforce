/*global cordova, module*/
var BgManagerCordova = function() {};  
  
BgManagerCordova.prototype.startDiscovery = function(successCallback, errorCallback, appsecret) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "startDiscovery", [appsecret]);
};

BgManagerCordova.prototype.stopDiscovery = function(successCallback, errorCallback, appsecret) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "stopDiscovery", [appsecret]);
};

BgManagerCordova.prototype.startMeasure = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "startMeasure", [appsecret, mac]);
}; 

BgManagerCordova.prototype.connectDevice = function(successCallback, errorCallback, appsecret, mac) {
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "connectDevice", [appsecret, mac]);
};

BgManagerCordova.prototype.setUnit = function(successCallback, errorCallback, appsecret, mac, type) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "setUnit", [appsecret, mac, type]);
}; 

BgManagerCordova.prototype.getBattery = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "getBattery", [appsecret, mac]);
};  

BgManagerCordova.prototype.setBottleId = function(successCallback, errorCallback, appsecret, mac, bottleId) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "setBottleId", [appsecret, mac, bottleId]);
}; 

BgManagerCordova.prototype.getBottleId = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "getBottleId", [appsecret, mac]);
};

BgManagerCordova.prototype.setBottleMessage = function(successCallback, errorCallback, appsecret, mac, qr, leftNum, time) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "setBottleMessage", [appsecret, mac, qr, leftNum, time]);
}; 

BgManagerCordova.prototype.getBottleMessage = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "getBottleMessage", [appsecret, mac]);
};

BgManagerCordova.prototype.getOfflineData = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "getOfflineData", [appsecret, mac]);
};

BgManagerCordova.prototype.deleteOfflineData = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "deleteOfflineData", [appsecret, mac]);
};
  
BgManagerCordova.prototype.disConnectDevice = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "disConnectDevice", [appsecret, mac]);
};

BgManagerCordova.prototype.setDisconnectCallback = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "setDisconnectCallback", [appsecret, mac]);
};

BgManagerCordova.prototype.holdLink = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "holdLink", [appsecret, mac]);
};

BgManagerCordova.prototype.codeStripStrAnalysis = function(successCallback, errorCallback, appsecret, mac,codeStr) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "codeStripStrAnalysis", [appsecret, mac,codeStr]);
};

BgManagerCordova.prototype.getIDPS = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "BgManagerCordova", "getIDPS", [appsecret, mac]);

};

var bgManagerCordova = new BgManagerCordova();  
module.exports = bgManagerCordova; 
