# Cordova iHealth Plugin for po

This is a cordova plugin for ihealth po.

## Using Cordova plugins directly in your meteor application

### Add the plugin

    $ meteor add cordova:com.ihealth.plugin.po.pomanagercordova@https://github.com/iHealthLab/plugin-ihealth-po/tarball/5548955340395449afc387bdfde9fe1e292a174f


### Remove the plugin

    $ meteor remove cordova:com.ihealth.plugin.po.pomanagercordova
    
 #PO
 
####(1)startDiscovery
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" discovery doing","address":"8CDE52143F1E","name":"PO3"}
####(2) stopDiscovery
function(successCallback, errorCallback, appsecret, mac)

ios Without this feature

CallBack：

{"msg":" discovery done "}
####(3) connectDevice
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" connected ","address":"8CDE52143F1E","name":"PO3"}
####(4) getIDPS
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" IDPS","HardwareVersion" : "1.0.0", "name" : "PO3", "address" : "8CDE5208B9ED",  "FirmwareVersion" : "3.0.0" }
####(5) getBattery
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" battery","address":"8CDE52143F1E", "battery" : 10}
#### (6) getOfflineData
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" historyCount","address":"8CDE52143F1E", "count" : 10}

{"msg":" history","address":"8CDE52143F1E", "value" : { "order " :2,  "date" : "2015-09-08 15:13:57","bpm" : 98, "spo2" : 98, wave" : [ 0,50,120,0,50,120]} }

 {"msg":" historyWave","address":"8CDE52143F1E", "value" : { "order " :2,  wave" : [ 0,50,120,0,50,120]} }
####(7) startMeasure
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":"realtime","address":"8CDE52143F1E","value" : {"wave" : [440,424,643],"bpm" : 0,"spo2" : 0,"height" : 0,"PI" : 4.431853}}
####(8) disConnectDevice
function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" disconnect","address":"8CDE52143F1E"}
####(9) setDisconnectCallback
function(successCallback, errorCallback, appsecret, mac)

NO CallBack

##PO3 error ID and related instructions

CallBack：

{"msg":"error","errorID" : 1, "ProductType" : "PO", "ProductModel" : "PO3", "address" : "8CDE5208B9ED"}

###Error ID：                              
                  
                         
0：Bluetooth Communication Error

1：Data access error

2：Abnormal hardware

3：SpO2 or PRbpm test result is beyond the measurement range of the system

4：Unknown interference detected, please test again

5: Send Command Faild

400：No Device

500：The instruction is still in execution 

600：The input parameter errors 

700: unauthorized

800：Does not support



