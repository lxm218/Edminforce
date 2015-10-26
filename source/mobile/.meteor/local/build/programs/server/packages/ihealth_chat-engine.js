(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
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
var Accounts = Package['accounts-base'].Accounts;
var AccountsServer = Package['accounts-base'].AccountsServer;
var MeteorFlux = Package['meteorflux:namespace'].MeteorFlux;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var React = Package['react-runtime'].React;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var babelHelpers = Package['babel-runtime'].babelHelpers;

/* Package-scope variables */
var ChatDispatcher, __coffeescriptShare, Dispatcher;

(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/ihealth_chat-engine/dispatcher/dispatcher.js                         //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
                                                                                 // 1
                                                                                 // 2
IH.Store = {};  // TODO: move to utils                                           // 3
IH.Action = {};  // TODO: move to utils                                          // 4
                                                                                 // 5
ChatDispatcher = new MeteorFlux.Dispatcher();                                    // 6
                                                                                 // 7
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/ihealth_chat-engine/stores/messageStore.coffee.js                    //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
IH.Coll.ChatMessages = new Mongo.Collection("chat_message");                     // 2
                                                                                 //
IH.Schema.ChatMessages = new SimpleSchema({                                      // 2
  createdAt: {                                                                   // 5
    type: Date,                                                                  // 6
    index: -1,                                                                   // 6
    autoValue: function() {                                                      // 6
      if (this.isInsert) {                                                       // 9
        return new Date();                                                       //
      } else if (this.isUpsert) {                                                //
        return {                                                                 //
          $setOnInsert: new Date()                                               // 12
        };                                                                       //
      } else {                                                                   //
        return this.unset();                                                     //
      }                                                                          //
    },                                                                           //
    denyUpdate: true                                                             // 6
  },                                                                             //
  SID: {                                                                         // 5
    type: String,                                                                // 18
    label: "Sender ID"                                                           // 18
  },                                                                             //
  CHID: {                                                                        // 5
    type: String,                                                                // 22
    label: "Channel ID",                                                         // 22
    index: true                                                                  // 22
  },                                                                             //
  type: {                                                                        // 5
    type: String,                                                                // 27
    label: "Message Type",                                                       // 27
    autoValue: function() {                                                      // 27
      if (!this.isSet) {                                                         // 30
        return "txt";                                                            //
      }                                                                          //
    },                                                                           //
    optional: true                                                               // 27
  },                                                                             //
  content: {                                                                     // 5
    type: String                                                                 // 35
  }                                                                              //
});                                                                              //
                                                                                 //
IH.Coll.ChatMessages.attachSchema(IH.Schema.ChatMessages);                       // 2
                                                                                 //
IH.Coll.ChatMessages.allow({                                                     // 2
  insert: function(userId, doc) {                                                // 42
    return userId && userId === doc.SID;                                         //
  },                                                                             //
  update: function(userId, doc, fields, modifier) {                              // 42
    return false;                                                                //
  },                                                                             //
  remove: function(userId, doc, fields, modifier) {                              // 42
    return false;                                                                //
  },                                                                             //
  fetch: ["senderId"]                                                            // 42
});                                                                              //
                                                                                 //
IH.Store.ChatMessages = {};                                                      // 2
                                                                                 //
IH.Store.ChatMessages.dispatchToken = ChatDispatcher.register(function(action) {
  var insertObj;                                                                 // 62
  switch (action.type) {                                                         // 62
    case "CREATE_NEW_MESSAGE":                                                   // 62
      return IH.Coll.ChatMessages.insert(action.message);                        //
    case "DOCTOR_JOINED_CHANNEL":                                                // 62
      insertObj = {                                                              // 69
        SID: "system",                                                           // 70
        CHID: action.channelID,                                                  // 70
        type: "note",                                                            // 70
        content: action.doctor + " joined channel"                               // 70
      };                                                                         //
      return IH.Coll.ChatMessages.insert(insertObj);                             //
  }                                                                              // 62
});                                                                              // 60
                                                                                 //
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/ihealth_chat-engine/stores/channelStore.coffee.js                    //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LastMsgSchema;                                                               // 3
                                                                                 //
LastMsgSchema = new SimpleSchema({                                               // 3
  createdAt: {                                                                   // 4
    type: Date                                                                   // 5
  },                                                                             //
  from: {                                                                        // 4
    type: String,                                                                // 8
    label: "Sender ID"                                                           // 8
  },                                                                             //
  content: {                                                                     // 4
    type: String                                                                 // 12
  }                                                                              //
});                                                                              //
                                                                                 //
IH.Coll.ChatChannels = new Mongo.Collection("chat_channel");                     // 3
                                                                                 //
IH.Schema.ChatChannels = new SimpleSchema({                                      // 3
  createdAt: {                                                                   // 18
    type: Date,                                                                  // 19
    index: -1,                                                                   // 19
    autoValue: function() {                                                      // 19
      if (this.isInsert) {                                                       // 22
        return new Date();                                                       //
      } else if (this.isUpsert) {                                                //
        return {                                                                 //
          $setOnInsert: new Date()                                               // 25
        };                                                                       //
      } else {                                                                   //
        return this.unset();                                                     //
      }                                                                          //
    }                                                                            //
  },                                                                             //
  updatedAt: {                                                                   // 18
    type: Date,                                                                  // 30
    autoValue: function() {                                                      // 30
      if (this.isUpdate) {                                                       // 32
        return new Date();                                                       //
      }                                                                          //
    },                                                                           //
    optional: true,                                                              // 30
    denyInsert: true                                                             // 30
  },                                                                             //
  PID: {                                                                         // 18
    type: String,                                                                // 38
    label: "Patient ID"                                                          // 38
  },                                                                             //
  DID: {                                                                         // 18
    type: String,                                                                // 42
    label: "Primary Doctor of this Channel"                                      // 42
  },                                                                             //
  others: {                                                                      // 18
    type: [String],                                                              // 46
    label: "List of Other Doctors' IDs",                                         // 46
    autoValue: function() {                                                      // 46
      if (this.isInsert && !this.isSet) {                                        // 49
        return [];                                                               // 50
      }                                                                          //
    }                                                                            //
  },                                                                             //
  lastMsg: {                                                                     // 18
    type: LastMsgSchema,                                                         // 53
    label: "last message of channel",                                            // 53
    optional: true                                                               // 53
  }                                                                              //
});                                                                              //
                                                                                 //
IH.Coll.ChatChannels.attachSchema(IH.Schema.ChatChannels);                       // 3
                                                                                 //
IH.Coll.ChatChannels.allow({                                                     // 3
  insert: function() {                                                           // 63
    return true;                                                                 //
  },                                                                             //
  update: function() {                                                           // 63
    return true;                                                                 //
  },                                                                             //
  remove: function() {                                                           // 63
    return false;                                                                //
  }                                                                              //
});                                                                              //
                                                                                 //
IH.Store.ChatChannels = {                                                        // 3
  create: function(patient, doctor) {                                            // 75
    var newChannel;                                                              // 76
    newChannel = {                                                               // 76
      PID: patient,                                                              // 77
      DID: doctor,                                                               // 77
      others: []                                                                 // 77
    };                                                                           //
    return IH.Coll.ChatChannels.insert(newChannel);                              //
  },                                                                             //
  addUser: function(channelID, doctor) {                                         // 75
    return IH.Coll.ChatChannels.update(channelID, {                              //
      $push: {                                                                   // 83
        others: doctor                                                           // 83
      }                                                                          //
    });                                                                          //
  },                                                                             //
  removeUser: function(channelID, doctor) {                                      // 75
    return IH.Coll.ChatChannels.update(channelID, {                              //
      $pull: {                                                                   // 86
        others: doctor                                                           // 86
      }                                                                          //
    });                                                                          //
  },                                                                             //
  updateLastMsg: function(m) {                                                   // 75
    var updateMsg;                                                               // 89
    updateMsg = {                                                                // 89
      createdAt: new Date(),                                                     // 90
      from: m.SID,                                                               // 90
      content: m.content                                                         // 90
    };                                                                           //
    return IH.Coll.ChatChannels.update(m.CHID, {                                 //
      $set: {                                                                    // 94
        lastMsg: updateMsg                                                       // 94
      }                                                                          //
    });                                                                          //
  }                                                                              //
};                                                                               //
                                                                                 //
IH.Store.ChatChannels.dispatchToken = ChatDispatcher.register(function(action) {
  switch (action.type) {                                                         // 100
    case "NEW_CONTACTS_CREATED":                                                 // 100
      return IH.Store.ChatChannels.create(action.patient, action.doctor);        //
    case "DOCTOR_JOINED_CHANNEL":                                                // 100
      return IH.Store.ChatChannels.addUser(action.channelID, action.doctor);     //
    case "DOCTOR_LEFT_CHANNEL":                                                  // 100
      return IH.Store.ChatChannels.removeUser(action.channelID, action.doctor);  //
    case "USER_ACTIVATE_CHANNEL":                                                // 100
      if (Meteor.isClient) {                                                     // 112
        return Session.set("ACTIVE_CHAT_CHANNEL", action.channelID);             //
      }                                                                          //
      break;                                                                     // 111
    case "CREATE_NEW_MESSAGE":                                                   // 100
      ChatDispatcher.waitFor([IH.Store.ChatMessages.dispatchToken]);             // 116
      if (Meteor.isClient) {                                                     // 117
        return IH.Store.ChatChannels.updateLastMsg(action.message);              //
      }                                                                          //
  }                                                                              // 100
});                                                                              // 98
                                                                                 //
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/ihealth_chat-engine/stores/statusStore.coffee.js                     //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _fetchAllOtherChannelUsers, _getStatusID;                                    // 2
                                                                                 //
IH.Coll.ChatStatus = new Mongo.Collection("chat_status");                        // 2
                                                                                 //
IH.Schema.ChatStatus = new SimpleSchema({                                        // 2
  createdAt: {                                                                   // 5
    type: Date,                                                                  // 6
    index: -1,                                                                   // 6
    autoValue: function() {                                                      // 6
      if (this.isInsert) {                                                       // 9
        return new Date();                                                       //
      } else if (this.isUpsert) {                                                //
        return {                                                                 //
          $setOnInsert: new Date()                                               // 12
        };                                                                       //
      } else {                                                                   //
        return this.unset();                                                     //
      }                                                                          //
    }                                                                            //
  },                                                                             //
  updatedAt: {                                                                   // 5
    type: Date,                                                                  // 17
    autoValue: function() {                                                      // 17
      if (this.isUpdate) {                                                       // 19
        return new Date();                                                       //
      }                                                                          //
    },                                                                           //
    optional: true,                                                              // 17
    denyInsert: true                                                             // 17
  },                                                                             //
  UID: {                                                                         // 5
    type: String,                                                                // 25
    label: "User ID"                                                             // 25
  },                                                                             //
  CHID: {                                                                        // 5
    type: String,                                                                // 29
    label: "Channel ID"                                                          // 29
  },                                                                             //
  active: {                                                                      // 5
    type: Boolean,                                                               // 33
    label: "Channel is active",                                                  // 33
    autoValue: function() {                                                      // 33
      if (this.isInsert) {                                                       // 36
        return false;                                                            //
      }                                                                          //
    }                                                                            //
  },                                                                             //
  numUnread: {                                                                   // 5
    type: Number,                                                                // 40
    label: "Number of unread message per User+Channel",                          // 40
    optional: true,                                                              // 40
    autoValue: function() {                                                      // 40
      if (this.isInsert) {                                                       // 44
        return 0;                                                                // 45
      }                                                                          //
    }                                                                            //
  }                                                                              //
});                                                                              //
                                                                                 //
IH.Coll.ChatStatus.attachSchema(IH.Schema.ChatStatus);                           // 2
                                                                                 //
IH.Coll.ChatStatus.allow({                                                       // 2
  insert: function() {                                                           // 59
    return true;                                                                 //
  },                                                                             //
  update: function(userId, doc) {                                                // 59
    return userId && userId === doc.UID;                                         //
  },                                                                             //
  remove: function() {                                                           // 59
    return false;                                                                //
  }                                                                              //
});                                                                              //
                                                                                 //
_fetchAllOtherChannelUsers = function(cid, uid) {                                // 2
  var chnl;                                                                      // 71
  chnl = IH.Coll.ChatChannels.findOne(cid);                                      // 71
  return allChannelUsers;                                                        // 74
};                                                                               // 70
                                                                                 //
_getStatusID = function(action) {                                                // 2
  var channelID, status, statusID;                                               // 77
  channelID = action.message != null ? action.message.CHID : action.channelID;   // 77
  status = IH.Coll.ChatStatus.findOne({                                          // 77
    UID: Meteor.userId(),                                                        // 78
    CHID: channelID                                                              // 78
  });                                                                            //
  if (status != null) {                                                          // 79
    statusID = status._id;                                                       // 80
  }                                                                              //
  return statusID;                                                               // 81
};                                                                               // 76
                                                                                 //
IH.Store.ChatStatus = {                                                          // 2
  incUnreadCount: function(sid) {                                                // 88
    var status;                                                                  // 90
    status = IH.Coll.ChatStatus.findOne(sid);                                    // 90
    if (!status.active) {                                                        // 91
      return IH.Coll.ChatStatus.update(sid, {                                    //
        $inc: {                                                                  // 92
          numUnread: 1                                                           // 92
        }                                                                        //
      });                                                                        //
    }                                                                            //
  },                                                                             //
  clearUnreadCount: function(sid) {                                              // 88
    return IH.Coll.ChatStatus.update(sid, {                                      //
      $set: {                                                                    // 95
        active: true,                                                            // 95
        numUnread: 0                                                             // 95
      }                                                                          //
    });                                                                          //
  },                                                                             //
  deActivate: function(sid) {                                                    // 88
    return IH.Coll.ChatStatus.update(sid, {                                      //
      $set: {                                                                    // 98
        active: false                                                            // 98
      }                                                                          //
    });                                                                          //
  }                                                                              //
};                                                                               //
                                                                                 //
IH.Store.ChatStatus.dispatchToken = ChatDispatcher.register(function(action) {   // 2
  var statusID;                                                                  // 104
  statusID = _getStatusID(action);                                               // 104
  if (statusID == null) {                                                        // 105
    console.error("channel status not found");                                   // 106
  }                                                                              //
  switch (action.type) {                                                         // 108
    case "CREATE_NEW_MESSAGE":                                                   // 108
      ChatDispatcher.waitFor([IH.Store.ChatMessages.dispatchToken]);             // 111
      return IH.Store.ChatStatus.incUnreadCount(statusID);                       //
    case "USER_ACTIVATE_CHANNEL":                                                // 108
      return IH.Store.ChatStatus.clearUnreadCount(statusID);                     //
    case "USER_LEFT_CHANNEL":                                                    // 108
      return IH.Store.ChatStatus.deActivate(statusID);                           //
  }                                                                              // 108
});                                                                              // 102
                                                                                 //
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/ihealth_chat-engine/actions/channelActions.coffee.js                 //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
IH.Action.ChatChannels = {                                                       // 2
  setChannelActive: function(channelID) {                                        // 4
    return ChatDispatcher.dispatch({                                             //
      type: "USER_ACTIVATE_CHANNEL",                                             // 6
      channelID: channelID                                                       // 6
    });                                                                          //
  }                                                                              //
};                                                                               //
                                                                                 //
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/ihealth_chat-engine/actions/messageActions.coffee.js                 //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
IH.Action.ChatMessages = {                                                       // 2
  createMessage: function(message, channelID) {                                  // 4
    return ChatDispatcher.dispatch({                                             //
      type: "CREATE_NEW_MESSAGE",                                                // 6
      message: message                                                           // 6
    });                                                                          //
  }                                                                              //
};                                                                               //
                                                                                 //
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/ihealth_chat-engine/actions/statusActions.coffee.js                  //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
IH.Action.ChatStatus = {                                                         // 2
  activateChannel: function(channelID) {                                         // 4
    return ChatDispatcher.dispatch({                                             //
      type: "USER_ACTIVATE_CHANNEL",                                             // 6
      channelID: channelID                                                       // 6
    });                                                                          //
  },                                                                             //
  deActivateChannel: function(channelID) {                                       // 4
    return ChatDispatcher.dispatch({                                             //
      type: "USER_LEFT_CHANNEL",                                                 // 12
      channelID: channelID                                                       // 12
    });                                                                          //
  }                                                                              //
};                                                                               //
                                                                                 //
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/ihealth_chat-engine/publications.coffee.js                           //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish("ChatMessageList", function(channelID, limit) {                   // 2
  if (!this.userId) {                                                            // 3
    return this.error("Not logged in");                                          //
  } else {                                                                       //
    console.log(limit);                                                          // 7
    check(channelID, String);                                                    // 7
    check(limit, Number);                                                        // 7
    return IH.Coll.ChatMessages.find({                                           //
      CHID: channelID                                                            // 12
    }, {                                                                         //
      sort: {                                                                    // 14
        createdAt: -1                                                            // 14
      },                                                                         //
      limit: limit                                                               // 14
    });                                                                          //
  }                                                                              //
});                                                                              // 2
                                                                                 //
