# Cordova iHealth Plugin for Bg5

This is a cordova plugin for ihealth bg5.

## Using Cordova plugins directly in your meteor application

### Add the plugin

    $ meteor add cordova:com.ihealth.plugin.bgmanagercordova@https://github.com/iHealthLab/plugin-ihealth-bg/tarball/e4a92ef777a092fb4a8890c5f8441be28ea2f024


### Remove the plugin

    $ meteor remove cordova:com.ihealth.plugin.bgmanagercordova
    


#BG

####(1)startDiscovery
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" discovery doing","address":"8CDE52143F1E","name":"BG5"}
####(2) stopDiscovery
function(successCallback, errorCallback, appsecret, mac)

ios Without this feature

CallBack：

{"msg":" discovery done "}
####(3) connectDevice
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" connected ","address":"8CDE52143F1E","name":"BG5"}
####(4) getIDPS
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" IDPS","HardwareVersion" : "1.0.0", "name" : "BG5", "address" : "8CDE5208B9ED",  "FirmwareVersion" : "3.0.0" }
####(5) setUnit
function(successCallback, errorCallback, appsecret, mac, type)

CallBack：

{"msg":" setUnit","address":"8CDE52143F1E"}
####(6) setBottleId
function(successCallback, errorCallback, appsecret, mac, bottleId)

CallBack：

{"msg":" setBottleId","address":"8CDE52143F1E"}
####(7) getBottleId
function(successCallback, errorCallback, appsecret, mac, bottleId)

CallBack：

{"msg":" bottleID","address":"8CDE52143F1E", "bottleID" : 4134}
####(8) setBottleMessage
function(successCallback, errorCallback, appsecret, mac, qr, leftNum, time)

CallBack：

{"msg":" setBottleMessage","address":"8CDE52143F1E"}

// BGOpenMode = 1   BGOpenMode_Strip,
//  BGOpenMode = 2    BGOpenMode_Hand

{"msg":"setBottleMessage","address":"8CDE52143F1E","BGOpenMode":1}
####(9) getBottleMessage
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" code","address":"8CDE52143F1E", "bottleID" : 4134, "leftnum" :1, "expiretime" : 02 30 2014}
####(10) getBattery
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" battery","address":"8CDE52143F1E", "battery" : 10}
####(11) getOfflineData
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" historyDataCount","address":"8CDE52143F1E", "historyDataCount" : 10}

{"msg":" historyData","address":"8CDE52143F1E", "history" : [{_"Result" :13,_"Date" : "2015,8,15,23,13"}] }
#(12) deleteOfflineData
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" deleteOfflineData","address":"8CDE52143F1E"}
####(13) holdLink
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" holdLink","address":"8CDE52143F1E"}
####(14) startMeasure
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" strip in","address":"8CDE52143F1E"}

{"msg":" get blood","address":"8CDE52143F1E"}

{"msg":" value","address":"8CDE52143F1E", " value " : 10}
####(15) disConnectDevice
function(successCallback, errorCallback, appsecret, mac)

ios Without this feature

CallBack：

{"msg":" disconnect","address":"8CDE52143F1E","name":"BP5"}
#(16) setDisconnectCallback
function(successCallback, errorCallback, appsecret, mac)

NO CallBack

##BG5 error ID and related instructions

CallBack：

{"msg":"error","errorID" : 1, "ProductType" : "BG", "ProductModel" : "BG5", "address" : "8CDE5208B9ED"}
Error ID：                
            
                         
0：Battery is low.

1：Glucose test result is out of the measurement range.

2：Unknown interference detected, please repeat the test.

3：Strip is used or unknown moisture detected, discard the test strip and repeat the test with a new strip.

4：Reading transmission error. Repeat the test with a new test strip. If the problem persists, contact iHealth customer service for assistance.

5：The environmental temperature is beyond normal range, place the meter at room temperature for at least 30 minutes, then repeat the test.

6：The environmental temperature is beyond normal range, place the meter at room temperature for at least 30 minutes, then repeat the test.

7：Test strip coding error.

8：Communication error, press“START” or rescan the code to repeat the test.

9：Strip removed in the middle of reading, repeat the test with a new strip.

10：Insert a new test strip and repeat the test.

400：No Device

500：The instruction is still in execution  

600：The input parameter errors 

700: unauthorized

800：Does not support

  
