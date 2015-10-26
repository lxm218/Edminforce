//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var DefaultRoutes = Package['ihealth:utils'].DefaultRoutes;
var h = Package['ihealth:utils'].h;
var IH = Package['ihealth:utils'].IH;
var Dispatcher = Package['meteorflux:dispatcher'].Dispatcher;
var Roles = Package['alanning:roles'].Roles;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var moment = Package['momentjs:moment'].moment;
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var __init_fast_render = Package['meteorhacks:fast-render'].__init_fast_render;
var FastClick = Package.fastclick.FastClick;
var Accounts = Package['accounts-base'].Accounts;
var AccountsClient = Package['accounts-base'].AccountsClient;
var MeteorFlux = Package['meteorflux:namespace'].MeteorFlux;
var Mongo = Package.mongo.Mongo;
var React = Package['react-runtime'].React;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var babelHelpers = Package['babel-runtime'].babelHelpers;

/* Package-scope variables */
var ChatDispatcher, __coffeescriptShare, user, Dispatcher;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/ihealth_chat-engine/dispatcher/dispatcher.js                                              //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
                                                                                                      // 1
                                                                                                      // 2
IH.Store = {};  // TODO: move to utils                                                                // 3
IH.Action = {};  // TODO: move to utils                                                               // 4
                                                                                                      // 5
ChatDispatcher = new MeteorFlux.Dispatcher();                                                         // 6
                                                                                                      // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/ihealth_chat-engine/stores/messageStore.coffee.js                                         //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
IH.Coll.ChatMessages = new Mongo.Collection("chat_message");                                          // 2
                                                                                                      //
IH.Schema.ChatMessages = new SimpleSchema({                                                           // 2
  createdAt: {                                                                                        // 5
    type: Date,                                                                                       // 6
    index: -1,                                                                                        // 6
    autoValue: function() {                                                                           // 6
      if (this.isInsert) {                                                                            // 9
        return new Date();                                                                            //
      } else if (this.isUpsert) {                                                                     //
        return {                                                                                      //
          $setOnInsert: new Date()                                                                    // 12
        };                                                                                            //
      } else {                                                                                        //
        return this.unset();                                                                          //
      }                                                                                               //
    },                                                                                                //
    denyUpdate: true                                                                                  // 6
  },                                                                                                  //
  SID: {                                                                                              // 5
    type: String,                                                                                     // 18
    label: "Sender ID"                                                                                // 18
  },                                                                                                  //
  CHID: {                                                                                             // 5
    type: String,                                                                                     // 22
    label: "Channel ID",                                                                              // 22
    index: true                                                                                       // 22
  },                                                                                                  //
  type: {                                                                                             // 5
    type: String,                                                                                     // 27
    label: "Message Type",                                                                            // 27
    autoValue: function() {                                                                           // 27
      if (!this.isSet) {                                                                              // 30
        return "txt";                                                                                 //
      }                                                                                               //
    },                                                                                                //
    optional: true                                                                                    // 27
  },                                                                                                  //
  content: {                                                                                          // 5
    type: String                                                                                      // 35
  }                                                                                                   //
});                                                                                                   //
                                                                                                      //
IH.Coll.ChatMessages.attachSchema(IH.Schema.ChatMessages);                                            // 2
                                                                                                      //
IH.Coll.ChatMessages.allow({                                                                          // 2
  insert: function(userId, doc) {                                                                     // 42
    return userId && userId === doc.SID;                                                              //
  },                                                                                                  //
  update: function(userId, doc, fields, modifier) {                                                   // 42
    return false;                                                                                     //
  },                                                                                                  //
  remove: function(userId, doc, fields, modifier) {                                                   // 42
    return false;                                                                                     //
  },                                                                                                  //
  fetch: ["senderId"]                                                                                 // 42
});                                                                                                   //
                                                                                                      //
IH.Store.ChatMessages = {};                                                                           // 2
                                                                                                      //
IH.Store.ChatMessages.dispatchToken = ChatDispatcher.register(function(action) {                      // 2
  var insertObj;                                                                                      // 62
  switch (action.type) {                                                                              // 62
    case "CREATE_NEW_MESSAGE":                                                                        // 62
      return IH.Coll.ChatMessages.insert(action.message);                                             //
    case "DOCTOR_JOINED_CHANNEL":                                                                     // 62
      insertObj = {                                                                                   // 69
        SID: "system",                                                                                // 70
        CHID: action.channelID,                                                                       // 70
        type: "note",                                                                                 // 70
        content: action.doctor + " joined channel"                                                    // 70
      };                                                                                              //
      return IH.Coll.ChatMessages.insert(insertObj);                                                  //
  }                                                                                                   // 62
});                                                                                                   // 60
                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/ihealth_chat-engine/stores/channelStore.coffee.js                                         //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LastMsgSchema;                                                                                    // 3
                                                                                                      //
