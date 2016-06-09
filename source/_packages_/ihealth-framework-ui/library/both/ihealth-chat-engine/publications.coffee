
channelPubUserFields =
  "profile.firstName":1,
  "profile.lastName":1,
  "profile.avatar":1

# ********************* Pubs *************************

Meteor.publish "ChatMessageList", (channelID, limit)->
  unless @userId
    @error("Not logged in")
  else

    console.log limit
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
          fields: channelPubUserFields
        )
    ,
      find: (status) ->
        IH.Coll.ChatChannels.find(channelID)
    ]

Meteor.publishComposite "ChatChannelListPatient", (activeOnly) ->
  unless @userId
    @error("Not logged in")
  else
    check(activeOnly, Boolean)

    query = {PID: @userId}
    if activeOnly
      _.extend query, {lastMsg: {$exists: true}}

    find: ->
      IH.Coll.ChatChannels.find(query)
    children: [
      find: (channel)->
        uid = channel.DID
        Meteor.users.find(
          _id: uid
        ,
          fields: channelPubUserFields
        )
    ]

Meteor.publishComposite "ChatChannelListDoctor", ->
  unless @userId
    @error("Not logged in")
  else
    find: ->
      IH.Coll.ChatChannels.find({all: @userId, lastMsg: {$exists: true}})
    children: [
      find: (channel)->
        uid = channel.PID
        Meteor.users.find(
          _id: uid
        ,
          fields: channelPubUserFields
        )
    ]

Meteor.publishComposite "ChatChannelList", ->
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
          uid = if channel.DID is @userId then channel.PID else channel.DID   # temp solutions
          Meteor.users.find(
            _id: uid
          ,
            fields: {
              "profile.firstName":1,
              "profile.lastName":1,
              "profile.avatar":1
            }
          )
      ]
    ]
