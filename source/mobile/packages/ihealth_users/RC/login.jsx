
let themes = ["overlay-light","overlay-dark"]
IH.RC.User = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "ih-login",
  themeDefault: "overlay-dark",
  themes: themes,

  propTypes: {
    fullHeight: React.PropTypes.bool,
    noHeader: React.PropTypes.bool,
    alignTop: React.PropTypes.bool,
    bgColor: React.PropTypes.string,
    registerCallback: React.PropTypes.func,

    // Common Props
    theme: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  getInitialState() {
    return {
      buttonActive: false,
      waiting: false,
      action: _.contains(["login","register","reset"], this.props.action) ? this.props.action : "login",
      msg: null,
    }
  },
  /**
   * @ @ @ @
   * Handler
   * @ @ @ @
   */
  checkButtonState(e){
    debugger
    switch (this.state.action){
      case "login":
        var form = this.refs.loginForm.getFormData()
      break
      case "register":
        var form = this.refs.registerForm.getFormData()
      case "reset":
        var form = this.refs.resetForm.getFormData()
      break
    }
    let test = _.every( _.values(form), function(t){
      return t.length && t.length>0
    })
    if (test !== this.state.buttonActive)
      this.setState({ buttonActive: test })
    if (this.state.msg)
      this.setState({ msg: null })
  },
  resetForm(){
    this.setState({
      waiting: false,
      msg: null,
      buttonActive: false
    })
    if (this.state.action == "login") {
      this.refs.username.reset()
      this.refs.password.reset()
    } else if (this.state.action == "register") {
      this.refs.regEmail.reset()
      this.refs.regPw.reset()
      this.refs.regPwRepeat.reset()
    } else if (this.state.action == "reset") {
      this.refs.email.reset()
    }
  },
  switchAction(){
    this.resetForm()
    this.setState({ buttonActive: false })

    if (this.state.action == "reset") {
      this.setState({action: "login"})
      return
    }
    else {
      this.setState({ action: this.state.action=="register" ? "login" : "register" })
    }
  },
  startReset(){
    this.resetForm()
    this.setState({
      emailFound: true
    })
    this.setState({action: "reset"})
    return   
  },
  login(e){
    e.preventDefault()
    if (this.state.msg) return null

    let form = this.refs.loginForm.getFormData()

    if (form.username.length && form.password.length) {
      // Attempt Log In
      let self = this
      this.setState({ waiting: true })
      Meteor.loginWithPassword( form.username, form.password, function(err){
        debugger
        let passedMsg = err && err.error
          ? (ph.errorMsgs[err.error] || err.reason)
          : <p>You are now logged in!</p>

        if (_.isFunction(self.props.loginCallback))
          self.props.loginCallback()

        // message hook;for calphin listener
        if(!err){
          Dispatcher.dispatch({
            actionType: "AUTH_LOGIN_SUCCESS"
          });
          return;
        }

        self.setState({
          msg: passedMsg,
          buttonActive: false,
          waiting: false
        })
      })
    }
  },
  register(e){
    e.preventDefault()
    if (this.state.msg) return null

    let self = this
    let form = this.refs.registerForm.getFormData()

    if (form.pw==form.pwRepeat) {
      if (!App.checkPassword(form.pw)) {
        this.setState({
          msg: "Password shoud have at least 8 characters, containing Capital Letts AND Numbers."
        })
        return
      }
      // Create User
      Accounts.createUser({
        email: form.email,
        password: form.pw,
      }, function(err) {
        let passedMsg = err && err.error
          ? (ph.errorMsgs[err.error] || err.reason)
          : <p>Thank you for registering!</p>

        if (!err)
          self.resetForm()

        if (_.isFunction(self.props.registerCallback))
          self.props.registerCallback()

        if(!err){
          Dispatcher.dispatch({
            actionType: "AUTH_REGISTER_SUCCESS"
          });
          return;
        }
        self.setState({
          msg: passedMsg,
          buttonActive: false,
          waiting: false
        })
      })
    } else
      this.setState({
        msg: ph.errorMsgs[1001],
        buttonActive: false,
        waiting: false
      })
  },

  reset(e){
    e.preventDefault()
    if (this.state.msg) return null

    let form = this.refs.resetForm.getFormData()

    if (form.email.length) {
      // Attempt Log In
      let self = this
      this.setState({ waiting: true })
      Meteor.call('CheckEmail', form.email, function(err, result){
        debugger
        if (!!err) {
          console.log(err)
          result = false
        }

        if (result){
          Accounts.forgotPassword({ email: form.email },function(err){
            console.log(err)
            let passedMsg = err && err.error
              ? (ph.errorMsgs[err.error] || err.reason)
              : <p>Password Reset Email Has Been Sent!</p>
            self.setState({ msg: passedMsg })
          })
        } else {
        // the email address is not found
          this.setState({
            emailFound: false,
            waiting: false,
            buttonActive:false,
            msg: "Entered E-mail is not in record."
          })
        }
      })
    }
  },

  removeMsg(e){
    e.preventDefault()
    this.setState({
      waiting: false,
      msg: null,
    })
  },

  jumpToNextPage(e){
    e.preventDefault()
    this.setState({
      waiting: false,
      msg: null,
    })
  },

  printMsg(){
    console.log("printMsg is called", this.state.msg)
    debugger
    let currentMessages = this.state.msg ? [this.state.msg] : []

    return <div>
      {
        currentMessages.map(function(m,n){
          return <div className="center" key={n}>
                      <div className="smallest inline-block cursor open-registration invis-70">
                        {_.isString(m) ? <div>{m}</div> : m}
                      </div>
                    </div>
        })
      }
    </div>

  },

  /**
   * @ @ @ @
   * Render
   * @ @ @ @
   */
  renderMsg(){
    let self = this
    let bg = h.checkColorClass(this.props.bgColor) ? this.props.bgColor : null
    let msgs = this.state.msg ? [this.state.msg] : [] // This will always be either 1 or 0

    return <RC.Animate transitionName="scale">
      {
      msgs.map( function(m,n){
        return <div className={"abs-full table on-top"+(bg ? " bg-"+bg : "")} key={n}>
          <div className="inside center">
            {_.isString(m) ? <p>{m}</p> : m}
            <RC.Button onClick={self.jumpToNextPage} theme="circle" buttonColor={bg}>OK</RC.Button>
          </div>
        </div>
      })
      }
    </RC.Animate>
  },
  renderForm(){
    var inputTheme = "small-label"
    var buttonTheme = "full"

    if (_.contains(["overlay-light","overlay-dark"], this.props.theme)) {
      inputTheme += ","+this.props.theme
      buttonTheme += ","+this.props.theme
    }

    switch (this.state.action) {
      case "login":
        return <RC.Form onSubmit={this.login} onKeyUp={this.checkButtonState} ref="loginForm">
          <RC.Input name="username" label="E-Mail" theme={inputTheme} ref="username" />
          <RC.Input name="password" label="Password" type="password" theme={inputTheme} ref="password" />
          {this.printMsg()}
          <RC.Button name="button" theme={buttonTheme} active={this.state.buttonActive} disabled={this.state.waiting}>
            {this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" /> : "Log In"}
          </RC.Button>
        </RC.Form>
      break
      case "register":
        return <RC.Form onSubmit={this.register} onKeyUp={this.checkButtonState} ref="registerForm">
          <RC.Input name="email" label="E-Mail" theme={inputTheme} ref="regEmail" />
          <RC.Input name="pw" label="Password" type="password" theme={inputTheme} ref="regPw" />
          <RC.Input name="pwRepeat" label="Repeat Password" type="password" theme={inputTheme} ref="regPwRepeat" />
          {this.printMsg()}
          <RC.Button name="button" theme={buttonTheme} active={this.state.buttonActive} disabled={this.state.waiting}>
            {this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" /> : "Sign Up"}
          </RC.Button>
        </RC.Form>
        // {
        //     this.state.emailFound ? null :
        //     <p className="center">
        //       <span className="smallest inline-block cursor open-registration invis-70" >
        //         Entered E-mail is not in record.
        //       </span>
        //     </p>
        //   }
      case "reset":
      debugger
        return (
          <RC.Form onSubmit={this.reset} onKeyUp={this.checkButtonState} ref="resetForm">
          <RC.Input name="email" label="E-Mail Address" theme={inputTheme} ref="email" />
          {this.printMsg()}
          <RC.Button name="button" theme={buttonTheme} active={this.state.buttonActive} disabled={this.state.waiting}>
            {this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" /> : "Send Password Reset E-mail"}
          </RC.Button>
        </RC.Form>
        )
      break
    }
  },
  render(){

    var classes = this.getTheme()
      +(this.props.fullHeight ? " full-height" : "")
      +(this.props.noHeader ? " no-header" : "")
      +(h.checkColorClass(this.props.bgColor) ? " bg-"+this.props.bgColor : "")
      +(this.props.alignTop ? "" : " table")

    return <div {... _.omit(this.props, ["className","theme"])} className={classes}>
      <div className="inside">
        <div className="re-wrapper">
          {this.props.children}
          {this.renderForm()}
          {
            this.state.action == "reset" ? null :
            <p className="center">
              <span className="smallest inline-block cursor open-registration invis-70" onClick={this.startReset}>
                Forgot Your Password?
              </span>
            </p>
          }
          {
            this.props.disableSwitch ? null :
            <p className="center">
              <span className="smallest inline-block cursor open-registration invis-70" onClick={this.switchAction}>
                {this.state.action=="login" ? "Create a new account" : "Log-in with an existing account"}
              </span>
            </p>
          }
        </div>
      </div>
    </div>
  }
})

if (h.nk(Meteor.settings, "public.env")!="live")
  IH.RC.User.Help = {
    Type: "Unique/Canvas",
    Themes: themes,
    PropTypes: {
      fullHeight: "Boolean (Makes the login area equal to screen size)",
      noHeader: "Boolean (If fullHeight and noHeader are both true, close the gap where the header would normally be)",
      alignTop: "Boolean (Makes the login area center vertically)",
      bgColor: "String (Must be a valid CSS color class)",
      action: "String [\"login\", \"register\"]",
      registerCallback: "Callback function for user registrations",
    },
    Description: "Creates a login form."
  }
