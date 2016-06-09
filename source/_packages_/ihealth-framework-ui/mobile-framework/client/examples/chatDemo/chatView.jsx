
App.ChatView = React.createClass({
  render() {
    return <IH.RC.ChatView channelID={FlowRouter.getParam("slug")}/>
  }
})