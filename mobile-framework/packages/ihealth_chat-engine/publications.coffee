
Meteor.publish "ChatMessageList", (channelID, limit)->
  unless @userId
    @error("Not logged in")
  else
    check(channelID, String)
    check(limit, Number)

    IH.Coll.ChatMessages.find(
      CHID: channelID
    ,
      sort: { createdAt: -1 }
      limit: limit
    )

Meteor.publishComposite "ChatMessageUser", (channelID)->
  unless @userId
    @error("Not logged in")
  else
    check(channelID, String)

    find: ->
      IH.Coll.ChatStatus.find({CHID: channelID})
    children: [
      find: (status) ->
        Meteor.users.find(
          _id: status.UID
        ,
          fields: {"profile.name":1, "profile.avatar":1,"profile.gender":1}
        )
    ,
      find: (status) ->
        IH.Coll.ChatChannels.find(channelID)
    ]

Meteor.publishComposite "PatientChatChannelList", ->
  unless @userId
    @error("Not logged in")
  else
    find: ->
      IH.Coll.ChatStatus.find({UID:@userId})
    children: [
      find: (status)->
        IH.Coll.ChatChannels.find(status.CHID)
      children: [
        find: (channel, status)->
          Meteor.users.find(
            _id: channel.DID
          ,
            fields: {"profile.name":1,"profile.avatar":1}
          )
      ]
    ]
