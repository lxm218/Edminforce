
## The DataServer (Driver Package)
* DataServer (DataServer) is a micro service data center that manages health data, syncs with iHealth Cloud, etc.

* DataServer (Driver Package) can be used to connect to the DataServer, register user at DataServer, optionally create or sync with an iHealth Cloud account, upload and/or sync user measurement data.


## Install the package
1. `PACKAGE_ROOT` and `PACKAGE_DIR` should be properly set as if you were using other iHealth packages
2. `meteor add ihealth:dataserver`



## APIs and Usage
### On Startup

**What you need to do:**
The Driver Package requires a unique `appName` set in Meteor.settings, and should **NOT** be modified later on.

```javascript
// in settings.json
{
  "appName": "YOUR_UNIQUE_APPNAME",
  "OTHER_SETTINGS": "YOUR_OTHER_SETTINGS"
}
```

**What the package does for you:**
1. Exports a global `DataServer` namespace, which is ONLY AVAILABLE ON THE APP SERVER
2. Connect to the DataServer service
3. Register your app at DataServer using the `appName` in settings.json

### User APIs (Registration and more)

#### User Registration
```javascript
// (Required)
/* user registration (Register user on DataServer)
*/

DataServer.userRegister({
  // Meteor.userId()
  userId:  String, // Required      
  
  // Whether to link user account with existing enterprise apps, default: false
  linkExistingUser:  Boolean, // Optional
  
  // Whether user account needs to be deIdentified, default: true
  deIdentify: Boolean // Optional    
})
```

### User Data APIs

#### Measurement Data Upload
```javascript
// dataObj: Object, data to be upload, see below
DataServer.uploadMeasurementData(dataObj);
```
**Sample Usage**
```javascript
// sample bp measurement data
// NOTE: ONLY BP upload is available now
let bpDataObj = {
    "_id" : "8f8a2a9c-103b-4b61-b284-d1ca2c1fc46f", //Meteor.uuid(),
    "LP" : 88,
    "deviceAddress" : "8CDE521448F0",
    "deviceModel" : "BP5",
    "HR" : 63,
    "HP" : 117,
    "MDateUTC" : new Date("2015-09-07T02:34:57.954Z"),
    "userId" : "wtseLASFWQmAqoHxZ",
    "deviceType" : "BP",
    "createdAt" : new Date("2015-09-07T02:34:57.965Z"),
}
DataServer.uploadMeasurementData(bpDataObj);
```

**For more requirements on the format of `dataObj`, please check out  [here](https://github.com/iHealthLab/framework-iHealth/blob/master/library/mobile/ihealth-dataserver/UploadDataFormat.md).**

#### Subscriptions
```javascript
/* subscribe to user measurement data (NOT from your own app, only when the user is likely using multiple iHealth enterprise apps)
  
 dataType: String | [String], valid values: ["BP", "BG", "Weight", "Sleep", "Activity", "SpO2", "Food", "Sport"]
 selector: Mongo selector, e.g. {MDate: {$gte: ...}}, default is {}
 options: Mongo selector & modifiers, e.g. {fields: {Steps: 1}}, default is {}
*/

// DataServer.subscribe(dataType, selector, options)

```



```javascript
// (deprecated)
/* subscribe to all user data (BP, BG, Activity)

 selector: Mongo selector, e.g. {MDate: {$gte: ...}}, default is {}
 options: Mongo selector & modifiers, e.g. {fields: {Steps: 1}}, default is {}
 insertHandler/updateHandler/removeHandler:
    Meteor cursor.observe handlers, optional
    default: data will be saved to collection "ds_bloodPressure", "ds_activity", etc

DataServer.subscribeBP(selector, options, insertHandler, updateHandler, removeHandler)
DataServer.subscribeActivity(selector, options, insertHandler, updateHandler, removeHandler)

*/
```

#### Handlers
Use the defaults db doc observe handlers or override them with your own. Handlers are used in the `added, changed, removed` hooks. Check [Meteor cursor.observe documentation](http://docs.meteor.com/#/full/observe) for more details

```javascript
insertHandler = function(doc){
    // doc is the db doc inserted, including _id
}
updateHandler = function(newDoc, oldDoc){
    // newDoc/oldDoc are the db docs after/before update, respectively, including _id
}
removeHandler = function(doc){
    // doc is the db doc removed, including _id
}
```