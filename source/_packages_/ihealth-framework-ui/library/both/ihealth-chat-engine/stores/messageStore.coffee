
IH.Coll.ChatMessages = new Mongo.Collection "chat_message"
IH.Schema.ChatMessages = new SimpleSchema

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

  SID:
    type: String
    label: "Sender ID"

  CHID:
    type: String
    label: "Channel ID"
    index: true

  type:
    type: String
    label: "Message Type"    # "txt", "img", "file", "note", "audio", "video", etc
    autoValue: ->
      unless @isSet
        "txt"
    optional: true

  content:
    type: String    # ?



IH.Coll.ChatMessages.attachSchema IH.Schema.ChatMessages

IH.Coll.ChatMessages.allow
  insert: (userId, doc) ->
    userId and userId is doc.SID

  update: (userId, doc, fields, modifier) ->
    false

  remove: (userId, doc, fields, modifier) ->
    false

  fetch: ["senderId"]

#
#IH.Coll.ChatMessages.before.insert (userId, doc) ->
#  _.extend doc, {from: userId, read: false}
#  return doc

IH.Store.ChatMessages = {}

IH.Store.ChatMessages.dispatchToken = ChatDispatcher.register (action)->

  switch action.type

    when "CREATE_NEW_MESSAGE"
      IH.Coll.ChatMessages.insert(action.message)

    when "DOCTOR_JOINED_CHANNEL"
#      username =  # need to fetch username from ID
      insertObj =
        SID: "system"
        CHID: action.channelID
        type: "note"
        content: "#{action.doctor} joined channel"
      IH.Coll.ChatMessages.insert(insertObj)