LastMsgSchema = new SimpleSchema({                                                                    // 3
  createdAt: {                                                                                        // 4
    type: Date                                                                                        // 5
  },                                                                                                  //
  from: {                                                                                             // 4
    type: String,                                                                                     // 8
    label: "Sender ID"                                                                                // 8
  },                                                                                                  //
  content: {                                                                                          // 4
    type: String                                                                                      // 12
  }                                                                                                   //
});                                                                                                   //
                                                                                                      //
IH.Coll.ChatChannels = new Mongo.Collection("chat_channel");                                          // 3
                                                                                                      //
IH.Schema.ChatChannels = new SimpleSchema({                                                           // 3
  createdAt: {                                                                                        // 18
    type: Date,                                                                                       // 19
    index: -1,                                                                                        // 19
    autoValue: function() {                                                                           // 19
      if (this.isInsert) {                                                                            // 22
        return new Date();                                                                            //
      } else if (this.isUpsert) {                                                                     //
        return {                                                                                      //
          $setOnInsert: new Date()                                                                    // 25
        };                                                                                            //
      } else {                                                                                        //
        return this.unset();                                                                          //
      }                                                                                               //
    }                                                                                                 //
  },                                                                                                  //
  updatedAt: {                                                                                        // 18
    type: Date,                                                                                       // 30
    autoValue: function() {                                                                           // 30
      if (this.isUpdate) {                                                                            // 32
        return new Date();                                                                            //
      }                                                                                               //
    },                                                                                                //
    optional: true,                                                                                   // 30
    denyInsert: true                                                                                  // 30
  },                                                                                                  //
  PID: {                                                                                              // 18
    type: String,                                                                                     // 38
    label: "Patient ID"                                                                               // 38
  },                                                                                                  //
  DID: {                                                                                              // 18
    type: String,                                                                                     // 42
    label: "Primary Doctor of this Channel"                                                           // 42
  },                                                                                                  //
  others: {                                                                                           // 18
    type: [String],                                                                                   // 46
    label: "List of Other Doctors' IDs",                                                              // 46
    autoValue: function() {                                                                           // 46
      if (this.isInsert && !this.isSet) {                                                             // 49
        return [];                                                                                    // 50
      }                                                                                               //
    }                                                                                                 //
  },                                                                                                  //
  lastMsg: {                                                                                          // 18
    type: LastMsgSchema,                                                                              // 53
    label: "last message of channel",                                                                 // 53
    optional: true                                                                                    // 53
  }                                                                                                   //
});                                                                                                   //
                                                                                                      //
IH.Coll.ChatChannels.attachSchema(IH.Schema.ChatChannels);                                            // 3
                                                                                                      //
IH.Coll.ChatChannels.allow({                                                                          // 3
  insert: function() {                                                                                // 63
    return true;                                                                                      //
  },                                                                                                  //
  update: function() {                                                                                // 63
    return true;                                                                                      //
  },                                                                                                  //
  remove: function() {                                                                                // 63
    return false;                                                                                     //
  }                                                                                                   //
});                                                                                                   //
                                                                                                      //
IH.Store.ChatChannels = {                                                                             // 3
  create: function(patient, doctor) {                                                                 // 75
    var newChannel;                                                                                   // 76
    newChannel = {                                                                                    // 76
      PID: patient,                                                                                   // 77
      DID: doctor,                                                                                    // 77
      others: []                                                                                      // 77
    };                                                                                                //
    return IH.Coll.ChatChannels.insert(newChannel);                                                   //
  },                                                                                                  //
  addUser: function(channelID, doctor) {                                                              // 75
    return IH.Coll.ChatChannels.update(channelID, {                                                   //
      $push: {                                                                                        // 83
        others: doctor                                                                                // 83
      }                                                                                               //
    });                                                                                               //
  },                                                                                                  //
  removeUser: function(channelID, doctor) {                                                           // 75
    return IH.Coll.ChatChannels.update(channelID, {                                                   //
      $pull: {                                                                                        // 86
        others: doctor                                                                                // 86
      }                                                                                               //
    });                                                                                               //
  },                                                                                                  //
  updateLastMsg: function(m) {                                                                        // 75
    var updateMsg;                                                                                    // 89
    updateMsg = {                                                                                     // 89
      createdAt: new Date(),                                                                          // 90
      from: m.SID,                                                                                    // 90
      content: m.content                                                                              // 90
    };                                                                                                //
    return IH.Coll.ChatChannels.update(m.CHID, {                                                      //
      $set: {                                                                                         // 94
        lastMsg: updateMsg                                                                            // 94
      }                                                                                               //
    });                                                                                               //
  }                                                                                                   //
};                                                                                                    //
                                                                                                      //
