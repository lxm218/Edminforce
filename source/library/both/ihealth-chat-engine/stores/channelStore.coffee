

LastMsgSchema = new SimpleSchema
  createdAt:
    type: Date

  from:
    type: String
    label: "Sender ID"

  content:
    type: String


IH.Coll.ChatChannels = new Mongo.Collection("chat_channel")
IH.Schema.ChatChannels = new SimpleSchema

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

  updatedAt:
    type: Date
    autoValue: ->
      if @isUpdate
        new Date()
    optional: true
    denyInsert: true

  PID:
    type: String
    label: "Patient ID"

  DID:
    type: String
    label: "Primary Doctor of this Channel"

  all:
    type: [ String ]
    label: "List of All Doctors' IDs"
    autoValue: ->
      if @isInsert
        unless @isSet
          return [ @field("DID") ]
        else
          return @value.push(DID)

  others:
    type: [ String ]
    label: "List of Other Doctors' IDs"
    optional: true
    autoValue: ->
      if @isInsert and not @isSet
        return []

  lastMsg:
    type: LastMsgSchema
    label: "last message of channel"
    optional: true


IH.Coll.ChatChannels.attachSchema IH.Schema.ChatChannels


IH.Coll.ChatChannels.allow

  insert: ->
    true

  update: ->
    true

  remove: ->
    false


IH.Store.ChatChannels =

  create: (patient, doctor) ->
    newChannel =
      PID: patient
      DID: doctor
      others: []
    IH.Coll.ChatChannels.insert(newChannel)

  addUser: (channelID, doctor) ->
    IH.Coll.ChatChannels.update(channelID, {$push: {others: doctor}})

  removeUser: (channelID, doctor) ->
    IH.Coll.ChatChannels.update(channelID, {$pull: {others: doctor}})

  updateLastMsg: (m) ->
    switch m.type
      when "txt"
        content = m.content
      when "img"
        content = "[Picture Content]"

    updateMsg =
      createdAt: new Date()
      from: m.SID
      content: content

    IH.Coll.ChatChannels.update(m.CHID, {$set: {lastMsg: updateMsg}})


# dispatcher token
IH.Store.ChatChannels.dispatchToken = ChatDispatcher.register (action)->

  switch action.type

    when "NEW_CONTACTS_CREATED"
      IH.Store.ChatChannels.create(action.patient, action.doctor)

    when "DOCTOR_JOINED_CHANNEL"
      IH.Store.ChatChannels.addUser(action.channelID, action.doctor)

    when "DOCTOR_LEFT_CHANNEL"
      IH.Store.ChatChannels.removeUser(action.channelID, action.doctor)

    when "USER_ACTIVATE_CHANNEL"
      if Meteor.isClient
        Session.set("ACTIVE_CHAT_CHANNEL", action.channelID)

    when "CREATE_NEW_MESSAGE"
      ChatDispatcher.waitFor([IH.Store.ChatMessages.dispatchToken])
      if Meteor.isClient
        IH.Store.ChatChannels.updateLastMsg(action.message)
