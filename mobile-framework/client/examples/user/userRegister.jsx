
App.User_Registration_Only = React.createClass({
  render() {
    /**
     * You can change the action to "register" to display a different form.
     * You can also set "allowSwitch" to false to disable switching back and forth.
     */
    return <IH.RC.User fullHeight={true} action="register" disableSwitch={true} theme="overlay-dark" bgColor="white">
     <img src="/assets/logo.png" />
   </IH.RC.User>
  }
})
