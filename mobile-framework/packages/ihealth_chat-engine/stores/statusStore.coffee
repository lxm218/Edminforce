
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


IH.Store.ChatStatus =

  incUnreadCount: (m, cid) ->
    uid = m.UID
    cid = m.CHID
    # _fetchAllOtherChannelUsers (except uid)
    # do a _.each
    IH.Coll.ChatStatus.update({UID: uid, CHID: cid, active: false}, {$inc: {numUnread: 1}})

  clearUnreadCount: (sid) ->
    IH.Coll.ChatStatus.update(sid, {$set: {active: true, numUnread: 0}})

  # TODO: problem, not atomic
  deActivate: (sid) ->
    IH.Coll.ChatStatus.update(sid, {$set: {active: false}})


# dispatcher token
IH.Store.ChatStatus.dispatchToken = ChatDispatcher.register (action)->

  switch action.type

    when "CREATE_NEW_MESSAGE"
      ChatDispatcher.waitFor([IH.Store.ChatMessages.dispatchToken])
      IH.Store.ChatStatus.incUnreadCount(action.message)

    when "USER_ACTIVATE_CHANNEL"
      IH.Store.ChatStatus.clearUnreadCount(action.statusID)

    when "USER_LEFT_CHANNEL"
      IH.Store.ChatStatus.deActivate(action.statusID)



