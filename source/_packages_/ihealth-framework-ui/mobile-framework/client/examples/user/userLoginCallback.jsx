
App.Login_With_Callback = React.createClass({
  render() {
    /**
     * Notice how I used the .bg-brand class to style the login form.
     * Classes such as .bg-brand, .bg-brand2, .bg-brand3 are worth remembering.
     * They are useful and can be re-used many times.
     */

     let callback = function(){
       alert("Hello! This is a custom callback!")
     }

    return <IH.RC.User fullHeight={true} bgColor="brand1" loginCallback={callback} registerCallback={callback}>
      <img src="/assets/logo-white.png" />
    </IH.RC.User>
  }
})
