
IH.Action.ChatStatus =

  activateChannel: (statusID, channelID)->
    ChatDispatcher.dispatch(
      type: "USER_ACTIVATE_CHANNEL"
      statusID: statusID
      channelID: channelID
    )

  deActivateChannel: (statusID, channelID)->
    ChatDispatcher.dispatch(
      type: "USER_LEFT_CHANNEL"
      statusID: statusID
      channelID: channelID
    )