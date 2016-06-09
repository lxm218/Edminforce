
IH.Coll.ChatStatus = new Mongo.Collection("chat_status")
IH.Schema.ChatStatus = new SimpleSchema

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

  UID:
    type: String
    label: "User ID"

  CHID:
    type: String
    label: "Channel ID"

  active:
    type: Boolean
    label: "Channel is active"
    autoValue: ->
      if @isInsert
        false

  numUnread:
    type: Number
    label: "Number of unread message per User+Channel"
    optional: true
    autoValue: ->
      if @isInsert
        return 0



#TODO: put in users collections (related to this.active)
#  status:
#    type: String
#    label: ""

IH.Coll.ChatStatus.attachSchema IH.Schema.ChatStatus


IH.Coll.ChatStatus.allow

  insert: ->
    true

  update: (userId, doc) ->
    userId and userId is doc.UID

  remove: ->
    false

# methods

_fetchAllOtherChannelUsers = (cid, uid) ->
  chnl = IH.Coll.ChatChannels.findOne(cid)
#   _.filter allChannelUsers, (user) ->
#    return user isnt cid
  return allChannelUsers

_getStatusID = (action) ->
  channelID = if action.message? then action.message.CHID else action.channelID
  status = IH.Coll.ChatStatus.findOne({UID: Meteor.userId(), CHID: channelID})
  if status?
    statusID = status._id
  return statusID


# TODO: sid should be a list of all user_status in this channel

IH.Store.ChatStatus =

  incUnreadCount: (sid) ->
    # _fetchAllOtherChannelUsers (except uid)
    status = IH.Coll.ChatStatus.findOne(sid)
    unless status.active
      IH.Coll.ChatStatus.update(sid, {$inc: {numUnread: 1}})

  clearUnreadCount: (sid) ->
    IH.Coll.ChatStatus.update(sid, {$set: {active: true, numUnread: 0}})

  deActivate: (sid) ->
    IH.Coll.ChatStatus.update(sid, {$set: {active: false}})


# dispatcher token
IH.Store.ChatStatus.dispatchToken = ChatDispatcher.register (action)->

  statusID = _getStatusID(action)
  unless statusID?
    console.error "channel status not found"

  switch action.type

    when "CREATE_NEW_MESSAGE"
      ChatDispatcher.waitFor([IH.Store.ChatMessages.dispatchToken])
      IH.Store.ChatStatus.incUnreadCount(statusID)

    when "USER_ACTIVATE_CHANNEL"
      IH.Store.ChatStatus.clearUnreadCount(statusID)

    when "USER_LEFT_CHANNEL"
      IH.Store.ChatStatus.deActivate(statusID)



