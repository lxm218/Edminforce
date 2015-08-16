
@Chat = {}

Chat.Messages = new Mongo.Collection "chat_message"

IH.schemas.ChatMessage = new SimpleSchema

  createdAt:
    type: Date
    index: -1
    autoValue: ->
      if @isInsert
        new Date()
      else if @isUpsert
        $setOnInsert: new Date()
      else
        @unset()
    denyUpdate: true

  updatedAt:
    type: Date
    label: "When chat message is updated (read: false->true)"
    autoValue: ->
      if @isUpdate
        new Date()
      else
        @unset()
    denyInsert: true

  from:
    type: String
    label: "Sender userId"
    index: true

  to:
    type: String
    label: "Receiver userId"
    index: true

  msg:
    type: String

  read:
    type: Boolean
    index: true
    autoValue: ->
      if @isInsert
        false
      else if @isSet and @value is true
        @value
      else
        @unset()

  sessionId:
    type: String
    label: "The id of the chat session(conversation)"


Chat.Messages.attachSchema IH.schemas.

Chat.Messages.allow
  insert: (userId, doc) ->
    userId and userId is doc.from

  update: (userId, doc, fields, modifier) ->
    userId and userId is doc.from and _.contains(fields, "read")
#    userId and userId is doc.from and fields.length is 1 and fileds[0] is "read"

  remove: (userId, doc, fields, modifier) ->
    false

  fetch: ["from", "read"]


Chat.Messages.before.insert (userId, doc) ->
  _.extend doc, {from: userId, read: false}
  return doc


Chat.Messages.after.insert (userId, doc) ->

  # should be done on the server

  ###

  latestSession = getLatestSession(userId, receiverId)
  if doc.createdAt > latestSession.updatedAt + 5 mins
    sessionId = Chat.Sessions.insert(...)
    Chat.Messages.update(doc._id, {$set:{sessionId:sessionId}})

  else
    Chat.Sessions.update(latestSession._id, {$push:{msgs:doc._id}})
    Chat.Messages.update(doc._id, {$set:{sessionId:latestSession._id}})



  ###
