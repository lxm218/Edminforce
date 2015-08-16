Chat_Views = new Mongo.Collection("phoneChatView")
Chat_Sessions = new Mongo.Collection("chatSessions")

// Schema copied from OasisPD app
Schema.Chat_Views = new SimpleSchema({
  senderMeteorId: {
    type: String,
  },
  receiverMeteorId: {
    type: String,
  },
  receiverIHealthID: {
    type: String,
  },
  token: {
    type: String,
  },
  expiredAt: {
    type: Date,
  }
})

Schema.Chat_Sessions = new SimpleSchema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  initTime: {
    type: Date,
  },
  endTime: {
    type: Date,
    optional: true
  },
  msgs: {
    type: [Object],
    optional: true
  },
  "msgs.direction": {
    type: String,
  },
  "msgs.content": {
    type: String,
    optional: true
  },
  "msgs.time": {
    type: Date,
  }
})

if (Meteor.isServer) {
  /**
   * ##################################
   * Server Code
   * ##################################
   */
  Meteor.publish("chat_log", function(user_id){
    if (!user_id) return this.ready()

    var viewCond = { $or: [
      { receiverMeteorId: user_id },
      { senderMeteorId: user_id }
    ]}
    var sessionCond = { $or: [
      { from: user_id },
      { to: user_id }
    ]}

    return [
      Chat_Views.find(viewCond),
      Chat_Sessions.find(sessionCond)
    ]
  })
}