Meteor.publishComposite("ChatMessageUser", function(channelID) {                 // 2
  if (!this.userId) {                                                            // 19
    return this.error("Not logged in");                                          //
  } else {                                                                       //
    check(channelID, String);                                                    // 22
    return {                                                                     //
      find: function() {                                                         // 24
        return IH.Coll.ChatStatus.find({                                         //
          CHID: channelID                                                        // 25
        });                                                                      //
      },                                                                         //
      children: [                                                                // 24
        {                                                                        //
          find: function(status) {                                               // 27
            return Meteor.users.find({                                           //
              _id: status.UID                                                    // 29
            }, {                                                                 //
              fields: {                                                          // 31
                "profile.name": 1,                                               // 31
                "profile.avatar": 1,                                             // 31
                "profile.gender": 1                                              // 31
              }                                                                  //
            });                                                                  //
          }                                                                      //
        }, {                                                                     //
          find: function(status) {                                               // 34
            return IH.Coll.ChatChannels.find(channelID);                         //
          }                                                                      //
        }                                                                        //
      ]                                                                          //
    };                                                                           //
  }                                                                              //
});                                                                              // 18
                                                                                 //
Meteor.publishComposite("ChatChannelList", function() {                          // 2
  if (!this.userId) {                                                            // 39
    return this.error("Not logged in");                                          //
  } else {                                                                       //
    return {                                                                     //
      find: function() {                                                         // 42
        return IH.Coll.ChatStatus.find({                                         //
          UID: this.userId                                                       // 43
        });                                                                      //
      },                                                                         //
      children: [                                                                // 42
        {                                                                        //
          find: function(status) {                                               // 45
            return IH.Coll.ChatChannels.find(status.CHID);                       //
          },                                                                     //
          children: [                                                            // 45
            {                                                                    //
              find: function(channel, status) {                                  // 48
                var uid;                                                         // 49
                uid = channel.DID === this.userId ? channel.PID : channel.DID;   // 49
                return Meteor.users.find({                                       //
                  _id: uid                                                       // 51
                }, {                                                             //
                  fields: {                                                      // 53
                    "profile.name": 1,                                           // 53
                    "profile.avatar": 1                                          // 53
                  }                                                              //
                });                                                              //
              }                                                                  //
            }                                                                    //
          ]                                                                      //
        }                                                                        //
      ]                                                                          //
    };                                                                           //
  }                                                                              //
});                                                                              // 38
                                                                                 //
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/ihealth_chat-engine/methods.coffee.js                                //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                 // 3
  recallMessage: function(messageId) {                                           // 5
    var lapse, message, now;                                                     // 6
    check(messageId, String);                                                    // 6
    message = Chat.Messages.findOne(messageId);                                  // 6
    if (!message) {                                                              // 9
      throw new Meteor.error("message doesn't exist");                           // 10
    }                                                                            //
    if (!(this.userId && this.userId === message.from)) {                        // 12
      throw new Meteor.error("user has no right to delete the message");         // 13
    } else {                                                                     //
      now = new Date();                                                          // 19
      lapse = now - message.createdAt;                                           // 19
      if (lapse > 60000) {                                                       // 22
        throw new Meteor.error("can't recall a message after 5 minutes");        // 23
      } else {                                                                   //
        return Chat.Messages.remove(messageId);                                  //
      }                                                                          //
    }                                                                            //
  }                                                                              //
});                                                                              //
                                                                                 //
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/ihealth_chat-engine/temp.coffee.js                                   //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                 // 1
                                                                                 //
///////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:chat-engine'] = {
  Dispatcher: Dispatcher
};

})();

//# sourceMappingURL=ihealth_chat-engine.js.map
