
App.login = React.createClass({
  render() {
    return <RC.Grids className="center">
      <div size="quarter">
        <br />
      </div>
      <div size="half">
        <RC.Card theme="side" className="center invisible ">
          <RC.uiIcon theme="master-huge" uiClass="male" className="background round " />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <input className="h2" id="Email" name="Email" placeholder="Enter your email" type="email" spellCheck="false" autofocus autoComplete="off" />
          <br />
          <input className="h1" id="Passwd" name="Passwd" placeholder="Password" type="password" spellCheck="false" autofocus autoComplete="off" />
          <br />
          <br />
          <button className="bg-brand-light"> Sign in </button>
        </RC.Card>
        <RC.Card theme="colored" className="center"> or </RC.Card>
        <RC.Card className="center">
            <a href="https://developers.google.com/+/features/sign-in">Sign in with Google</a>
          <p>

            <a href="https://developers.google.com/identity/sign-in/web/sign-in">Sign in with Facebook</a>
          </p>
        </RC.Card>
      </div>
      </RC.Grids>
  }
})