IH.Store.ChatChannels.dispatchToken = ChatDispatcher.register(function(action) {                      // 3
  switch (action.type) {                                                                              // 100
    case "NEW_CONTACTS_CREATED":                                                                      // 100
      return IH.Store.ChatChannels.create(action.patient, action.doctor);                             //
    case "DOCTOR_JOINED_CHANNEL":                                                                     // 100
      return IH.Store.ChatChannels.addUser(action.channelID, action.doctor);                          //
    case "DOCTOR_LEFT_CHANNEL":                                                                       // 100
      return IH.Store.ChatChannels.removeUser(action.channelID, action.doctor);                       //
    case "USER_ACTIVATE_CHANNEL":                                                                     // 100
      if (Meteor.isClient) {                                                                          // 112
        return Session.set("ACTIVE_CHAT_CHANNEL", action.channelID);                                  //
      }                                                                                               //
      break;                                                                                          // 111
    case "CREATE_NEW_MESSAGE":                                                                        // 100
      ChatDispatcher.waitFor([IH.Store.ChatMessages.dispatchToken]);                                  // 116
      if (Meteor.isClient) {                                                                          // 117
        return IH.Store.ChatChannels.updateLastMsg(action.message);                                   //
      }                                                                                               //
  }                                                                                                   // 100
});                                                                                                   // 98
                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/ihealth_chat-engine/stores/statusStore.coffee.js                                          //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _fetchAllOtherChannelUsers, _getStatusID;                                                         // 2
                                                                                                      //
IH.Coll.ChatStatus = new Mongo.Collection("chat_status");                                             // 2
                                                                                                      //
IH.Schema.ChatStatus = new SimpleSchema({                                                             // 2
  createdAt: {                                                                                        // 5
    type: Date,                                                                                       // 6
    index: -1,                                                                                        // 6
    autoValue: function() {                                                                           // 6
      if (this.isInsert) {                                                                            // 9
        return new Date();                                                                            //
      } else if (this.isUpsert) {                                                                     //
        return {                                                                                      //
          $setOnInsert: new Date()                                                                    // 12
        };                                                                                            //
      } else {                                                                                        //
        return this.unset();                                                                          //
      }                                                                                               //
    }                                                                                                 //
  },                                                                                                  //
  updatedAt: {                                                                                        // 5
    type: Date,                                                                                       // 17
    autoValue: function() {                                                                           // 17
      if (this.isUpdate) {                                                                            // 19
        return new Date();                                                                            //
      }                                                                                               //
    },                                                                                                //
    optional: true,                                                                                   // 17
    denyInsert: true                                                                                  // 17
  },                                                                                                  //
  UID: {                                                                                              // 5
    type: String,                                                                                     // 25
    label: "User ID"                                                                                  // 25
  },                                                                                                  //
  CHID: {                                                                                             // 5
    type: String,                                                                                     // 29
    label: "Channel ID"                                                                               // 29
  },                                                                                                  //
  active: {                                                                                           // 5
    type: Boolean,                                                                                    // 33
    label: "Channel is active",                                                                       // 33
    autoValue: function() {                                                                           // 33
      if (this.isInsert) {                                                                            // 36
        return false;                                                                                 //
      }                                                                                               //
    }                                                                                                 //
  },                                                                                                  //
  numUnread: {                                                                                        // 5
    type: Number,                                                                                     // 40
    label: "Number of unread message per User+Channel",                                               // 40
    optional: true,                                                                                   // 40
    autoValue: function() {                                                                           // 40
      if (this.isInsert) {                                                                            // 44
        return 0;                                                                                     // 45
      }                                                                                               //
    }                                                                                                 //
  }                                                                                                   //
});                                                                                                   //
                                                                                                      //
IH.Coll.ChatStatus.attachSchema(IH.Schema.ChatStatus);                                                // 2
                                                                                                      //
IH.Coll.ChatStatus.allow({                                                                            // 2
  insert: function() {                                                                                // 59
    return true;                                                                                      //
  },                                                                                                  //
  update: function(userId, doc) {                                                                     // 59
    return userId && userId === doc.UID;                                                              //
  },                                                                                                  //
  remove: function() {                                                                                // 59
    return false;                                                                                     //
  }                                                                                                   //
});                                                                                                   //
                                                                                                      //
_fetchAllOtherChannelUsers = function(cid, uid) {                                                     // 2
  var chnl;                                                                                           // 71
  chnl = IH.Coll.ChatChannels.findOne(cid);                                                           // 71
  return allChannelUsers;                                                                             // 74
};                                                                                                    // 70
                                                                                                      //
