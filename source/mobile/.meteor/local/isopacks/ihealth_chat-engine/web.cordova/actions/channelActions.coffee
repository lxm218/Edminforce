
IH.Action.ChatChannels =

  setChannelActive: (channelID) ->
    ChatDispatcher.dispatch(
      type: "USER_ACTIVATE_CHANNEL"
      channelID: channelID
    )

# TODO: RequestToAddUser