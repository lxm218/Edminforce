# Cordova iHealth Plugin for Bp

This is a cordova plugin for ihealth bp device.

## Using Cordova plugins directly in your meteor application

### Add the plugin

    $ meteor add cordova:com.ihealth.plugin.bp.bpmanagercordova@https://github.com/iHealthLab/plugin-ihealth-bp/tarball/3e5db902a9092e28e767095989abc749daebf2a6

    $ meteor add cordova:com.ihealth.plugin.bp.bpmanagercordova@file:///Users/apple/Documents/plugin-ihealth-bp


### Remove the plugin

    $ meteor remove cordova:com.ihealth.plugin.bp.bpmanagercordova

### BP document

(1)startDiscovery

function(successCallback, errorCallback, appsecret)

CallBack：

{"msg":" discovery doing","address":"8CDE52143F1E","name":"BP5"}

(2) stopDiscovery

function(successCallback, errorCallback, appsecret)

ios Without this feature

CallBack：

{"msg":" discovery done "}

(3) connectDevice

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" connected ","address":"8CDE52143F1E","name":"BP5"}

 (4) startMeasure
 
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" zero doing ","address":"8CDE52143F1E"}

{"msg":" zero done ","address":"8CDE52143F1E"}

{"msg":" measure doing ","address":"8CDE52143F1E"," pressure ":"20"}

{"msg":"measure doing","address":"8CDE52143F1E","wave":[15,15,16] }

{"msg":"measure done","address":"8CDE52143F1E","name":"BP5", "highpressure" : 120, " lowpressure " : 80","heartrate ":60}

(5) stopMeasure

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":"stopMeasure","address":"8CDE52143F1E","name":"BP5"}

(6) enableOffline

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":"enableOffline","address":"8CDE52143F1E"}

(7) disableOffline

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" disableOffline ","address":"8CDE52143F1E"}

(8) getOfflineNum

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" offlineNum","address":"8CDE52143F1E","value":10}

(9) getOfflineData

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" offlineData","address":"8CDE52143F1E","value": [{ "irregular" :0, "time" : "2015,8,15,23,13", "heartRate" : 63,"DIA" : 82,"SYS" : 119 },
{ "irregular" : 0, "time" : "2015,8,15,23,14", "heartRate" : 66, "DIA": 84, 
"SYS" : 123} ] }

(10) getBattery

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" battery","address":"8CDE52143F1E"," battery":10}

(11) isEnableOffline

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" isEnableOffline","address":"8CDE52143F1E"," isEnableOffline":true}

(12) disConnectDevice

function(successCallback, errorCallback, appsecret, mac)

ios Without this feature

CallBack：

{"msg":" disconnect","address":"8CDE52143F1E","name":"BP5"}

(13) setDisconnectCallback

function(successCallback, errorCallback, appsecret, mac)

NO CallBack

(14) confirmAngle

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" angle","address":"8CDE52143F1E","value":10}

(15) getIDPS

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" IDPS","HardwareVersion" : "1.0.0","name" : "BP5", "address" : "8CDE5208B9ED",  "FirmwareVersion" : "2.1.0" }
  
## BP5 error ID and related instructions
CallBack：

{"msg":"error","errorID" : 1, "ProductType" : "BP", "ProductModel" : "BP5", "address" : "8CDE5208B9ED"}

#Error ID：

0：Keep your arm stable, stay still and try again

1：Fasten the cuff over bare arm, stay still and try again

2：Fasten the cuff over bare arm, stay still and try again

3：Loosen the cuff and try again

4：Fasten the cuff over bare arm, stay still and try again

5：Rest for 5 minutes and try again. Keep your arm stable and try again

6：Fasten the cuff over bare arm, stay still and try again

7：Fasten the cuff over bare arm, stay still and try again

8：Fasten the cuff over bare arm, stay still and try again

10：Fasten the cuff over bare arm, stay still and try again

12：Bluetooth connection error. Please reconnect Bluetooth

13：Low battery

15：Reading is out of range. Rest for 5 minutes and try again with bare arm

16：Systolic below 60mmHg or diastolic below 40mmHg

17：Keep your arm stable and stay still during measurement

31：BPOverTimeError 

400：No Device

500：The instruction is still in execution  

600：The input parameter errors 

700: unauthorized







         
     
        


    