_getStatusID = function(action) {                                                                     // 2
  var channelID, status, statusID;                                                                    // 77
  channelID = action.message != null ? action.message.CHID : action.channelID;                        // 77
  status = IH.Coll.ChatStatus.findOne({                                                               // 77
    UID: Meteor.userId(),                                                                             // 78
    CHID: channelID                                                                                   // 78
  });                                                                                                 //
  if (status != null) {                                                                               // 79
    statusID = status._id;                                                                            // 80
  }                                                                                                   //
  return statusID;                                                                                    // 81
};                                                                                                    // 76
                                                                                                      //
IH.Store.ChatStatus = {                                                                               // 2
  incUnreadCount: function(sid) {                                                                     // 88
    var status;                                                                                       // 90
    status = IH.Coll.ChatStatus.findOne(sid);                                                         // 90
    if (!status.active) {                                                                             // 91
      return IH.Coll.ChatStatus.update(sid, {                                                         //
        $inc: {                                                                                       // 92
          numUnread: 1                                                                                // 92
        }                                                                                             //
      });                                                                                             //
    }                                                                                                 //
  },                                                                                                  //
  clearUnreadCount: function(sid) {                                                                   // 88
    return IH.Coll.ChatStatus.update(sid, {                                                           //
      $set: {                                                                                         // 95
        active: true,                                                                                 // 95
        numUnread: 0                                                                                  // 95
      }                                                                                               //
    });                                                                                               //
  },                                                                                                  //
  deActivate: function(sid) {                                                                         // 88
    return IH.Coll.ChatStatus.update(sid, {                                                           //
      $set: {                                                                                         // 98
        active: false                                                                                 // 98
      }                                                                                               //
    });                                                                                               //
  }                                                                                                   //
};                                                                                                    //
                                                                                                      //
IH.Store.ChatStatus.dispatchToken = ChatDispatcher.register(function(action) {                        // 2
  var statusID;                                                                                       // 104
  statusID = _getStatusID(action);                                                                    // 104
  if (statusID == null) {                                                                             // 105
    console.error("channel status not found");                                                        // 106
  }                                                                                                   //
  switch (action.type) {                                                                              // 108
    case "CREATE_NEW_MESSAGE":                                                                        // 108
      ChatDispatcher.waitFor([IH.Store.ChatMessages.dispatchToken]);                                  // 111
      return IH.Store.ChatStatus.incUnreadCount(statusID);                                            //
    case "USER_ACTIVATE_CHANNEL":                                                                     // 108
      return IH.Store.ChatStatus.clearUnreadCount(statusID);                                          //
    case "USER_LEFT_CHANNEL":                                                                         // 108
      return IH.Store.ChatStatus.deActivate(statusID);                                                //
  }                                                                                                   // 108
});                                                                                                   // 102
                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/ihealth_chat-engine/actions/channelActions.coffee.js                                      //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
IH.Action.ChatChannels = {                                                                            // 2
  setChannelActive: function(channelID) {                                                             // 4
    return ChatDispatcher.dispatch({                                                                  //
      type: "USER_ACTIVATE_CHANNEL",                                                                  // 6
      channelID: channelID                                                                            // 6
    });                                                                                               //
  }                                                                                                   //
};                                                                                                    //
                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/ihealth_chat-engine/actions/messageActions.coffee.js                                      //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
IH.Action.ChatMessages = {                                                                            // 2
  createMessage: function(message, channelID) {                                                       // 4
    return ChatDispatcher.dispatch({                                                                  //
      type: "CREATE_NEW_MESSAGE",                                                                     // 6
      message: message                                                                                // 6
    });                                                                                               //
  }                                                                                                   //
};                                                                                                    //
                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/ihealth_chat-engine/actions/statusActions.coffee.js                                       //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
IH.Action.ChatStatus = {                                                                              // 2
  activateChannel: function(channelID) {                                                              // 4
    return ChatDispatcher.dispatch({                                                                  //
      type: "USER_ACTIVATE_CHANNEL",                                                                  // 6
      channelID: channelID                                                                            // 6
    });                                                                                               //
  },                                                                                                  //
  deActivateChannel: function(channelID) {                                                            // 4
    return ChatDispatcher.dispatch({                                                                  //
      type: "USER_LEFT_CHANNEL",                                                                      // 12
      channelID: channelID                                                                            // 12
    });                                                                                               //
  }                                                                                                   //
};                                                                                                    //
                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/ihealth_chat-engine/camera.coffee.js                                                      //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Camera;                                                                                           // 2
                                                                                                      //
Camera = {};                                                                                          // 2
                                                                                                      //
