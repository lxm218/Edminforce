
App.User_Login_Coloured = React.createClass({
  render() {
    /**
     * Notice how I used the .bg-brand class to style the login form.
     * Classes such as .bg-brand, .bg-brand2, .bg-brand3 are worth remembering.
     * They are useful and can be re-used many times.
     */
    return <IH.RC.Login fullHeight={true} theme="overlay-light" bgColor="brand">
      <img src="/assets/logo-white.png" />
    </IH.RC.Login>
  }
})
