
IH.RC.User = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "IH-Login",

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
      waiting: false,
      action: _.contains(["login","register"], this.props.action) ? this.props.action : "login",
      msg: null,
    }
  },
  /**
   * @ @ @ @
   * Handler
   * @ @ @ @
   */
  checkButtonState(e){
    // switch (this.state.action){
    //   case "login":
    //     var form = this.refs.loginForm.getFormData()
    //   break
    //   case "register":
    //     var form = this.refs.registerForm.getFormData()
    //   break
    // }
    //
    // let test = _.every( _.values(form), function(t){
    //   return t.length && t.length>0
    // })
    // if (this.refs.loginButton)
    //   this.refs.loginButton.setState({isActive: test})
    // if (this.refs.registerButton)
    //   this.refs.registerButton.setState({isActive: test})
  },
  resetForm(){
    if (this.state.action == "login") {
      this.refs.username.reset()
      this.refs.password.reset()
    } else if (this.state.action == "register") {
      this.refs.regUsername.reset()
      this.refs.regEmail.reset()
      this.refs.regPw.reset()
      this.refs.regPwRepeat.reset()
    }
  },
  switchAction(){
    this.resetForm()

    // if (this.refs.loginButton)
    //   this.refs.loginButton.setState({isActive: false})
    // if (this.refs.registerButton)
    //   this.refs.registerButton.setState({isActive: false})

    this.setState({ action: this.state.action=="register" ? "login" : "register" })
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
        let passedMsg = err && err.error
          ? (ph.errorMsgs[err.error] || err.reason)
          : <p>You are now logged in!</p>

        if (_.isFunction(self.props.loginCallback))
          self.props.loginCallback()

        self.setState({
          msg: passedMsg
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
      // Create User
      Accounts.createUser({
        username: form.username,
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

        self.setState({
          msg: passedMsg
        })
      })
    } else
      this.setState({
        msg: ph.errorMsgs[1001]
      })
  },
  removeMsg(e){
    e.preventDefault()
    this.setState({
      waiting: false,
      msg: null,
    })
  },
  /**
   * @ @ @ @
   * Render
   * @ @ @ @
   */
  renderMsg(){
    let self = this
    let styles = this.css.styles
    let msgs = this.state.msg ? [this.state.msg] : [] // This will always be either 1 or 0

    let color = this.color.bgColor
    let bgColor = this.color.textColor

    return <RC.Animate transitionName="scale">
      {
      msgs.map( function(m,n){
        return <div style={styles.msg} key={n}>
          <div style={styles.msgInner}>
            {_.isString(m) ? <p>{m}</p> : m}
            <RC.Button onClick={self.removeMsg} theme="circle" bgColor={bgColor} color={color} style={{marginTop: 10}}>OK</RC.Button>
          </div>
        </div>
      })
      }
    </RC.Animate>
  },
  renderForm(){

    var inputProps = {
      theme: ["stacked-label","overlay"],
      borderColor: this.color.textColor,
      labelColor: this.color.isDark ? "rgba(255,255,255,.5)" : "rgba(15,15,15,.5)",
      labelColorFocus: this.color.textColor,
      color: this.color.textColor,

      autoCapitalize: "none",
    }

    var buttonProps = {
      theme: ["full","overlay"],
      name: "button",
      bgColor: this.color.isDark ? "rgba(0,0,0,.2)" : "rgba(0,0,0,.15)",
      bgColorHover: this.color.isDark ? RC.Theme.color.white : RC.Theme.color.dark,
      color: this.color.textColor,
      colorHover: this.color.isDark ? RC.Theme.color.dark : RC.Theme.color.white,
      disabled: this.state.waiting
    }

    switch (this.state.action) {
      case "login":
        return <RC.Form onSubmit={this.login} onKeyUp={this.checkButtonState} ref="loginForm">
          <RC.Input {... h.assignClone(inputProps, {name: "username", label: "Username or E-mail", ref: "username"})} />
          <RC.Input {... h.assignClone(inputProps, {name: "password", label: "Password", type: "password", ref: "password", style: {marginBottom: 20}})} />

          <RC.Button {... buttonProps} ref="loginButton">
            {this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" uiSize={24} uiColor={this.color.hex} theme="absCenter" /> : "Log In"}
          </RC.Button>
        </RC.Form>
      break
      case "register":
        return <RC.Form onSubmit={this.register} onKeyUp={this.checkButtonState} ref="registerForm">
          <RC.Input {... h.assignClone(inputProps, {name: "username", label: "Username", ref: "regUsername"})} />
          <RC.Input {... h.assignClone(inputProps, {name: "email", label: "E-Mail", ref: "regEmail"})} />
          <RC.Input {... h.assignClone(inputProps, {name: "pw", label: "Password", type: "password", ref: "regPw"})} />
          <RC.Input {... h.assignClone(inputProps, {name: "pwRepeat", label: "Repeat Password", type: "password", ref: "regPwRepeat"})} />

          <RC.Button {... buttonProps} ref="registerButton">
            {this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" uiSize={24} uiColor={this.color.hex} theme="absCenter" /> : "Sign Up"}
          </RC.Button>
        </RC.Form>
      break
    }
  },
  render(){

    let styles = this.css.styles
    let linkColor = this.color.isDark ? "rgba(255,255,255,.7)" : "rgba(15,15,15,.7)"
    let linkColorHover = this.color.isDark ? "#fff" : RC.Theme.color.text

    return <RC.Div {... this.props} style={styles.canvas}>
      {this.renderMsg()}
      <div style={styles.canvasInner}>
        <div style={styles.form}>

          <div style={styles.content}>
            {this.props.children}
          </div>

          {this.renderForm()}
          {
          this.props.disableSwitch ? null :
          <p style={{textAlign: "center"}}>
            <RC.URL style={styles.url} color={linkColor} colorHover={linkColorHover} onClick={this.switchAction}>
              {this.state.action=="register" ? "Log-in with an existing account" : "Create a new account"}
            </RC.URL>
          </p>
          }
        </div>
      </div>
    </RC.Div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["noHeader"],
  baseStyles(np,ns) {
    return {
      canvas: h.assignClone( [RC.cssMixins.fullHeight(), RC.cssMixins.verticalAlignOuter], {
        backgroundColor: this.color.hex, color: this.color.textColor,
        minHeight: np.noHeader ? "100vh" : "calc(100vh - "+RC.Theme.size.headerNavHeight+"px)"
      }),
      canvasInner: RC.cssMixins.verticalAlignInner,
      msg: h.assignClone( [RC.cssMixins.absFull, RC.cssMixins.verticalAlignOuter], {
        zIndex: 50,
        backgroundColor: this.color.hex,
      }),
      msgInner: h.assignClone(RC.cssMixins.verticalAlignInner, {textAlign: "center"}),
      form: {
        maxWidth: 280, margin: "0 auto", padding: 10,
      },
      content: {
        maxWidth: 210, padding: "0 0 50px", margin: "0 auto"
      },
      url: {
        fontSize: RC.Theme.font.size-2,
        display: "inline-block", padding: 5,
      }
    }
  },
})