if (Meteor.isCordova) {                                                                               // 4
  Camera.getPicture = function(options, callback) {                                                   // 6
    var failure, success;                                                                             // 7
    if (!callback) {                                                                                  // 7
      callback = options;                                                                             // 8
      options = {};                                                                                   // 8
    }                                                                                                 //
    success = function(data) {                                                                        // 7
      return callback(null, "data:image/jpeg;base64," + data);                                        //
    };                                                                                                //
    failure = function(error) {                                                                       // 7
      return callback(new Meteor.Error("cordovaError", error));                                       //
    };                                                                                                //
    return navigator.camera.getPicture(success, failure, _.extend(options, {                          //
      quality: options.quality || 49,                                                                 // 18
      targetWidth: options.width || 640,                                                              // 18
      targetHeight: options.height || 480,                                                            // 18
      destinationType: Camera.DestinationType.DATA_URL                                                // 18
    }));                                                                                              //
  };                                                                                                  //
}                                                                                                     //
                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/ihealth_chat-engine/components/ChatChannelList.jsx                                        //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
                                                                                                      //
IH.RC.ChatChannelList = React.createClass({                                                           // 2
  displayName: "ChatChannelList",                                                                     //
                                                                                                      //
  mixins: [ReactMeteorData],                                                                          // 3
  getMeteorData: function () {                                                                        // 4
    //var contacts = Meteor.user().profile.contacts;                                                  //
                                                                                                      //
    var channelList = [];                                                                             // 7
    this.handle = Meteor.subscribe("ChatChannelList");                                                // 8
    if (this.handle.ready()) {                                                                        // 9
      var userId = Meteor.userId();                                                                   // 10
      channelList = IH.Coll.ChatStatus.find({ UID: userId }).map(function (s) {                       // 11
        var ch = IH.Coll.ChatChannels.findOne({ _id: s.CHID });                                       // 12
                                                                                                      //
        var contactID = ch.DID === userId ? ch.PID : ch.DID;                                          // 14
        var user = Meteor.users.findOne(contactID).profile;                                           // 15
        var latestMsg = ch.lastMsg; //                                                                // 16
                                                                                                      //
        return {                                                                                      // 18
          _id: ch._id,                                                                                // 19
          name: user.name,                                                                            // 20
          avatar: user.avatar,                                                                        // 21
          href: "/chat_channel/" + ch._id,                                                            // 22
          msg: latestMsg                                                                              // 23
        };                                                                                            //
      });                                                                                             //
    }                                                                                                 //
                                                                                                      //
    return {                                                                                          // 28
      channelList: channelList                                                                        // 29
    };                                                                                                //
  },                                                                                                  //
  //getDataContent() {                                                                                //
  //  return <RC.List>                                                                                //
  //    { _.map(this.data.channelList, function(c){                                                   //
  //      return <RC.Item                                                                             //
  //        href = {c.href}                                                                           //
  //        avatar = {c.avatar}                                                                       //
  //        title = {c.name}                                                                          //
  //        subtitle = {c.msg}                                                                        //
  //        />                                                                                        //
  //    })                                                                                            //
  //    }                                                                                             //
  //  </RC.List>                                                                                      //
  //},                                                                                                //
  componentWillUnmount: function () {                                                                 // 45
    this.handle.stop();                                                                               // 46
  },                                                                                                  //
  render: function () {                                                                               // 48
    return React.createElement(                                                                       // 49
      "div",                                                                                          //
      null,                                                                                           //
      React.createElement(                                                                            //
        RC.List,                                                                                      // 50
        null,                                                                                         //
        _.map(this.data.channelList, function (c, n) {                                                //
          console.log(c);                                                                             // 52
                                                                                                      //
          return React.createElement(RC.Item, {                                                       // 54
            theme: "avatar",                                                                          // 55
            href: c.href,                                                                             // 56
            avatar: c.avatar,                                                                         // 57
            title: c.name,                                                                            // 58
            subtitle: c.msg ? c.msg.content : null,                                                   // 59
            note: c.msg ? c.msg.createdAt : null,                                                     // 60
            key: n                                                                                    // 61
          });                                                                                         //
        })                                                                                            //
      )                                                                                               //
    );                                                                                                //
  }                                                                                                   //
});                                                                                                   //
//{this.data.channelList? this.getDataContent(): <p>Loading...</p>}                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/ihealth_chat-engine/components/ChatMessageList.jsx                                        //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
/*                                                                                                    //
                                                                                                      //
                                                                                                      //
//                                                                                                    //
//var _incrementalMessageLimit = 20;                                                                  //
//                                                                                                    //
//var incrementalScroll = function (e) {                                                              //
//                                                                                                    //
//  var scrollY = (this.y || window.pageYOffset) - window.pageYOffset;                                //
//  this.y = window.pageYOffset;                                                                      //
//                                                                                                    //
//  _triggerLoadMore(scrollY, window.pageYOffset);                                                    //
//};                                                                                                  //
//                                                                                                    //
//var _triggerLoadMore = function(scrollY, offsetY) {                                                 //
//  var directionY = !scrollY ? "NONE" : scrollY > 0 ? "UP" : "DOWN"                                  //
//  if (directionY === "UP" && offsetY <= 20 ) {                                                      //
//    console.log("window.scroll passed this line", directionY, offsetY, typeof offsetY)              //
//                                                                                                    //
//    _resetMessageSubLimit()                                                                         //
//  }                                                                                                 //
//};                                                                                                  //
//                                                                                                    //
//var _resetMessageSubLimit = function (){                                                            //
//                                                                                                    //
//  console.log("_resetMessageSubLimit")                                                              //
//                                                                                                    //
//  var before = Session.get("Message_Sub_Limit");                                                    //
//  var after = before + _incrementalMessageLimit;                                                    //
//  Session.set("Message_Sub_Limit", after)                                                           //
//};                                                                                                  //
                                                                                                      //
                                                                                                      //
IH.RC.ChatMessageList = React.createClass({                                                           //
                                                                                                      //
  //sendNewMessage(msg) {                                                                             //
  //  let message = {                                                                                 //
  //    type: "txt",                                                                                  //
  //    content: msg,                                                                                 //
  //    SID: Meteor.userId(),                                                                         //
  //    CHID: this.props.channelID   // ????                                                          //
  //  };                                                                                              //
  //  IH.Action.ChatMessages.createMessage(message, this.props.channelID)                             //
  //},                                                                                                //
                                                                                                      //
  //componentWillMount() {                                                                            //
  //  this.shouldScrollBottom = true;                                                                 //
  //},                                                                                                //
  //componentDidMount() {                                                                             //
  //                                                                                                  //
  //  var node = this.refs.messageContainer.getDOMNode();                                             //
  //  self = this;                                                                                    //
  //                                                                                                  //
  //  window.addEventListener("scroll", incrementalScroll);                                           //
  //                                                                                                  //
  //  console.log("walalalalallalalalallall")                                                         //
  //  //window.scrollTo(0, node.scrollHeight);                                                        //
  //},                                                                                                //
  //componentWillUpdate() {                                                                           //
  //  var node = this.refs.messageContainer.getDOMNode();                                             //
  //  this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;             //
  //},                                                                                                //
  //componentDidUpdate() {                                                                            //
  //  if (this.shouldScrollBottom) {                                                                  //
  //    var node = this.refs.messageContainer.getDOMNode();                                           //
  //                                                                                                  //
  //    console.log("node.scrollHeight in update ", node.scrollHeight);                               //
  //    node.scrollTop = node.scrollHeight                                                            //
  //  }                                                                                               //
  //},                                                                                                //
  componentWillUnmount() {                                                                            //
    window.removeEventListener("scroll")                                                              //
  },                                                                                                  //
  render() {                                                                                          //
                                                                                                      //
    var lastMsg = {}                                                                                  //
    let userId = Meteor.userId();                                                                     //
                                                                                                      //
    return <div ref="messageContainer">                                                               //
      {                                                                                               //
        _.map(this.props.messages, function(m, n){                                                    //
          let first = n===0 ? true : !(h.nk(lastMsg, "m.name")==h.nk(m, "m.name"));                   //
          let dateBreak = moment(m.date).format("MM/DD/YY");                                          //
          let lastBreak = n===0 || !lastMsg.date ? null : moment(lastMsg.date).format("MM/DD/YY");    //
          lastMsg = m;                                                                                //
                                                                                                      //
          return <RC.ChatBubble                                                                       //
            key={n}                                                                                   //
            isUser={userId==m.from}                                                                   //
            showDateBreak={dateBreak!=lastBreak}                                                      //
            firstOfGroup={first}                                                                      //
            message={m.msg}                                                                           //
            date={m.date}                                                                             //
            avatar={m.avatar}                                                                         //
            name={m.name}                                                                             //
            gender={m.gender}                                                                         //
            />                                                                                        //
        })                                                                                            //
      }                                                                                               //
      <RC.ChatTextArea name="message" onSubmit={this.sendNewMessage} />                               //
    </div>                                                                                            //
  }                                                                                                   //
})                                                                                                    //
                                                                                                      //
  */                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/ihealth_chat-engine/components/ChatView.jsx                                               //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
                                                                                                      //
