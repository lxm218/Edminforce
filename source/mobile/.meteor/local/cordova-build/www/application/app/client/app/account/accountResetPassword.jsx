(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/account/accountResetPassword.jsx                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var themes = ["overlay-light", "overlay-dark"];                        // 1
                                                                       //
Cal.ResetPasswordUser = React.createClass({                            // 3
	displayName: "ResetPasswordUser",                                     //
                                                                       //
	mixins: [RC.Mixins.Theme],                                            // 5
	themeGroup: "ih-login",                                               // 6
	themeDefault: "overlay-dark",                                         // 7
	themes: themes,                                                       // 8
                                                                       //
	getInitialState: function () {                                        // 10
		return {                                                             // 11
			buttonActive: false,                                                // 12
			waiting: false,                                                     // 13
			msg: null                                                           // 14
		};                                                                   //
	},                                                                    //
                                                                       //
	clearForm: function () {                                              // 18
		this.refs.oldPw.reset();                                             // 19
		this.refs.newPw.reset();                                             // 20
		this.refs.newPwRepeat.reset();                                       // 21
		this.setState({                                                      // 22
			msg: null,                                                          // 23
			waiting: false,                                                     // 24
			buttonActive: false });                                             // 25
	},                                                                    //
                                                                       //
	changePassword: function (e) {                                        // 28
		e.preventDefault();                                                  // 29
		var self = this;                                                     // 30
		var form = this.refs.changePasswordForm.getFormData();               // 31
                                                                       //
		if (form.pw == form.pwRepeat) {                                      // 33
			if (!App.checkPassword(form.pw)) {                                  // 34
				this.setState({                                                    // 35
					msg: "Password shoud have at least 8 characters, containing Capital Letters AND Numbers.",
					waiting: false                                                    // 37
				});                                                                //
				return;                                                            // 39
			};                                                                  //
			// Reset Account Password using token                               //
			this.setState({ waiting: true });                                   // 42
			Accounts.changePassword(form.oldPw, form.pw, function (err) {       // 43
				var passedMsg = err && err.error ? ph.errorMsgs[err.error] || err.reason : React.createElement(
					"p",                                                              //
					null,                                                             //
					"Password Changed Successfully!"                                  //
				);                                                                 //
				if (!err) {                                                        // 50
					self.clearForm();                                                 // 51
					Dispatcher.dispatch({                                             // 52
						actionType: "PASSWORD_CHANGE_SUCCESS"                            // 53
					});                                                               //
					return;                                                           // 55
				}                                                                  //
				self.setState({                                                    // 57
					msg: passedMsg                                                    // 58
				});                                                                //
			});                                                                 //
		} else {                                                             //
			this.setState({ msg: "Your passwords did not match, please try again." });
			this.setState({ waiting: false });                                  // 63
		}                                                                    //
	},                                                                    //
                                                                       //
	debuggerHelper: function () {},                                       // 67
                                                                       //
	printMsg: function () {                                               // 70
		console.log("printMsg is called");                                   // 71
		var currentMessages = this.state.msg ? [this.state.msg] : [];        // 72
		return React.createElement(                                          // 73
			"div",                                                              //
			null,                                                               //
			currentMessages.map(function (m, n) {                               //
				return React.createElement(                                        // 76
					"div",                                                            //
					{ className: "center", key: n },                                  //
					React.createElement(                                              //
						"div",                                                           //
						{ className: "bigger inline-block invis-70 red" },               //
						_.isString(m) ? React.createElement(                             //
							"div",                                                          //
							null,                                                           //
							m                                                               //
						) : m                                                            //
					)                                                                 //
				);                                                                 //
			})                                                                  //
		);                                                                   //
	},                                                                    //
                                                                       //
	checkButtonState: function (e) {                                      // 86
		var form = this.refs.changePasswordForm.getFormData();               // 87
		var test = _.every(_.values(form), function (t) {                    // 88
			return t.length && t.length > 0;                                    // 89
		});                                                                  //
		var pwMatch = form.pw == form.pwRepeat;                              // 91
		if (test && pwMatch) {                                               // 92
			this.setState({ msg: null, waiting: false, buttonActive: true });   // 93
		} else if (test && !pwMatch) {                                       //
			this.setState({                                                     // 95
				msg: "Your passwords did not match, please try again.",            // 96
				waiting: false,                                                    // 97
				buttonActive: false });                                            // 98
		} else {                                                             //
			this.setState({ buttonActive: false });                             // 100
		}                                                                    //
	},                                                                    //
                                                                       //
	render: function () {                                                 // 104
		var inputTheme = "small-label";                                      // 105
		var buttonTheme = "full";                                            // 106
		if (_.contains(["overlay-light", "overlay-dark"], this.props.theme)) {
			inputTheme += "," + this.props.theme;                               // 108
			buttonTheme += "," + this.props.theme;                              // 109
		}                                                                    //
		return React.createElement(                                          // 111
			"div",                                                              //
			null,                                                               //
			React.createElement(                                                //
				RC.Form,                                                           // 113
				{ onSubmit: this.changePassword, onKeyUp: this.checkButtonState, ref: "changePasswordForm" },
				this.printMsg(),                                                   //
				React.createElement(RC.Input, { name: "oldPw", label: "Current Password", type: "password", theme: inputTheme, ref: "oldPw" }),
				React.createElement(RC.Input, { name: "pw", label: "Password", type: "password", theme: inputTheme, ref: "newPw" }),
				React.createElement(RC.Input, { name: "pwRepeat", label: "Repeat Password", type: "password", theme: inputTheme, ref: "newPwRepeat" }),
				React.createElement(                                               //
					RC.Button,                                                        // 118
					{ name: "button", active: this.state.buttonActive, theme: buttonTheme, disabled: this.state.waiting },
					this.state.waiting ? React.createElement(RC.uiIcon, { uiClass: "circle-o-notch spin-slow" }) : "Change Password"
				)                                                                  //
			)                                                                   //
		);                                                                   //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
