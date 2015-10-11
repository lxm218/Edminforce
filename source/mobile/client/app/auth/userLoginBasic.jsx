
Cal.Login = React.createClass({
  render() {
    /**
     * Notice how I used the .bg-brand class to style the login form.
     * Classes such as .bg-brand, .bg-brand2, .bg-brand3 are worth remembering.
     * They are useful and can be re-used many times.
     */
    debugger
    return <IH.RC.User fullHeight={true} theme="overlay-dark" bgColor="brand-light">
        <RC.Card key={Math.random()} title="Welcome to Calphin Online Registration">
        </RC.Card>
   </IH.RC.User>
  }
})