var _defaultMessagesLimit = 30;                                                                       // 2
var _incrementalMessageLimit = 20;                                                                    // 3
var _initLoading = true;                                                                              // 4
var _currentScrollPosition = 0;                                                                       // 5
                                                                                                      //
var incrementalScroll = function (e) {                                                                // 7
                                                                                                      //
  var scrollY = (this.y || window.pageYOffset) - window.pageYOffset;                                  // 9
  this.y = window.pageYOffset;                                                                        // 10
  _triggerLoadMore(scrollY, window.pageYOffset);                                                      // 11
};                                                                                                    //
                                                                                                      //
var _triggerLoadMore = function (scrollY, offsetY) {                                                  // 14
  var directionY = !scrollY ? "NONE" : scrollY > 0 ? "UP" : "DOWN";                                   // 15
  if (directionY === "UP" && offsetY === 0) {                                                         // 16
    console.log("window.scroll passed this line", offsetY);                                           // 17
    _resetMessageSubLimit();                                                                          // 18
  }                                                                                                   //
};                                                                                                    //
                                                                                                      //
var _resetMessageSubLimit = function () {                                                             // 22
                                                                                                      //
  var before = Session.get("Message_Sub_Limit");                                                      // 24
  var after = before + _incrementalMessageLimit;                                                      // 25
  Session.set("Message_Sub_Limit", after);                                                            // 26
};                                                                                                    //
                                                                                                      //
