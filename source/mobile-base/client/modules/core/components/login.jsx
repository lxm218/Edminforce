
function checkPassword(str){
  // should have at least one capital letter
  // var containCapitalLetter = /[A-Z]/.test(str);
  // should be at least one numerical number
  // var containNumber = /[0-9]/.test(str);
  // should be at least 8 characters
  // var longEnough = str.length >= 8;
  // return (containNumber && containCapitalLetter && longEnough);
  return true;
}

const ph = {
  errorMsgs: {
    // Custom Error Handlers
    1001: "Your passwords did not match, please try again."
  }
}

EdminForce.Components.User = React.createClass({
  mixins: [RC.Mixins.CSS, ReactMeteorData],
  displayName: "Cal.User",

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
      action: _.contains(["login","register","reset","policy"], this.props.action) ? this.props.action : "login",
      msg: [],
      notification: null
    }
  },

    getMeteorData(){
        let x = Meteor.subscribe('EF-UserData');
        //console.log(x.ready(), Meteor.user());

        return {
            userReady : x.ready()
        };
    },

  messageInfo(){
    return {
      "pwFormatError": "Password shoud have at least 8 characters, containing Capital Letters AND Numbers.",
      "termError": "Please accept the following terms of use.",
      "emailError": "Entered E-mail is not in record.",
      "phoneRequired": "Please enter phone number"
    }
  },
  /**
   * @ @ @ @
   * Handler
   * @ @ @ @
   */
  checkButtonState(e){
    switch (this.state.action){
      case "login":
        var form = this.refs.loginForm.getFormData()
        break
      case "register":
        var form = this.refs.registerForm.getFormData()
        break
      case "reset":
        var form = this.refs.resetForm.getFormData()
        break
    }
    let test = _.every( _.values(form), function(t){
      return t.length && t.length>0
    })

    if (this.state.action == 'register'){
        if (this.state.msg) {
          this.setState({ msg: [] })
        }
    }
    // if (this.state.action == 'register' && form.pwRepeat){
    //   if (!checkPassword(form.pw)) {
    //     var message = this.state.msg ? this.state.msg : []
    //     message.push(this.messageInfo()['pwFormatError'])
    //     this.setState({
    //       msg: message,
    //       buttonActive: false
    //     })
    //     return
    //   } else if (this.state.msg) {
    //     this.setState({ msg: [] })
    //   }
    //   if (form.term == '1'){
    //     var message = this.state.msg ? this.state.msg : []
    //     var index = message.indexOf(this.messageInfo()['termError'])
    //     if (index != -1) {
    //       message = message.slice(0, index) + message.slice(index + 1, message.length)
    //       this.setState({
    //         msg: message,
    //         buttonActive: true
    //       })
    //     }
    //   }
    // }
    if (this.state.action == 'login' && form.password){
      if (this.state.msg) {
        this.setState({ msg: [] })
      }
    }
    if (test !== this.state.buttonActive)
      this.setState({ buttonActive: test })
  },

  resetForm(){
    this.setState({
      waiting: false,
      msg: null,
      buttonActive: false,
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

  showPolicy(){
    this.setState({action: "policy"})
    //FlowRouter.go('/Policy')
  },

  showRegister(){
    this.setState({action: "register"})
  },

  startReset(){
    this.resetForm()
    this.setState({
      emailFound: true
    })
    this.setState({action: "reset"})
    return
  },

  getRegisterConfirmEmailTemplate(data){
        let school={
          "name" : "CalColor Academy"
        }

        let tpl = [
            '<h3>Welcome ',data.name,'</h3>',
            '<p>Thank for creating an account. Your login ID is your email.</p>',
            '<p>Now it is a good time to login and update your profile.</p>',
            '<h4><a href="https://calcolor.classforth.com/" target="_blank">Login Your Account</a></h4>',

            '<br/><br/>',
            '<b>',school.name,'</b>'
        ].join('');

        return tpl;
    },

  login(e){
    e.preventDefault()
    if (this.state.msg && this.state.msg.length != 0) return null

    let form = this.refs.loginForm.getFormData()

    if (form.username.length && form.password.length) {
      // Attempt Log In
      let self = this
      this.setState({ waiting: true })

      let userSelector = {role:'user'};
      form.username.indexOf('@') < 0 ? (userSelector.username=form.username) : (userSelector.email=form.username.toLowerCase());
      //console.log(userSelector)
      Meteor.loginWithPassword(userSelector, form.password, function(err){
        if (!err){
          if (form.keepName == '1') {
            Cookie.set('username', form.username)
          } else  {
            Cookie.remove('username')
          }
          self.resetForm()
        }
        console.log(err)

        let passedMsg = err && err.error
            ? (ph.errorMsgs[err.error] || err.reason)
            : <p>You are now logged in!</p>

        if (_.isFunction(self.props.loginCallback))
          self.props.loginCallback()

        // message hook;for calphin listener
        if(!err){
          Dispatcher.dispatch({
            actionType: "AUTH_LOGIN_SUCCESS",
            redirectUrl: self.props.redirectUrl
          });
          return;
        }

        self.setState({
          msg: passedMsg,
          buttonActive: false,
          waiting: false,
        })
      })
    }
  },

  register(e){
    e.preventDefault()
    let self = this
    let form = this.refs.registerForm.getFormData()

    var message = this.state.msg ? this.state.msg : []

    if (form.term == '1'){
        var index = message.indexOf(this.messageInfo()['termError'])
        if (index != -1) {
          message = message.slice(0, index) + message.slice(index + 1, message.length)
        }
    }

    if (message && message.length != 0) return null

    if (form.term != '1') {
      message.push(this.messageInfo()['termError'])
      this.setState({
        msg: message,
      })
      return null
    }

    if (!form.phone) {
      this.setState({
        msg: this.messageInfo()['phoneRequired'],
      })
      return
    }

    if (form.pw==form.pwRepeat) {
      if (!checkPassword(form.pw)) {
        var message = this.state.msg ? this.state.msg : []
        message.push(this.messageInfo()['pwFormatError'])
        this.setState({
          msg: message,
        })
        return
      }
      // Create User
      let uName = form.fName + ' '+ form.lName
      Accounts.createUser({
        username: form.email.toLowerCase(),
        email: form.email.toLowerCase(),
        password: form.pw,
        role : 'user'
      }, function(err) {
        if (!err){
            // add data to Customer DB
            Meteor.call('account.addCustomer', uName, form.email, form.phone, function(methodErr,result){
              methodErr && console.log(methodErr);
              if(!methodErr){
                Dispatcher.dispatch({
                  actionType: "AUTH_REGISTER_SUCCESS",
                  redirectUrl: self.props.redirectUrl
                });
              }
            });
            self.resetForm()
        }

        let passedMsg = err && err.error
            ? (ph.errorMsgs[err.error] || err.reason)
            : <p>Thank you for registering!</p>

        if (_.isFunction(self.props.registerCallback))
          self.props.registerCallback()

        if (!err){
          // let school = KG.get('EF-School').getInfo();
          let data = {
            "name": form.fName
          }
          let html = self.getRegisterConfirmEmailTemplate(data);
          Meteor.call('sendEmailHtml',
                  form.email,
                  'Thanks for Creating an Account',
                  html);
        }

        self.setState({
          msg: passedMsg,
          buttonActive: false,
          waiting: false,
        })
      })
    } else
      this.setState({
        msg: ph.errorMsgs[1001],
        buttonActive: false,
        waiting: false,
      })
  },





  reset(e){
    e.preventDefault()
    if (this.state.msg && this.state.msg.length != 0) return null

    let form = this.refs.resetForm.getFormData()

    if (form.email.length) {
      // Attempt Log In
      let self = this
      this.setState({ waiting: true })
      Meteor.call('account.checkUserByEmail', form.email, function(err, result){

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
            self.setState({
              waiting: false,
              msg: passedMsg
            })
          })
        } else {
          // the email address is not found
          console.log("Email Not Found")
          self.setState({
            emailFound: false,
            waiting: false,
            buttonActive:false,
            msg: "Entered E-mail is not in record.",
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
      notification: null,
      msg:null
    })
  },

  printMsg(){
    //console.log("printMsg is called", this.state.msg)

    let currentMessages = this.state.msg ? [this.state.msg] : []
    return <div>
      {
        currentMessages.map(function(m,n){
          return <div className="center" key={n}>
            <div className="bigger inline-block invis-70 red">
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
    let msgs = this.state.notification ? [this.state.notification] : [] // This will always be either 1 or 0

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
    let styles = this.css.styles
    let linkColor = this.color.isDark ? "rgba(255,255,255,.7)" : "rgba(15,15,15,.7)"
    let linkColorHover = this.color.isDark ? "#fff" : RC.Theme.color.text

    switch (this.state.action) {

      case "login":
        //<div>Log In To Your Calphin Account</div>
        return <RC.Form onSubmit={this.login} onKeyUp={this.checkButtonState} ref="loginForm">

          {this.printMsg()}
          <RC.Input name="username" label="E-Mail"  placeholder="john@example.net" theme={inputTheme} ref="username" value={Cookie.get('username')||''} />
          <RC.Input name="password" label="Password" type="password" theme={inputTheme} ref="password" placeholder="Edm1n!"/>
          <RC.Checkbox  style={{borderBottom:'none'}} name="keepName" ref="keepName" value={1} label="Remember My User Name"/>

          <RC.Button name="button" theme={buttonTheme} active={this.state.buttonActive} disabled={this.state.waiting}>
            {this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" /> : "Log In"}
          </RC.Button>
        </RC.Form>
        break

      case "register":
        //<div>Create an Account</div>
        return (<RC.Form onSubmit={this.register} onKeyUp={this.checkButtonState} ref="registerForm">
          {this.printMsg()}
          <RC.Input name="fName" label="First Name" theme={inputTheme} ref="fName" placeholder="John" value=""/>
          <RC.Input name="lName" label="Last Name" theme={inputTheme} ref="lName" placeholder="Doe" />
          <RC.Input name="email" label="E-Mail" theme={inputTheme} ref="regEmail" placeholder="john@example.net" />
          <RC.Input name="phone" label="Phone" theme={inputTheme} ref="regPhone" placeholder="800-1234567" />
          <RC.Input name="pw" label="Password" type="password" theme={inputTheme} ref="regPw" placeholder="Edm1n!"/>
          <RC.Input name="pwRepeat" label="Repeat Password" type="password" theme={inputTheme} ref="regPwRepeat" placeholder="Edm1n!"/>
          <RC.URL style={styles.url} color={linkColor} colorHover={linkColorHover} onClick={this.showPolicy}>
            <h6> Terms and Policy </h6>
          </RC.URL>
          <RC.Checkbox name="term" ref="term" value={1} style={{whiteSpace:"normal"}}
                       label="Yes, I accept Terms and Policy."/>

          <RC.Button name="button" theme={buttonTheme} active={this.state.buttonActive} disabled={this.state.waiting}>
            {this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" /> : "Sign Up"}
          </RC.Button>
        </RC.Form>
        )
        break
      case "reset":
        //<div>Reset Password via Email</div>
        return (
            <RC.Form onSubmit={this.reset} onKeyUp={this.checkButtonState} ref="resetForm">
              {this.printMsg()}
              <RC.Input name="email" label="E-Mail Address" theme={inputTheme} ref="email" value="" placeholder="john@example.net"/>
              <RC.Button name="button" theme={buttonTheme} active={this.state.buttonActive} disabled={this.state.waiting}>
                {this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" /> : "Send Password Reset E-mail"}
              </RC.Button>
            </RC.Form>
        )
        break
      case "policy":
        //<div>Reset Password via Email</div>
        return (
        <div>

        <h1>Privacy Policy and Terms of Use</h1>

          <h3>Information Collection and Use.</h3>
          <p>
          We will not sell, share, or rent this information to any outside parties, except as outlined in this policy. Edminforce Inc may collect information from our users at several different points on our website in order to process your orders and better serve you with pertinent information. Information collected includes name, shipping address, billing address, telephone numbers, e-mail address, and payment information such as credit card. Edminforce Inc may also require you to submit a username and password of your choice for future access to your information. Your username and password is to remain confidential and you should not share this information with anyone.
          </p>

          <h3>Online Registration. </h3>
          <p>
          In order to process your orders using this website, a user must first complete an online sign up form. During the online registration a user is required to give their contact information, which includes name, e-mail, telephone number and physical address. This information is used to contact the user about the services on our site such as sending automated order status updates.</p>

          <h3>Online Order. </h3>
          <p>
          Most of the information collected in the online registration process will be used to process your orders. In the order process, a user must provide additional financial information such as credit card number, expiration date, money order, wire transfer or check information. This information is used for billing purposes and to fulfill customer’s orders. If we have trouble processing an order, this contact information is used to get in touch with the user. We do not share your personal and financial information with any third parties. The only exception is when processing your credit card information with the payment gateway and merchant bank for authorization and approval. This process is protected by an enhanced security system SSL and RSA. See Security paragraph for more details on security measures and procedures.</p>

          <h3>Browser Cookies. </h3>
          <p>
          With respect to cookies, we use cookies to customize Web page content based on visitors’ browser type or other information that the visitor sends. If a user rejects the cookie, they may still use our site. However you will be unable to use our shopping cart to purchase items online. This is because cookies are used by the shopping cart to retain information necessary to process your order. If you disable cookies, we will not be able to accept your order online. We do not share any cookie information with third party sites. Cookies are used strictly for the purpose of enhancing your personal experience with our site. When you close your browser, the cookies will be terminated.</p>

          <h3>Log Files. </h3>
          <p>
          We use IP addresses to analyze trends, administer the site, track user’s movement, and gather broad demographic information for aggregate use. IP addresses are not linked to personally identifiable information. We do not distribute or share IP information with any third parties.</p>

          <h3>Information Disclosure. </h3>
          <p>
          We use a credit card processing company to bill users for goods and services, and maybe an outside shipping company (i.e. UPS) to ship orders. These companies do not disclose, retain, share, store or use personally identifiable information for any secondary purposes. Our web site contains links to other sites. Please be aware Edminforce Inc is not responsible for the privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of each and every web site that collects personally identifiable information. This privacy statement applies solely to information collected by this Web site.</p>

          <h3>Notification of Changes. </h3>
          <p>
          If at any point we decide to use personally identifiable information in a manner different from that stated at the time it was collected, we will notify users by way of an email. Users will have a choice as to whether or not we use their information in this different manner. We will use information in accordance with the privacy policy under which the information was collected. If you have opted out of receiving any communications from Edminforce Inc, you may visit our website at www.edminforce.net where news of changes will be posted. Otherwise, you may e-mail us at admin@edminforce.net ask our customers service department for changes and updates. If you send us an e-mail request, we will respond to that e-mail only. You will not receive promotional materials unless you specifically grant us permission to do so.</p>

          <h3>Choice/Opt-out. </h3>
          <p>
          Edminforce Inc does not use customer information for contact other than Edminforce Inc pertinent business. Edminforce Inc does not share customer personal information with any outside parties. However, for customers who wish to opt-out or be removed from Edminforce Inc special offers and related news, Edminforce Inc provides several methods to accomplish this request. Users who no longer wish to receive our newsletter or promotional materials may opt-out of receiving these communications by un-checking the permission to send field when processing their order. They may also send us email to admin@edminforce.net with a request to be removed. Finally, they may also use the link provided with all communications to automatically unsubscribe.</p>

          <h3>Information Security. </h3>
          <p>
          Edminforce Inc website takes every precaution to protect our user information. When users submit sensitive information via the website, your information is protected both online and off-line. When our registration/order form asks users to enter sensitive information (such as credit card number), the information is encrypted and is protected with the encryption software in the industry – SSL. Our SSL technology is the most advanced 128bit encryption by Authorize.net. To learn more about SSL, follow this link www.Authorize.net. All Edminforce Inc employees are kept up-to-date on our security and privacy practices. Every quarter, as well as any time when new policies are added, our employees are notified and/or reminded about the importance we place on privacy, and what they can do to ensure our customers information is protected. If you have any questions about the security at our website, you can send an email to us at admin@edminforce.net</p>

          <h3>Product/Service Rating and Reviews. </h3>
          <p>
          Edminforce Inc may provide a product/service rating feature that allows customers to rate the quality of the product/service. Our review system may also allow for customers to leave written comments to further elaborate their experience with the product/service. All ratings and review comments will be pre-screened by a moderator before posting to the site. The moderator may choose to disregard or eliminate comments that do not meet the guidelines. Guidelines include that all comments are truthful and non-offensive. Guidelines do not permit the posting of personal information or information for the purpose of personal gain.</p>

          <RC.Button onClick={this.showRegister} name="button" theme={buttonTheme}>
                Back To Register
          </RC.Button>


      </div>
        )
        break
    }
  },
  render(){

    let styles = this.css.styles
    let linkColor = this.color.isDark ? "rgba(255,255,255,.7)" : "rgba(15,15,15,.7)"
    let linkColorHover = this.color.isDark ? "#fff" : RC.Theme.color.text

    return <div>
      <RC.Animate transitionName="zoom" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
        {
          //!!this.state.msg
          //  ? <div style={styles.msg}>
          //    <div style={styles.msgInner}>
          //      {typeof this.state.msg==="string" ? <p>{this.state.msg}</p> : this.state.msg}
          //      <RC.Button onClick={this.removeMsg} theme="circle" bgColor={this.color.textColor} color={this.color.bgColor} style={{marginTop: 10}}>OK</RC.Button>
          //    </div>
          //  </div>
          //  : null
        }
      </RC.Animate>
      <RC.Div {... this.props} bgColor={this.props.bgColor || "white"} theme="absFull">
        <div style={styles.vo}>
          <div style={styles.vi}>
            <div style={styles.form}>

              <div style={styles.content}>
                {this.props.children}
              </div>

              {this.renderForm()}
              {this.props.disableSwitch ? null :this.renderAction()}
            </div>
          </div>
        </div>
      </RC.Div>
    </div>
  },

  renderAction(){

    let styles = this.css.styles
    let linkColor = this.color.isDark ? "rgba(255,255,255,.7)" : "rgba(15,15,15,.7)"
    let linkColorHover = this.color.isDark ? "#fff" : RC.Theme.color.text

    switch(this.state.action){
      case 'login':
        return <div>
          <RC.URL style={styles.url} color={linkColor} colorHover={linkColorHover} onClick={this.startReset}>
            Forgot Password
          </RC.URL>
          <RC.URL style={styles.urlRight} color={linkColor} colorHover={linkColorHover} onClick={this.switchAction}>
            Sign Up
          </RC.URL>
        </div>
        break
      case 'register':
        return <div style={{textAlign: "center"}}>
          <RC.URL style={styles.url} color={linkColor} colorHover={linkColorHover} onClick={this.switchAction}>
            Log-in with an existing account
          </RC.URL>
        </div>
        break

      case 'reset':
        return <p style={{textAlign: "center"}}>
          <RC.URL style={styles.url} color={linkColor} colorHover={linkColorHover} onClick={this.switchAction}>
            Log-in with an existing account
          </RC.URL>
        </p>
        break
    }
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["noHeader"],
  baseStyles(np,ns) {
    let navSize = 0
    if (_.isFunction(RC.Theme.size.headerNavHeight))
      navSize = RC.Theme.size.headerNavHeight()
    else if (RC.Theme.size.topNavHeight)
      navSize = RC.Theme.size.topNavHeight

    return {
      vo: RC.cssMixins.verticalAlignOuter,
      vi: RC.cssMixins.verticalAlignInner,
      msg: Object.assign({}, RC.cssMixins.absFull, RC.cssMixins.verticalAlignOuter, {
        minHeight: "100vh",
        zIndex: 1000,
        backgroundColor: this.color.hex, color: this.color.textColor
      }),
      msgInner: Object.assign({},RC.cssMixins.verticalAlignInner, {textAlign: "center"}),
      form: {
        maxWidth: 300, margin: "0 auto", padding: 10,
      },
      content: {
        maxWidth: 230, padding: "0 0 50px", margin: "0 auto"
      },
      url: {
        fontSize: RC.Theme.font.size-2,
        display: "inline-block", padding: 5,
      },
      urlRight:{
        fontSize: RC.Theme.font.size-2,
        //display: "inline-block",
        padding: 5,
        float:"right"
      },
      input: {
        padding: "5px 0",
      }
    }
  },
})
