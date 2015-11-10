# Cordova iHealth Plugin for Am3s

This is a cordova plugin for ihealth Am3s.

## Using Cordova plugins directly in your meteor application

### Add the plugin

    $ meteor add cordova:com.ihealth.plugin.am.ammanagercordova@https://github.com/iHealthLab/plugin-ihealth-am/tarball/76887d62db0115ad0e31fcffef04e61f866cd981


### Remove the plugin

    $ meteor remove cordova:com.ihealth.plugin.ammanagercordova

    
AmManagerCordova.startDiscovery(mac, success, failure, ""); 
 > {"address":"004D3202AD11","msg":"discovery doing","name":"AM3S"}
 {"address":"004D3202AD11","msg":"connecting"}


AmManagerCordova.stopDiscovery(mac, success, failure);
> {"address":"004D3202AD11","msg":"discovery doned"}

AmManagerCordova.connectDevice(mac, success, failure);
> {"address":"004D3202AD11","msg":"connected"}

AmManagerCordova.resetDevice(mac, success, failure);

AmManagerCordova.getUserId(mac, success, failure);
> {"value":"264674","address":"004D3202AD11","msg":"user id"}

AmManagerCordova.setUserId(mac, success, failure, userId);

AmManagerCordova.setUserMessage(mac, success, failure, age, weight, height, sex, lengthType, activityLevel, target, hourType);

AmManagerCordova.getUserMessage(mac, success, failure);
> {"value":"{\"target3\":\"0\",\"target2\":\"0\",\"sex\":\"0\",\"target1\":\"0\",\"weight\":\"5.47\",\"height\":\"160\",\"weightUnit\":\"0\",\"age\":\"24\",\"step\":\"72\"}","address":"004D3202AD11","msg":"user info"}

AmManagerCordova.getClocktotal(mac, success, failure);

AmManagerCordova.getClockDetail(mac, success, failure);

AmManagerCordova.setClock(mac, success, failure, id, hour, min, repeat, weeks, open);

AmManagerCordova.deleteClock(mac, success, failure);

AmManagerCordova.getRemind(mac, success, failure)

AmManagerCordova.setRemind(mac, success, failure);

AmManagerCordova.getActivityMessage(mac, success, failure);
> {"value":["{\"activity\":[{\"calorie\":\"0\",\"step\":\"0\",\"time\":\"2015-8-13 15:7:00\"},{\"calorie\":\"0\",\"step\":\"0\",\"time\":\"2015-8-13 15:12:00\"}]}"],"address":"004D3202AD11","msg":"activity"}


AmManagerCordova.getSleepMessage(mac, success, failure);
> {"value":["{\"sleep\":[]}"],"address":"004D320265E7","msg":"sleep"}

AmManagerCordova.getBattery(mac, success, failure);

AmManagerCordova.getRealTimeMessage(mac, success, failure);

AmManagerCordova.getHourType(mac, success, failure);
>  {"value":"0","address":"004D320265E7","msg":"hour"}

AmManagerCordova.setHourType(mac, success, failure);

AmManagerCordova.setRandom(mac, success, failure);

AmManagerCordova.getStageMessage(mac, success, failure);

AmManagerCordova.getPicture(mac, success, failure);
> {"value":1,"address":"004D320265E7","msg":"picture"}

AmManagerCordova.setPicture(mac, success, failure);



#AM

####(1)startDiscovery
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" discovery doing","address":"8CDE52143F1E","name":"AM3S"}
####(2) stopDiscovery
function(successCallback, errorCallback, appsecret, mac)

ios Without this feature

CallBack：

{"msg":" discovery done "}
####(3) connectDevice
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" connected ","address":"8CDE52143F1E","name":"HS4"}
####(4) getIDPS
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" IDPS","HardwareVersion" : "1.0.0", "name" : "HS4", "address" : "8CDE5208B9ED",  "FirmwareVersion" : "1.0.0" }
####(5) resetDevce
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" resetDevice","address" : "8CDE5208B9ED"}
####(6) getUserId
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" user id","address" : "8CDE5208B9ED","value" : 10}
####(7) setUserId
function(successCallback, errorCallback, appsecret, mac, userId)

CallBack：

{"msg":" setUserIdOK","address" : "8CDE5208B9ED"}

####(8) setUserMessage
function(successCallback, errorCallback, appsecret, mac, age, weight, height, sex, lengthType, activityLevel, target, hourType)

CallBack：

{"msg":" setUserMessageOK","address" : "8CDE5208B9ED"}
####(9) getUserMessage
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" user info","address" : "8CDE5208B9ED","value" : {"Height" : 180,"Gender" : 1,"Weight" : 1330,"TotalStep1" : 4135,"TotalStep2" : 34835,"TotalStep3" : 50185,"Step" : 81,"Unit" : 1,"Age" : 26}}
####(10) getClocktotal
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" alarmlock number","address" : "8CDE5208B9ED","value" : 10}
####(11) getClockDetail
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" alarmclock detail","address" : "8CDE5208B9ED","value" : {"AlarmId" : "11"," Switch " : true, " IsRepeat " : true }}
####(12) setClock
function(successCallback, errorCallback, appsecret, mac, id, hour, min, repeat, weeks, open)

CallBack：

{"msg":"setClockOK","address" : "8CDE5208B9ED"}
####(13) deleteClock
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" deleteClockOK","address" : "8CDE5208B9ED"}
####(14) getRemind
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" remindInfo","address" : "8CDE5208B9ED","value" : [{"Switch" : false,"Time" : "00:00"}]}

####(15) getActivityMessage
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"value":["{"activity":[{"calorie":"0","step":"0","time":"2015-8-13 15:7:00"},{"calorie":"0","step":"0","time":"2015-8-13 15:12:00"}]}"],"address":"004D3202AD11","msg":"activity"}
####(16) getSleepMessage
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" sleep","address" : "8CDE5208B9ED","value" : []}

####(17) getRealTimeMessage
function(successCallback, errorCallback, appsecret, mac)
CallBack：
{"msg":" realtime","address" : "8CDE5208B9ED","value" : []}

####(18) getHourType
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" getHourType","address" : "8CDE5208B9ED","value" : 1}

####(19) setHourType
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" setHourTypeOK","address" : "8CDE5208B9ED"}

####(20) setRandom
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" setRandomOK","address" : "8CDE5208B9ED"}
####(21) getStageMessage
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" stage forms","address" : "8CDE5208B9ED","value" : 1}

####(22) getPicture
function(successCallback, errorCallback, appsecret, mac)
CallBack：
{"msg":" picture","address" : "8CDE5208B9ED","value" : 1}

####(23) setPicture
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" setPictureOK","address" : "8CDE5208B9ED"}

####(24) getBattery
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" setPictureOK","address" : "8CDE5208B9ED","value" : 1}

####(25) disConnectDevice
function(successCallback, errorCallback, appsecret, mac)

ios Without this feature

CallBack：

{"msg":" disconnect","address":"8CDE52143F1E","name":"AM3S"}
####(26) setDisconnectCallback

function(successCallback, errorCallback, appsecret, mac)

NO CallBack


##AM3S error ID and related instructions

CallBack：

{"msg":"error","errorID" : 1, "ProductType" : "AM", "ProductModel" : "AM3S", "address" : "8CDE5208B9ED"}
Error ID：                              
                  
                         
0：AMErrorOverTime

400：No Device

500：The instruction is still in execution

600：The input parameter errors 

700: unauthorized

800：Does not support


 