IH.RC.ChatView = React.createClass({                                                                  // 29
  displayName: "ChatView",                                                                            //
                                                                                                      //
  mixins: [ReactMeteorData],                                                                          // 30
                                                                                                      //
  getInitialState: function () {                                                                      // 32
    return { messageSubLimit: _defaultMessagesLimit };                                                // 33
  },                                                                                                  //
  getMeteorData: function () {                                                                        // 35
    var channelId = this.props.channelID || FlowRouter.getParam("slug");                              // 36
    var messageLimit = Session.get("Message_Sub_Limit") || _defaultMessagesLimit;                     // 37
                                                                                                      //
    this.handle1 = Meteor.subscribe("ChatMessageList", channelId, messageLimit);                      // 39
    this.handle2 = Meteor.subscribe("ChatMessageUser", channelId);                                    // 40
                                                                                                      //
    this.subscriptionsReady = this.handle1.ready() && this.handle2.ready();                           // 42
                                                                                                      //
    var query = {                                                                                     // 44
      CHID: channelId                                                                                 // 45
    };                                                                                                //
    var options = {                                                                                   // 47
      sort: { createdAt: 1 }                                                                          // 48
    };                                                                                                //
                                                                                                      //
    var channel, messages;                                                                            // 51
                                                                                                      //
    if (this.subscriptionsReady) {                                                                    // 53
                                                                                                      //
      if (this.initialLoading) {                                                                      // 55
        IH.Action.ChatStatus.activateChannel(this.props.channelID);                                   // 56
        this.initialLoading = false;                                                                  // 57
      }                                                                                               //
                                                                                                      //
      channel = IH.Coll.ChatChannels.findOne(channelId);                                              // 60
      messages = IH.Coll.ChatMessages.find(query, options).map(function (m) {                         // 61
        user = Meteor.users.findOne(m.SID).profile;                                                   // 62
                                                                                                      //
        return {                                                                                      // 64
          from: m.SID,                                                                                // 65
          msg: m.content,                                                                             // 66
          date: m.createdAt,                                                                          // 67
          type: m.type,                                                                               // 68
          avatar: user.avatar,                                                                        // 69
          name: user.name,                                                                            // 70
          gender: user.gender                                                                         // 71
        };                                                                                            //
      });                                                                                             //
    }                                                                                                 //
                                                                                                      //
    return {                                                                                          // 76
      channel: channel,                                                                               // 77
      messages: messages                                                                              // 78
    };                                                                                                //
  },                                                                                                  //
  componentWillMount: function () {                                                                   // 81
    Session.set("Message_Sub_Limit", _defaultMessagesLimit);                                          // 82
    this.props.channelID = this.props.channelID || FlowRouter.getParam("slug");                       // 83
    this.initialLoading = true;                                                                       // 84
  },                                                                                                  //
  componentDidMount: function () {                                                                    // 86
    window.addEventListener("scroll", incrementalScroll);                                             // 87
  },                                                                                                  //
  componentWillUpdate: function () {                                                                  // 89
    var node = this.refs.messageContainer.getDOMNode();                                               // 90
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;               // 91
    //_currentScrollPosition = node.scrollHeight;                                                     //
  },                                                                                                  //
  componentDidUpdate: function () {                                                                   // 94
    var node = this.refs.messageContainer.getDOMNode();                                               // 95
                                                                                                      //
    if (this.handle1.ready() && this.handle2.ready()) {                                               // 97
      if (this.shouldScrollBottom) {                                                                  // 98
        console.log("node.scrollHeight in update ", node.scrollHeight);                               // 99
        if (_initLoading && this.data.messages) {                                                     // 100
          window.scrollTo(0, 10000);                                                                  // 101
          _initLoading = false;                                                                       // 102
        } else {                                                                                      //
          node.scrollTop = node.scrollHeight;                                                         // 104
        }                                                                                             //
      } else {                                                                                        //
        //console.log("_currentScrollPosition", _currentScrollPosition, node.scrollHeight)            //
                                                                                                      //
        node.scrollTop = _currentScrollPosition; // why this doesn't work??                           // 109
      }                                                                                               //
      _currentScrollPosition = node.scrollHeight;                                                     // 111
    }                                                                                                 //
  },                                                                                                  //
  componentWillUnmount: function () {                                                                 // 114
                                                                                                      //
    // web should use a different approach,                                                           //
    // e.g. remove from active channel list                                                           //
                                                                                                      //
    this.handle1.stop();                                                                              // 119
    this.handle2.stop();                                                                              // 120
    window.removeEventListener("scroll");                                                             // 121
                                                                                                      //
    IH.Action.ChatStatus.deActivateChannel(this.props.channelID);                                     // 123
    Session.set("ACTIVE_CHAT_CHANNEL", null);                                                         // 124
  },                                                                                                  //
  sendNewMessage: function (msg) {                                                                    // 126
    var message = {                                                                                   // 127
      type: "txt",                                                                                    // 128
      content: msg,                                                                                   // 129
      SID: Meteor.userId(),                                                                           // 130
      CHID: this.props.channelID                                                                      // 131
    };                                                                                                //
    IH.Action.ChatMessages.createMessage(message, this.props.channelID);                              // 133
  },                                                                                                  //
  takeNSendPhoto: function () {                                                                       // 135
                                                                                                      //
    // TODO: added "camera" button                                                                    //
                                                                                                      //
    if (Meteor.isCordova) {                                                                           // 139
      var msg;                                                                                        // 140
      Camera.getPicture({}, function (e, pic) {                                                       // 141
        if (e) {                                                                                      // 142
          Meteor.setTimeout(function () {                                                             // 143
            alert("e.message)");                                                                      // 144
          }, 0);                                                                                      //
        } else {                                                                                      //
          msg = pic;                                                                                  // 147
        }                                                                                             //
      });                                                                                             //
                                                                                                      //
      var message = {                                                                                 // 151
        type: "img",                                                                                  // 152
        content: msg,                                                                                 // 153
        SID: Meteor.userId(),                                                                         // 154
        CHID: this.props.channelID                                                                    // 155
      };                                                                                              //
      IH.Action.ChatMessages.createMessage(message, this.props.channelID);                            // 157
    } else {                                                                                          //
      alert("Web camera is not supported yet.");                                                      // 160
    }                                                                                                 //
  },                                                                                                  //
  getDataContent: function () {                                                                       // 163
    //return <IH.RC.ChatMessageList messages={this.data.messages} {...this.props}/>; // user props...
                                                                                                      //
    var lastMsg = {};                                                                                 // 166
    var userId = Meteor.userId();                                                                     // 167
                                                                                                      //
    return React.createElement(                                                                       // 169
      "div",                                                                                          //
      null,                                                                                           //
      _.map(this.data.messages, function (m, n) {                                                     //
        var first = n === 0 ? true : !(h.nk(lastMsg, "m.name") == h.nk(m, "m.name"));                 // 172
        var dateBreak = moment(m.date).format("MM/DD/YY");                                            // 173
        var lastBreak = n === 0 || !lastMsg.date ? null : moment(lastMsg.date).format("MM/DD/YY");    // 174
        lastMsg = m;                                                                                  // 175
                                                                                                      //
        // TODO: use <img> for type=="img"                                                            //
                                                                                                      //
        return React.createElement(RC.ChatBubble, {                                                   // 179
          key: n,                                                                                     // 180
          isUser: userId == m.from,                                                                   // 181
          showDateBreak: dateBreak != lastBreak,                                                      // 182
          firstOfGroup: first,                                                                        // 183
          message: m.msg,                                                                             // 184
          date: m.date,                                                                               // 185
          avatar: m.avatar,                                                                           // 186
          name: m.name,                                                                               // 187
          gender: m.gender                                                                            // 188
        });                                                                                           //
      }),                                                                                             //
      React.createElement(RC.ChatTextArea, { name: "message", onSubmit: this.sendNewMessage })        //
    );                                                                                                //
  },                                                                                                  //
                                                                                                      //
  render: function () {                                                                               // 197
    var subscriptionsReady = this.subscriptionsReady;                                                 // 198
                                                                                                      //
    return React.createElement(                                                                       // 200
      "div",                                                                                          //
      { ref: "messageContainer" },                                                                    //
      subscriptionsReady ? this.getDataContent() : React.createElement(                               //
        "p",                                                                                          //
        null,                                                                                         //
        "Loading..."                                                                                  //
      )                                                                                               //
    );                                                                                                //
  }                                                                                                   //
});                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:chat-engine'] = {
  Dispatcher: Dispatcher
};

})();
