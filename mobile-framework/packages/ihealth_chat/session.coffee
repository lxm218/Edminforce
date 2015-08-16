
Chat.Sesssions = new Mongo.Collection("chat_session")

IH.schemas.ChatSessions = new SimpleSchema

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
    autoValue: ->
      if @isUpdate
        new Date()
    denyInsert: true

  users:
    type: [ String ]
    label: " List of userId's in the conversation(session) "

  msgs:
    type: [ String ]
    label: " List of chat message id's "