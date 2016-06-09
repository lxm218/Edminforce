
IH.Action.ChatStatus =

  activateChannel: (channelID)->
    ChatDispatcher.dispatch(
      type: "USER_ACTIVATE_CHANNEL"
      channelID: channelID
    )

  deActivateChannel: (channelID)->
    ChatDispatcher.dispatch(
      type: "USER_LEFT_CHANNEL"
      channelID: channelID
    )