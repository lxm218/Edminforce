# Cordova iHealth Plugin for Hs4s

This is a cordova plugin for ihealth hs4s.

## Using Cordova plugins directly in your meteor application

### Add the plugin

    $ meteor add cordova:com.ihealth.plugin.hsmanagercordova@https://github.com/iHealthLab/plugin-ihealth-hs/tarball/ed1689138cbe41dc9188a94ed0d88cb08b51a306


### Remove the plugin

    $ meteor remove cordova:com.ihealth.plugin.hsmanagercordova
    

#HS

####(1)startDiscovery

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" discovery doing","address":"8CDE52143F1E","name":"HS4"}
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
####(4) startMeasure

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":"realtime","address":"8CDE52143F1E","value" : 12}

{"msg":"weight","address":"8CDE52143F1E","value" : 12}

####(5) getOfflineData

function(successCallback, errorCallback, appsecret, mac)

CallBack：

{"msg":" history","address":"8CDE52143F1E", "history" : [{"date" :"2015-09-07 08:38:10","weight" : 7.9},{"date" :"2015-09-07 10:03:53","weight" : 53.8}] }
####(6) disConnectDevice

function(successCallback, errorCallback, appsecret, mac)

ios Without this feature

CallBack：

{"msg":" disconnect","address":"8CDE52143F1E","name":"HS4"}
####(7) setDisconnectCallback

function(successCallback, errorCallback, appsecret, mac)

NO CallBack

##HS4 and HS4S error ID and related instructions

CallBack：

{"msg":"error","errorID" : 1, "ProductType" : "HS", "ProductModel" : "HS4", "address" : "8CDE5208B9ED"}


##Error ID：                              
                  
                         
1：Battery level is low

2：The Scale failed to initialize

3：Maximum weight has been exceeded

4：The Scale can't capture a steady reading

5: Bluetooth connection error

8: Scale memory access error

400：No Device

500：The instruction is still in execution 

600：The input parameter errors 

700: unauthorized

800：Does not support


