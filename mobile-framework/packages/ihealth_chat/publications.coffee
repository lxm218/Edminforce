
Meteor.publishComposite "ChatHistoryWithContact", (contactId, limit)->
  unless @userId
    @error("Not logged in")
  else
    check(contactId, String)
    check(limit, Number)

    find: ->
      Meteor.users.find(contactId)
    children: [
      find: (contact)->
        Chat.Messages.find
          $or: [
            {from: @userId, to: contact._id},
            {to: @userId, from: contact._id}
          ]
        ,
          sort: { createdAt: -1 }
          limit: limit
    ]


## TODO: Chat Session pub/sub