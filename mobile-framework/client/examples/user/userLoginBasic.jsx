
App.User_Login_Basic = React.createClass({
  render() {
    /**
     * Notice how I used the .bg-brand class to style the login form.
     * Classes such as .bg-brand, .bg-brand2, .bg-brand3 are worth remembering.
     * They are useful and can be re-used many times.
     */
    return <IH.RC.Login fullHeight={true} theme="overlay-dark" bgColor="brand-light">
     <img src="/assets/logo.png" />
   </IH.RC.Login>
  }
})
