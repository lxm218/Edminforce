/*global cordova, module*/
var AmManagerCordova = function() {};  
  
AmManagerCordova.prototype.startDiscovery = function(successCallback, errorCallback, appsecret) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "startDiscovery", [appsecret]);
};

AmManagerCordova.prototype.stopDiscovery = function(successCallback, errorCallback, appsecret) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "stopDiscovery", [appsecret]);
};

AmManagerCordova.prototype.connectDevice = function(successCallback, errorCallback, appsecret, mac) {
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "connectDevice", [appsecret, mac]);
}

AmManagerCordova.prototype.resetDevice = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "resetDevice", [appsecret, mac]);
};

AmManagerCordova.prototype.getUserId = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getUserId", [appsecret, mac]);
};

AmManagerCordova.prototype.setUserId = function(successCallback, errorCallback, appsecret, mac, userId) {  

    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "setUserId", [appsecret, mac, userId]);
};

AmManagerCordova.prototype.setUserMessage = function(successCallback, errorCallback, appsecret, mac, age, weight, height, sex, lengthType, activityLevel, target, hourType) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "setUserMessage", [appsecret, mac, age, weight, height, sex, lengthType, activityLevel, target, hourType]);
};
 
AmManagerCordova.prototype.getUserMessage = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getUserMessage", [appsecret, mac]);
};  

AmManagerCordova.prototype.getClocktotal = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getClocktotal", [appsecret, mac]);
};  

AmManagerCordova.prototype.getClockDetail = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getClockDetail", [appsecret, mac]);
}; 

AmManagerCordova.prototype.setClock = function(successCallback, errorCallback, appsecret, mac, id, hour, min, repeat, weeks, open) {  

    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "setClock", [appsecret, mac, id, hour, min, repeat, weeks, open]);
}; 

AmManagerCordova.prototype.deleteClock = function(successCallback, errorCallback, appsecret, mac, clockID) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "deleteClock", [appsecret, mac, clockID]);
}; 

AmManagerCordova.prototype.getRemind = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getRemind", [appsecret, mac]);
}; 

AmManagerCordova.prototype.setRemind = function(successCallback, errorCallback, appsecret, mac, time, switchs) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "setRemind", [appsecret, mac, time, switchs]);
}; 

AmManagerCordova.prototype.getActivityMessage = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getActivityMessage", [appsecret, mac]);
};

AmManagerCordova.prototype.getSleepMessage = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getSleepMessage", [appsecret, mac]);
}; 

AmManagerCordova.prototype.getBattery = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getBattery", [appsecret, mac]);
}; 

AmManagerCordova.prototype.getRealTimeMessage = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getRealTimeMessage", [appsecret, mac]);
}; 

AmManagerCordova.prototype.getHourType = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getHourType", [appsecret, mac]);
};

AmManagerCordova.prototype.setHourType = function(successCallback, errorCallback, appsecret, mac, hourType) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "setHourType", [appsecret, mac, hourType]);
};

AmManagerCordova.prototype.setRandom = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "setRandom", [appsecret, mac]);
};

AmManagerCordova.prototype.getStageMessage = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getStageMessage", [appsecret, mac]);
};

AmManagerCordova.prototype.disConnectDevice = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "disConnectDevice", [appsecret, mac]);
};

AmManagerCordova.prototype.setDisconnectCallback = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "setDisconnectCallback", [appsecret, mac]);
};
AmManagerCordova.prototype.getIDPS = function(successCallback, errorCallback, appsecret, mac) {  
    cordova.exec(successCallback, errorCallback, "AmManagerCordova", "getIDPS", [appsecret, mac]);

};

var amManagerCordova = new AmManagerCordova();  
module.exports = amManagerCordova; 
