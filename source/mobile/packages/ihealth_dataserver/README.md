
## The DataServer (Package)
* DataServer (Server) is a micro service data center that manages health data, syncs with iHealth Cloud, etc.

* DataServer (Package) can be used to connect to the Server, register/authorize/pull user data at iHealth Cloud, and subscribe to measurement data + user information.


## Install Instructions
* Create `git-packages.json` in the app root folder `/`
```
{
  "ihealth:dataserver": {
    "git": "https://github.com/iHealthLab/framework-iHealth.git",
    "path": "mobile-framework/packages/ihealth_dataserver"
  }
}

```
   Or if the file exists, just add the package info along with other packages
```
"ihealth:dataserver": {
    "git": "https://github.com/iHealthLab/framework-iHealth.git",
    "path": "mobile-framework/packages/ihealth_dataserver"
  }
```

* In Shell, do `$ mgp`. The package will be downloaded to `/packages/dataserver`

* In Shell, do `meteor add ihealth:dataserver`. Now the pacakge is ready to use.


## APIs and Usage

### User Registration, Authorization, PullData, etc

The APIs are **only available on the server**, and (if is required) should be called in the following sequential order.

#### Sample Usage
```javascript
DataServer.connect();

DataServer.register(appName);

var UID = DataServer.getUID(iHealthID;

if ( UID ) {
    DataServer.userAuthorize(UID)
} else {
    // not available yet, use userRegister() now to check if account has been registered before
    if ( userHasBeenRegistered(iHealthID) ){
        DataServer.userAuthorize(UID);
    } else {
        DataServer.userRegister(UID, iHealthID, password, nickname);
    }
}

DataServer.pullUserData(UID);

DataServer.subscribeBP;  // or other subscriptions
```

#### APIs
```javascript
// (Required, once per app server restart)
// connect to the Server, MUST be done before any other calls

DataServer.connect()
```

```javascript
// (Required, once per app server restart)
// appName: String type, currently can be any meaningful app name

DataServer.register(appName)
```

```javascript
// (Required, if UID exists on DataServer, do userAuthorize(), NOT userRegister(), see below)
// check/get UID of an existing iHealth Cloud account
DataServer.getUID(iHealthID)
```

```javascript
// (Optional, but one and ONLY one of userRegister & userAuthorize must be called, once per UID)
/* user registration (create new iHealth Cloud account)

 UID: unique identifier, e.g. Meteor.users._id. UID is used in all DataServer user* methods
 iHealthID: iHealth Cloud username, must be an email address
 password: chosen by the user, same as in Accounts.createUser()
 nickname: chosen by the user, preferably of String type
*/

DataServer.userRegister(UID, iHealthID, password, nickname)
```

```javascript
// (Optional, but one and ONLY one of userRegister & userAuthorize must be called, once per UID)
// user authorization (for existing iHealth Cloud users)

DataServer.userAuthorize(UID)
```


```javascript
// (Optional)
// change user password (for existing iHealth Cloud users)

DataServer.userChangePassword(UID, oldPassword, newPassword)
```

```javascript
// (Required (if the app need to subscribe to Cloud data), once per UID)
// pull user history data (for existing iHealth Cloud users)

DataServer.pullUserData(UID)
```

### Subscriptions

#### APIs
```javascript
// (Required)
/* subscribe to all user data (BP, BG, Activity)

 selector: Mongo selector, e.g. {MDate: {$gte: ...}}, default is {}
 options: Mongo selector & modifiers, e.g. {fields: {Steps: 1}}, default is {}
 insertHandler/updateHandler/removeHandler:
    Meteor cursor.observe handlers, optional
    default: data will be saved to collection "ds_bloodPressure", "ds_activity", etc
*/

DataServer.subscribeBP(selector, options, insertHandler, updateHandler, removeHandler)
DataServer.subscribeActivity(selector, options, insertHandler, updateHandler, removeHandler)
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

### Sample Data Collections JSON Format
(Subject to minor changes)

**Note:** `LastChangeTime` and `MDate` are timestamps to the accuracy of 1 second. They **MUST be timed by 1000** before converted to Date() object

#### BP
```
{
    "_id" : "fSQfdQ5W34YcDxRSZ",
    "DataID" : "6175dc63fc2504cde0988800031b30d8",
    "BPL" : 6,
    "DataSource" : "FromDevice",
    "HP" : 88,
    "HR" : 69,
    "IsArr" : 0,
    "LP" : 58,
    "LastChangeTime" : 1440447691,
    "Lat" : 0,
    "Lon" : 0,
    "MDate" : 1440422601,
    "Note" : "",
    "TimeZone" : "-0700",
    "UID" : "NLfEL7dT2iRwHg4JP"
}
```

#### Activity
```
{
    "_id" : "QSQTZ5hsF9jicBfSR",
    "DataID" : "82ef69e935eaccc243591e35625ad1a5",
    "Calories" : 987,
    "DataSource" : "FromDevice",
    "DistanceTraveled" : 0.1132400000000000,
    "LastChangeTime" : 1440362470,
    "Lat" : 0,
    "Lon" : 0,
    "MDate" : 1440337270,
    "Note" : "",
    "Steps" : 149,
    "TimeZone" : "-0700",
    "UID" : "NLfEL7dT2iRwHg4JP"
}
```
