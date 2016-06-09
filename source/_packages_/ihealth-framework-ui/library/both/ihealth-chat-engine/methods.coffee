

Meteor.methods

  recallMessage: (messageId) ->
    check(messageId, String)

    message = Chat.Messages.findOne(messageId)
    unless message
      throw new Meteor.error("message doesn't exist")

    unless (@userId and @userId is message.from)
      throw new Meteor.error("user has no right to delete the message")

    # In Healthcare settings, doctors or patients,
    # should be responsible for the contents they send.
    # They should not be able to recall history messages
    else
      now = new Date()
      lapse = now - message.createdAt         # TODO: h.getTimeDifferentByMinutes()

      if lapse > 60000
        throw new Meteor.error("can't recall a message after 5 minutes")
      else
        Chat.Messages.remove(messageId)