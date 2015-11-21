
IH.Action.ChatMessages =

  createMessage: (message, channelID) ->
    ChatDispatcher.dispatch(
      type: "CREATE_NEW_MESSAGE"
      message: message
#      channelID: channelID
    )