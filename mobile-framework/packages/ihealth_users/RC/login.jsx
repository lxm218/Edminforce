
let themes = ["overlay-light","overlay-dark"]
IH.RC.Login = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "ih-login",
  themeDefault: "overlay-dark",
  themes: themes,

  propTypes: {
    fullHeight: React.PropTypes.bool,
    alignTop: React.PropTypes.bool,
    bgColor: React.PropTypes.string,

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
      msg: null,
    }
  },
  /**
   * @ @ @ @
   * Handler
   * @ @ @ @
   */
  checkButtonState(){
    let username = this.refs.username.getValue()
    let password = this.refs.password.getValue()
    let res = username.length && password.length

    if (res!==this.state.buttonActive)
      this.setState({ buttonActive: res })
  },
  openRegistration(){
    this.setState({ route: "registration" })
  },
  login(e){
    e.preventDefault()
    let form = this.refs.loginForm.getFormData()

    if (form.username.length && form.password.length) {
      // Attempt Log In
      let self = this
      this.setState({ waiting: true })
      Meteor.loginWithPassword( form.username, form.password, function(res){
        self.setState({
          msg: ph.errorMsgs[res.error] || res.reason,
        })
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
            <p>{m}</p>
            <RC.Button onClick={self.removeMsg} theme="circle" buttonColor={bg}>OK</RC.Button>
          </div>
        </div>
      })
      }
    </RC.Animate>
  },
  render(){

    var classes = this.getTheme()
      +(this.props.fullHeight ? " full-height" : "")
      +(h.checkColorClass(this.props.bgColor) ? " bg-"+this.props.bgColor : "")
    var inputTheme = "small-label"
    var buttonTheme = "full"

    if (_.contains(["overlay-light","overlay-dark"], this.props.theme)) {
      inputTheme += ","+this.props.theme
      buttonTheme += ","+this.props.theme
    }

    // Vertically align top or center
    if (!this.props.alignTop) classes = classes+" table"

    return <RC.Form {... _.omit(this.props, ["className","theme"])} className={classes} onSubmit={this.login} onKeyUp={this.checkButtonState} ref="loginForm">
      {this.renderMsg()}
      <div className="inside">
        <div className="re-wrapper">
          {this.props.children}
          <RC.Input name="username" label="Username or E-Mail" theme={inputTheme} ref="username" />
          <RC.Input name="password" label="Password" type="password" theme={inputTheme} ref="password" />
          <RC.Button name="button" theme={buttonTheme} active={this.state.buttonActive} disabled={this.state.waiting}>
            {this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" /> : "Log In"}
          </RC.Button>
          <p className="center">
            <span className="smallest inline-block cursor open-registration invis-70" onClick={this.openRegistration}>Or click here to register</span>
          </p>
        </div>
      </div>
    </RC.Form>
  }
})

if (h.nk(Meteor.settings, "public.env")!="live")
  IH.RC.Login.Help = {
    Type: "Unique/Canvas",
    Themes: themes,
    PropTypes: {
      fullHeight: "Boolean (Makes the login area equal to screen size)",
      alignTop: "Boolean (Makes the login area center vertically)",
      bgColor: "String (Must be a valid CSS color class)",
    },
    Description: "Creates a login form."
  }
