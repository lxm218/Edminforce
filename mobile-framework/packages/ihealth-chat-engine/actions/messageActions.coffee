
IH.Action.ChatMessages =

  createMessage: (message) ->
    ChatDispatcher.dispatch(
      type: "CREATE_NEW_MESSAGE"
      message: message
    )