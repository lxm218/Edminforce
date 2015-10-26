//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var DefaultRoutes = Package['ihealth:utils'].DefaultRoutes;
var h = Package['ihealth:utils'].h;
var IH = Package['ihealth:utils'].IH;
var RC = Package['ihealth:framework-engine'].RC;
var Mongo = Package.mongo.Mongo;
var Accounts = Package['accounts-base'].Accounts;
var AccountsClient = Package['accounts-base'].AccountsClient;
var Roles = Package['alanning:roles'].Roles;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var moment = Package['momentjs:moment'].moment;
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var __init_fast_render = Package['meteorhacks:fast-render'].__init_fast_render;
var FastClick = Package.fastclick.FastClick;
var React = Package['react-runtime'].React;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var babelHelpers = Package['babel-runtime'].babelHelpers;

/* Package-scope variables */
var ph;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_users/lib/ph.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
ph = {                                                                                                                // 2
  errorMsgs: {                                                                                                        // 3
    // Custom Error Handlers                                                                                          // 4
    1001: "Your passwords did not match, please try again.",                                                          // 5
  }                                                                                                                   // 6
}                                                                                                                     // 7
                                                                                                                      // 8
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_users/RC/login.jsx                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
var themes = ["overlay-light", "overlay-dark"];                                                                       // 2
IH.RC.User = React.createClass({                                                                                      // 3
  displayName: "User",                                                                                                //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 4
  themeGroup: "ih-login",                                                                                             // 5
  themeDefault: "overlay-dark",                                                                                       // 6
  themes: themes,                                                                                                     // 7
                                                                                                                      //
  propTypes: {                                                                                                        // 9
    fullHeight: React.PropTypes.bool,                                                                                 // 10
    noHeader: React.PropTypes.bool,                                                                                   // 11
    alignTop: React.PropTypes.bool,                                                                                   // 12
    bgColor: React.PropTypes.string,                                                                                  // 13
    registerCallback: React.PropTypes.func,                                                                           // 14
                                                                                                                      //
    // Common Props                                                                                                   //
    theme: React.PropTypes.string,                                                                                    // 17
    id: React.PropTypes.string,                                                                                       // 18
    className: React.PropTypes.string,                                                                                // 19
    style: React.PropTypes.object                                                                                     // 20
  },                                                                                                                  //
                                                                                                                      //
  getInitialState: function () {                                                                                      // 23
    return {                                                                                                          // 24
      buttonActive: false,                                                                                            // 25
      waiting: false,                                                                                                 // 26
      action: _.contains(["login", "register", "reset"], this.props.action) ? this.props.action : "login",            // 27
      msg: null,                                                                                                      // 28
      notification: null                                                                                              // 29
    };                                                                                                                //
  },                                                                                                                  //
  /**                                                                                                                 //
   * @ @ @ @                                                                                                          //
   * Handler                                                                                                          //
   * @ @ @ @                                                                                                          //
   */                                                                                                                 //
  checkButtonState: function (e) {                                                                                    // 37
                                                                                                                      //
    switch (this.state.action) {                                                                                      // 39
      case "login":                                                                                                   // 40
        var form = this.refs.loginForm.getFormData();                                                                 // 41
        break;                                                                                                        // 42
      case "register":                                                                                                // 42
        var form = this.refs.registerForm.getFormData();                                                              // 44
        break;                                                                                                        // 45
      case "reset":                                                                                                   // 45
        var form = this.refs.resetForm.getFormData();                                                                 // 47
        break;                                                                                                        // 48
    }                                                                                                                 // 48
    var test = _.every(_.values(form), function (t) {                                                                 // 50
      return t.length && t.length > 0;                                                                                // 51
    });                                                                                                               //
    if (this.state.action == 'register' && form.pwRepeat) {                                                           // 53
      if (!App.checkPassword(form.pw)) {                                                                              // 54
        this.setState({                                                                                               // 55
          msg: "Password shoud have at least 8 characters, containing Capital Letters AND Numbers.",                  // 56
          buttonActive: false                                                                                         // 57
        });                                                                                                           //
        return;                                                                                                       // 59
      } else if (this.state.msg) {                                                                                    //
        this.setState({ msg: null });                                                                                 // 61
      }                                                                                                               //
    }                                                                                                                 //
    if (test !== this.state.buttonActive) this.setState({ buttonActive: test });                                      // 64
  },                                                                                                                  //
  resetForm: function () {                                                                                            // 67
    this.setState({                                                                                                   // 68
      waiting: false,                                                                                                 // 69
      msg: null,                                                                                                      // 70
      buttonActive: false                                                                                             // 71
    });                                                                                                               //
    if (this.state.action == "login") {                                                                               // 73
      this.refs.username.reset();                                                                                     // 74
      this.refs.password.reset();                                                                                     // 75
    } else if (this.state.action == "register") {                                                                     //
      this.refs.regEmail.reset();                                                                                     // 77
      this.refs.regPw.reset();                                                                                        // 78
      this.refs.regPwRepeat.reset();                                                                                  // 79
    } else if (this.state.action == "reset") {                                                                        //
      this.refs.email.reset();                                                                                        // 81
    }                                                                                                                 //
  },                                                                                                                  //
  switchAction: function () {                                                                                         // 84
    this.resetForm();                                                                                                 // 85
    this.setState({ buttonActive: false });                                                                           // 86
                                                                                                                      //
    if (this.state.action == "reset") {                                                                               // 88
      this.setState({ action: "login" });                                                                             // 89
      return;                                                                                                         // 90
    } else {                                                                                                          //
      this.setState({ action: this.state.action == "register" ? "login" : "register" });                              // 93
    }                                                                                                                 //
  },                                                                                                                  //
  startReset: function () {                                                                                           // 96
    this.resetForm();                                                                                                 // 97
    this.setState({                                                                                                   // 98
      emailFound: true                                                                                                // 99
    });                                                                                                               //
    this.setState({ action: "reset" });                                                                               // 101
    return;                                                                                                           // 102
  },                                                                                                                  //
  login: function (e) {                                                                                               // 104
    var _this = this;                                                                                                 //
                                                                                                                      //
    e.preventDefault();                                                                                               // 105
    if (this.state.msg) return null;                                                                                  // 106
                                                                                                                      //
    var form = this.refs.loginForm.getFormData();                                                                     // 108
                                                                                                                      //
    if (form.username.length && form.password.length) {                                                               // 110
      (function () {                                                                                                  //
        // Attempt Log In                                                                                             //
        var self = _this;                                                                                             // 112
        _this.setState({ waiting: true });                                                                            // 113
        Meteor.loginWithPassword(form.username, form.password, function (err) {                                       // 114
                                                                                                                      //
          if (!err) {                                                                                                 // 116
            if (form.keepName == 'on') {                                                                              // 117
              Cookie.set('username', form.username);                                                                  // 118
            } else {                                                                                                  //
              Cookie.clear('username');                                                                               // 120
            }                                                                                                         //
            self.resetForm();                                                                                         // 122
          }                                                                                                           //
                                                                                                                      //
          var passedMsg = err && err.error ? ph.errorMsgs[err.error] || err.reason : React.createElement(             // 125
            "p",                                                                                                      //
            null,                                                                                                     //
            "You are now logged in!"                                                                                  //
          );                                                                                                          //
                                                                                                                      //
          if (_.isFunction(self.props.loginCallback)) self.props.loginCallback();                                     // 129
                                                                                                                      //
          // message hook;for calphin listener                                                                        //
          if (!err) {                                                                                                 // 133
            Dispatcher.dispatch({                                                                                     // 134
              actionType: "AUTH_LOGIN_SUCCESS"                                                                        // 135
            });                                                                                                       //
            return;                                                                                                   // 137
          }                                                                                                           //
                                                                                                                      //
          self.setState({                                                                                             // 140
            msg: passedMsg,                                                                                           // 141
            buttonActive: false,                                                                                      // 142
            waiting: false                                                                                            // 143
          });                                                                                                         //
        });                                                                                                           //
      })();                                                                                                           //
    }                                                                                                                 //
  },                                                                                                                  //
  register: function (e) {                                                                                            // 148
                                                                                                                      //
    e.preventDefault();                                                                                               // 150
    if (this.state.msg) return null;                                                                                  // 151
                                                                                                                      //
    var self = this;                                                                                                  // 153
    var form = this.refs.registerForm.getFormData();                                                                  // 154
                                                                                                                      //
    if (form.term != 'on') {                                                                                          // 156
      this.setState({                                                                                                 // 157
        notification: "Please accept the following terms of use."                                                     // 158
      });                                                                                                             //
      return null;                                                                                                    // 160
    }                                                                                                                 //
                                                                                                                      //
    if (form.pw == form.pwRepeat) {                                                                                   // 163
      if (!App.checkPassword(form.pw)) {                                                                              // 164
        this.setState({                                                                                               // 165
          msg: "Password shoud have at least 8 characters, containing Capital Letters AND Numbers."                   // 166
        });                                                                                                           //
        return;                                                                                                       // 168
      }                                                                                                               //
      // Create User                                                                                                  //
      Accounts.createUser({                                                                                           // 171
        email: form.email,                                                                                            // 172
        password: form.pw                                                                                             // 173
      }, function (err) {                                                                                             //
        if (!err) {                                                                                                   // 175
          Meteor.call('SetOptIn', Meteor.userId(), form.OptIn == "on" ? true : false, function (error, res) {         // 176
            console.log(error);                                                                                       // 177
            err = error;                                                                                              // 178
          });                                                                                                         //
          self.resetForm();                                                                                           // 180
        }                                                                                                             //
                                                                                                                      //
        var passedMsg = err && err.error ? ph.errorMsgs[err.error] || err.reason : React.createElement(               // 183
          "p",                                                                                                        //
          null,                                                                                                       //
          "Thank you for registering!"                                                                                //
        );                                                                                                            //
                                                                                                                      //
        if (_.isFunction(self.props.registerCallback)) self.props.registerCallback();                                 // 187
                                                                                                                      //
        if (!err) {                                                                                                   // 190
          Dispatcher.dispatch({                                                                                       // 191
            actionType: "AUTH_REGISTER_SUCCESS"                                                                       // 192
          });                                                                                                         //
          return;                                                                                                     // 194
        }                                                                                                             //
        self.setState({                                                                                               // 196
          msg: passedMsg,                                                                                             // 197
          buttonActive: false,                                                                                        // 198
          waiting: false                                                                                              // 199
        });                                                                                                           //
      });                                                                                                             //
    } else this.setState({                                                                                            //
      msg: ph.errorMsgs[1001],                                                                                        // 204
      buttonActive: false,                                                                                            // 205
      waiting: false                                                                                                  // 206
    });                                                                                                               //
  },                                                                                                                  //
                                                                                                                      //
  reset: function (e) {                                                                                               // 210
    var _this2 = this;                                                                                                //
                                                                                                                      //
    e.preventDefault();                                                                                               // 211
    if (this.state.msg) return null;                                                                                  // 212
                                                                                                                      //
    var form = this.refs.resetForm.getFormData();                                                                     // 214
                                                                                                                      //
    if (form.email.length) {                                                                                          // 216
      (function () {                                                                                                  //
        // Attempt Log In                                                                                             //
        var self = _this2;                                                                                            // 218
        _this2.setState({ waiting: true });                                                                           // 219
        Meteor.call('CheckEmail', form.email, function (err, result) {                                                // 220
                                                                                                                      //
          if (!!err) {                                                                                                // 222
            console.log(err);                                                                                         // 223
            result = false;                                                                                           // 224
          }                                                                                                           //
                                                                                                                      //
          if (result) {                                                                                               // 227
            Accounts.forgotPassword({ email: form.email }, function (err) {                                           // 228
              console.log(err);                                                                                       // 229
              var passedMsg = err && err.error ? ph.errorMsgs[err.error] || err.reason : React.createElement(         // 230
                "p",                                                                                                  //
                null,                                                                                                 //
                "Password Reset Email Has Been Sent!"                                                                 //
              );                                                                                                      //
              self.setState({ msg: passedMsg });                                                                      // 233
            });                                                                                                       //
          } else {                                                                                                    //
            // the email address is not found                                                                         //
            this.setState({                                                                                           // 237
              emailFound: false,                                                                                      // 238
              waiting: false,                                                                                         // 239
              buttonActive: false,                                                                                    // 240
              msg: "Entered E-mail is not in record."                                                                 // 241
            });                                                                                                       //
          }                                                                                                           //
        });                                                                                                           //
      })();                                                                                                           //
    }                                                                                                                 //
  },                                                                                                                  //
                                                                                                                      //
  removeMsg: function (e) {                                                                                           // 248
    e.preventDefault();                                                                                               // 249
    this.setState({                                                                                                   // 250
      waiting: false,                                                                                                 // 251
      msg: null                                                                                                       // 252
    });                                                                                                               //
  },                                                                                                                  //
                                                                                                                      //
  jumpToNextPage: function (e) {                                                                                      // 256
    e.preventDefault();                                                                                               // 257
    this.setState({                                                                                                   // 258
      waiting: false,                                                                                                 // 259
      notification: null,                                                                                             // 260
      msg: null                                                                                                       // 261
    });                                                                                                               //
  },                                                                                                                  //
                                                                                                                      //
  printMsg: function () {                                                                                             // 265
    console.log("printMsg is called", this.state.msg);                                                                // 266
                                                                                                                      //
    var currentMessages = this.state.msg ? [this.state.msg] : [];                                                     // 268
    return React.createElement(                                                                                       // 269
      "div",                                                                                                          //
      null,                                                                                                           //
      currentMessages.map(function (m, n) {                                                                           //
        return React.createElement(                                                                                   // 272
          "div",                                                                                                      //
          { className: "center", key: n },                                                                            //
          React.createElement(                                                                                        //
            "div",                                                                                                    //
            { className: "bigger inline-block invis-70 red" },                                                        //
            _.isString(m) ? React.createElement(                                                                      //
              "div",                                                                                                  //
              null,                                                                                                   //
              m                                                                                                       //
            ) : m                                                                                                     //
          )                                                                                                           //
        );                                                                                                            //
      })                                                                                                              //
    );                                                                                                                //
  },                                                                                                                  //
                                                                                                                      //
  /**                                                                                                                 //
   * @ @ @ @                                                                                                          //
   * Render                                                                                                           //
   * @ @ @ @                                                                                                          //
   */                                                                                                                 //
  renderMsg: function () {                                                                                            // 288
    var self = this;                                                                                                  // 289
    var bg = h.checkColorClass(this.props.bgColor) ? this.props.bgColor : null;                                       // 290
    var msgs = this.state.notification ? [this.state.notification] : []; // This will always be either 1 or 0         // 291
                                                                                                                      //
    return React.createElement(                                                                                       // 293
      RC.Animate,                                                                                                     // 293
      { transitionName: "scale" },                                                                                    //
      msgs.map(function (m, n) {                                                                                      //
        return React.createElement(                                                                                   // 296
          "div",                                                                                                      //
          { className: "abs-full table on-top" + (bg ? " bg-" + bg : ""), key: n },                                   //
          React.createElement(                                                                                        //
            "div",                                                                                                    //
            { className: "inside center" },                                                                           //
            _.isString(m) ? React.createElement(                                                                      //
              "p",                                                                                                    //
              null,                                                                                                   //
              m                                                                                                       //
            ) : m,                                                                                                    //
            React.createElement(                                                                                      //
              RC.Button,                                                                                              // 299
              { onClick: self.jumpToNextPage, theme: "circle", buttonColor: bg },                                     //
              "OK"                                                                                                    //
            )                                                                                                         //
          )                                                                                                           //
        );                                                                                                            //
      })                                                                                                              //
    );                                                                                                                //
  },                                                                                                                  //
                                                                                                                      //
  renderForm: function () {                                                                                           // 307
    var inputTheme = "small-label";                                                                                   // 308
    var buttonTheme = "full";                                                                                         // 309
    if (_.contains(["overlay-light", "overlay-dark"], this.props.theme)) {                                            // 310
      inputTheme += "," + this.props.theme;                                                                           // 311
      buttonTheme += "," + this.props.theme;                                                                          // 312
    }                                                                                                                 //
                                                                                                                      //
    switch (this.state.action) {                                                                                      // 315
                                                                                                                      //
      case "login":                                                                                                   // 317
        return React.createElement(                                                                                   // 318
          RC.Form,                                                                                                    // 318
          { onSubmit: this.login, onKeyUp: this.checkButtonState, ref: "loginForm" },                                 //
          React.createElement(                                                                                        //
            "div",                                                                                                    //
            null,                                                                                                     //
            "Log In To Your Calphin Account"                                                                          //
          ),                                                                                                          //
          this.printMsg(),                                                                                            //
          React.createElement(RC.Input, { name: "username", label: "E-Mail", theme: inputTheme, ref: "username", value: Cookie.get('username') }),
          React.createElement(RC.Input, { name: "password", label: "Password", type: "password", theme: inputTheme, ref: "password" }),
          React.createElement(                                                                                        //
            RC.Button,                                                                                                // 323
            { name: "button", theme: buttonTheme, active: this.state.buttonActive, disabled: this.state.waiting },    //
            this.state.waiting ? React.createElement(RC.uiIcon, { uiClass: "circle-o-notch spin-slow" }) : "Log In"   //
          ),                                                                                                          //
          React.createElement(RC.Checkbox, { name: "keepName", ref: "keepName", value: true, label: "Remember My User Name" })
        );                                                                                                            //
        break;                                                                                                        // 328
                                                                                                                      //
      case "register":                                                                                                // 328
        return React.createElement(                                                                                   // 331
          RC.Form,                                                                                                    // 331
          { onSubmit: this.register, onKeyUp: this.checkButtonState, ref: "registerForm" },                           //
          React.createElement(                                                                                        //
            "div",                                                                                                    //
            null,                                                                                                     //
            "Create an Account"                                                                                       //
          ),                                                                                                          //
          this.printMsg(),                                                                                            //
          React.createElement(RC.Input, { name: "email", label: "E-Mail", theme: inputTheme, ref: "regEmail" }),      //
          React.createElement(RC.PasswordInput, { name: "pw", label: "Password", type: "password", theme: inputTheme, ref: "regPw" }),
          React.createElement(RC.Input, { name: "pwRepeat", label: "Repeat Password", type: "password", theme: inputTheme, ref: "regPwRepeat" }),
          React.createElement(                                                                                        //
            RC.Button,                                                                                                // 337
            { name: "button", theme: buttonTheme, active: this.state.buttonActive, disabled: this.state.waiting },    //
            this.state.waiting ? React.createElement(RC.uiIcon, { uiClass: "circle-o-notch spin-slow" }) : "Sign Up"  //
          ),                                                                                                          //
          React.createElement(RC.Checkbox, { className: "cal-checkbox", name: "term", ref: "term", value: true, label: "Yes，I accpet Privacy Policy and Terms of Use." }),
          React.createElement(RC.Checkbox, { className: "cal-checkbox", name: "optIn", ref: "optIn", value: true, label: "Yes，I’d like to receive email communications from Calphin Aquatic Club" })
        );                                                                                                            //
                                                                                                                      //
      case "reset":                                                                                                   // 344
                                                                                                                      //
        return React.createElement(                                                                                   // 346
          RC.Form,                                                                                                    // 347
          { onSubmit: this.reset, onKeyUp: this.checkButtonState, ref: "resetForm" },                                 //
          React.createElement(                                                                                        //
            "div",                                                                                                    //
            null,                                                                                                     //
            "Reset Password via Email"                                                                                //
          ),                                                                                                          //
          this.printMsg(),                                                                                            //
          React.createElement(RC.Input, { name: "email", label: "E-Mail Address", theme: inputTheme, ref: "email" }),
          React.createElement(                                                                                        //
            RC.Button,                                                                                                // 351
            { name: "button", theme: buttonTheme, active: this.state.buttonActive, disabled: this.state.waiting },    //
            this.state.waiting ? React.createElement(RC.uiIcon, { uiClass: "circle-o-notch spin-slow" }) : "Send Password Reset E-mail"
          )                                                                                                           //
        );                                                                                                            //
        break;                                                                                                        // 356
    }                                                                                                                 // 356
  },                                                                                                                  //
                                                                                                                      //
  render: function () {                                                                                               // 361
                                                                                                                      //
    var classes = this.getTheme() + (this.props.fullHeight ? " full-height" : "") + (this.props.noHeader ? " no-header" : "") + (h.checkColorClass(this.props.bgColor) ? " bg-" + this.props.bgColor : "") + (this.props.alignTop ? "" : " table");
                                                                                                                      //
    return React.createElement(                                                                                       // 369
      "div",                                                                                                          //
      babelHelpers._extends({}, _.omit(this.props, ["className", "theme"]), { className: classes }),                  //
      React.createElement(                                                                                            //
        "div",                                                                                                        //
        { className: "inside" },                                                                                      //
        React.createElement(                                                                                          //
          "div",                                                                                                      //
          { className: "re-wrapper" },                                                                                //
          this.props.children,                                                                                        //
          this.renderMsg(),                                                                                           //
          this.renderForm(),                                                                                          //
          this.state.action != "login" ? null : React.createElement(                                                  //
            "p",                                                                                                      //
            { className: "center" },                                                                                  //
            React.createElement(                                                                                      //
              "span",                                                                                                 //
              { className: "smallest inline-block cursor open-registration invis-70", onClick: this.startReset },     //
              "Forgot Your Password?"                                                                                 //
            )                                                                                                         //
          ),                                                                                                          //
          this.props.disableSwitch ? null : React.createElement(                                                      //
            "p",                                                                                                      //
            { className: "center" },                                                                                  //
            React.createElement(                                                                                      //
              "span",                                                                                                 //
              { className: "smallest inline-block cursor open-registration invis-70", onClick: this.switchAction },   //
              this.state.action == "login" ? "Create a new account" : "Log-in with an existing account"               //
            )                                                                                                         //
          )                                                                                                           //
        )                                                                                                             //
      )                                                                                                               //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
if (h.nk(Meteor.settings, "public.env") != "live") IH.RC.User.Help = {                                                // 397
  Type: "Unique/Canvas",                                                                                              // 399
  Themes: themes,                                                                                                     // 400
  PropTypes: {                                                                                                        // 401
    fullHeight: "Boolean (Makes the login area equal to screen size)",                                                // 402
    noHeader: "Boolean (If fullHeight and noHeader are both true, close the gap where the header would normally be)",
    alignTop: "Boolean (Makes the login area center vertically)",                                                     // 404
    bgColor: "String (Must be a valid CSS color class)",                                                              // 405
    action: "String [\"login\", \"register\"]",                                                                       // 406
    registerCallback: "Callback function for user registrations"                                                      // 407
  },                                                                                                                  //
  Description: "Creates a login form."                                                                                // 409
};                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_users/lib/schemas.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
SimpleSchema.extendOptions({                                                                                          // 2
  editable: Match.Optional(Boolean),                                                                                  // 3
  editableBy: Match.Optional([String])                                                                                // 4
})                                                                                                                    // 5
                                                                                                                      // 6
IH.Schema.Address = new SimpleSchema({                                                                                // 7
  street: {                                                                                                           // 8
    type: String,                                                                                                     // 9
    max: 100                                                                                                          // 10
  },                                                                                                                  // 11
  city: {                                                                                                             // 12
    type: String,                                                                                                     // 13
    max: 50                                                                                                           // 14
  },                                                                                                                  // 15
  state: {                                                                                                            // 16
    type: String,                                                                                                     // 17
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },                                                                                                                  // 19
  zip: {                                                                                                              // 20
    type: String,                                                                                                     // 21
    regEx: /^[0-9]{5}$/                                                                                               // 22
  }                                                                                                                   // 23
});                                                                                                                   // 24
                                                                                                                      // 25
IH.Schema.UserBasic = new SimpleSchema({                                                                              // 26
  name: {                                                                                                             // 27
    type: String,                                                                                                     // 28
    optional: false,                                                                                                  // 29
    editable: true,                                                                                                   // 30
    editableBy: ["admin", "doctor"]                                                                                   // 31
  },                                                                                                                  // 32
  tel: {                                                                                                              // 33
    type: Number,                                                                                                     // 34
    optional: false,                                                                                                  // 35
    editable: true,                                                                                                   // 36
    editableBy: ["admin", "doctor", "patient"]                                                                        // 37
  },                                                                                                                  // 38
  address: {                                                                                                          // 39
    type: IH.Schema.Address,                                                                                          // 40
    optional: true,                                                                                                   // 41
    editable: true,                                                                                                   // 42
    editableBy: ["admin", "doctor", "patient"]                                                                        // 43
  }                                                                                                                   // 44
});                                                                                                                   // 45
                                                                                                                      // 46
IH.Schema.UserDoctor = new SimpleSchema({                                                                             // 47
  verified: {                                                                                                         // 48
    type: Boolean,                                                                                                    // 49
    optional: false,                                                                                                  // 50
    editable: false,                                                                                                  // 51
    editableBy: ["admin"],                                                                                            // 52
    autoValue: function() {}                                                                                          // 53
  },                                                                                                                  // 54
  title: {                                                                                                            // 55
    type: String,                                                                                                     // 56
    optional: true,                                                                                                   // 57
    editable: true,                                                                                                   // 58
    editableBy: ["admin", "doctor"]                                                                                   // 59
  },                                                                                                                  // 60
  specialties: {                                                                                                      // 61
    type: [String],                                                                                                   // 62
    optional: true,                                                                                                   // 63
    editable: true,                                                                                                   // 64
    editableBy: ["admin", "doctor"]                                                                                   // 65
  },                                                                                                                  // 66
  languages: {                                                                                                        // 67
    type: [String],                                                                                                   // 68
    optional: true,                                                                                                   // 69
    editable: true,                                                                                                   // 70
    editableBy: ["admin", "doctor"]                                                                                   // 71
  },                                                                                                                  // 72
  rating: {                                                                                                           // 73
    type: Number,                                                                                                     // 74
    optional: true,                                                                                                   // 75
    decimal: true,                                                                                                    // 76
    editable: false,                                                                                                  // 77
    editableBy: ["admin"]                                                                                             // 78
  },                                                                                                                  // 79
  patients: {                                                                                                         // 80
    type: Object,                                                                                                     // 81
    optional: true,                                                                                                   // 82
    editable: false,                                                                                                  // 83
    editableBy: ["admin", "doctor"]                                                                                   // 84
  }                                                                                                                   // 85
}, "patients.regular", {                                                                                              // 86
  type: [String],                                                                                                     // 87
  optional: true                                                                                                      // 88
}, "patients.vip", {                                                                                                  // 89
  type: [String],                                                                                                     // 90
  optional: true                                                                                                      // 91
});                                                                                                                   // 92
                                                                                                                      // 93
IH.Schema.UserPatient = new SimpleSchema({                                                                            // 94
  DOB: {                                                                                                              // 95
    type: Date,                                                                                                       // 96
    optional: true,                                                                                                   // 97
    editable: true                                                                                                    // 98
  },                                                                                                                  // 99
  height: {                                                                                                           // 100
    type: Number,                                                                                                     // 101
    decimal: true,                                                                                                    // 102
    optional: true,                                                                                                   // 103
    editable: true                                                                                                    // 104
  },                                                                                                                  // 105
  weight: {                                                                                                           // 106
    type: Number,                                                                                                     // 107
    decimal: true,                                                                                                    // 108
    optional: true,                                                                                                   // 109
    editable: true                                                                                                    // 110
  },                                                                                                                  // 111
  doctors: {                                                                                                          // 112
    type: [String],                                                                                                   // 113
    optional: true,                                                                                                   // 114
    editableBy: ["admin", "doctor"]                                                                                   // 115
  },                                                                                                                  // 116
  devices: {                                                                                                          // 117
    type: Object,                                                                                                     // 118
    optional: true,                                                                                                   // 119
    blackbox: true                                                                                                    // 120
  }                                                                                                                   // 121
});                                                                                                                   // 122
                                                                                                                      // 123
IH.Schema.iHealth = new SimpleSchema({                                                                                // 124
  basic: {                                                                                                            // 125
    type: IH.Schema.UserBasic,                                                                                        // 126
    optional: true                                                                                                    // 127
  },                                                                                                                  // 128
  doctor: {                                                                                                           // 129
    type: IH.Schema.UserDoctor,                                                                                       // 130
    optional: true                                                                                                    // 131
  },                                                                                                                  // 132
  patient: {                                                                                                          // 133
    type: IH.Schema.UserPatient,                                                                                      // 134
    optional: true                                                                                                    // 135
  }                                                                                                                   // 136
});                                                                                                                   // 137
                                                                                                                      // 138
IH.Schema.Users = new SimpleSchema({                                                                                  // 139
  createdAt: {                                                                                                        // 140
    type: Date,                                                                                                       // 141
    optional: true,                                                                                                   // 142
  },                                                                                                                  // 143
  updatedAt: {                                                                                                        // 144
    type: Date,                                                                                                       // 145
    optional: true,                                                                                                   // 146
    autoValue: function(){                                                                                            // 147
      if (this.isUpdate)                                                                                              // 148
        return new Date()                                                                                             // 149
      else                                                                                                            // 150
        this.unset()                                                                                                  // 151
    }                                                                                                                 // 152
  },                                                                                                                  // 153
  username: {                                                                                                         // 154
    type: String,                                                                                                     // 155
    optional: true                                                                                                    // 156
  },                                                                                                                  // 157
  emails: {                                                                                                           // 158
    type: [Object],                                                                                                   // 159
    optional: true                                                                                                    // 160
  },                                                                                                                  // 161
  "emails.$.address": {                                                                                               // 162
    type: String,                                                                                                     // 163
    regEx: SimpleSchema.RegEx.Email,                                                                                  // 164
    optional: true                                                                                                    // 165
  },                                                                                                                  // 166
  "emails.$.verified": {                                                                                              // 167
    type: Boolean,                                                                                                    // 168
    optional: true                                                                                                    // 169
  },                                                                                                                  // 170
  roles: {                                                                                                            // 171
    type: [String],                                                                                                   // 172
    allowedValues: ["admin", "doctor", "patient"],                                                                    // 173
    optional: true                                                                                                    // 174
  },                                                                                                                  // 175
  profile: {                                                                                                          // 176
    type: Object,                                                                                                     // 177
    optional: true,                                                                                                   // 178
    blackbox: true                                                                                                    // 179
  },                                                                                                                  // 180
  ihealth: {                                                                                                          // 181
    type: IH.Schema.iHealth,                                                                                          // 182
    optional: true                                                                                                    // 183
  },                                                                                                                  // 184
  services: {                                                                                                         // 185
    type: Object,                                                                                                     // 186
    optional: true,                                                                                                   // 187
    blackbox: true                                                                                                    // 188
  }                                                                                                                   // 189
})                                                                                                                    // 190
                                                                                                                      // 191
Meteor.users.attachSchema(IH.Schema.Users)                                                                            // 192
                                                                                                                      // 193
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:users'] = {};

})();
