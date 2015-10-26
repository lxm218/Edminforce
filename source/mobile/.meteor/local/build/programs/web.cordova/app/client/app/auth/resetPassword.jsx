(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/auth/resetPassword.jsx                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var themes = ["overlay-light", "overlay-dark"];                        // 1
Cal.ResetPasswordEmail = React.createClass({                           // 2
	displayName: "ResetPasswordEmail",                                    //
                                                                       //
	mixins: [RC.Mixins.Theme],                                            // 4
	themeGroup: "ih-login",                                               // 5
	themeDefault: "overlay-dark",                                         // 6
	themes: themes,                                                       // 7
                                                                       //
	propTypes: {                                                          // 9
		userToken: React.PropTypes.string                                    // 10
	},                                                                    //
                                                                       //
	getInitialState: function () {                                        // 13
		return {                                                             // 14
			buttonActive: false,                                                // 15
			waiting: false,                                                     // 16
			msg: null                                                           // 17
		};                                                                   //
	},                                                                    //
                                                                       //
	clearForm: function () {                                              // 21
		this.refs.newPw.reset();                                             // 22
		this.refs.newPwRepeat.reset();                                       // 23
		this.setState({                                                      // 24
			msg: null,                                                          // 25
			waiting: false });                                                  // 26
	},                                                                    //
                                                                       //
	reset: function (e) {                                                 // 29
		e.preventDefault();                                                  // 30
		if (this.state.msg) return null;                                     // 31
		var self = this;                                                     // 32
		var form = this.refs.resetForm.getFormData();                        // 33
                                                                       //
		if (form.pw == form.pwRepeat) {                                      // 35
			if (!App.checkPassword(form.pw)) {                                  // 36
				this.setState({                                                    // 37
					msg: "Password shoud have at least 8 characters, containing Capital Letts AND Numbers.",
					waiting: false                                                    // 39
				});                                                                //
				return;                                                            // 41
			};                                                                  //
			// Reset Account Password using token                               //
			this.setState({ waiting: true });                                   // 44
			Accounts.resetPassword(this.props.userToken, form.pw, function (err) {
				var passedMsg = err && err.error ? ph.errorMsgs[err.error] || err.reason : React.createElement(
					"p",                                                              //
					null,                                                             //
					"Thank you for registering!"                                      //
				);                                                                 //
				if (!err) {                                                        // 52
					self.clearForm();                                                 // 53
					Dispatcher.dispatch({                                             // 54
						actionType: "AUTH_RESET_SUCCESS"                                 // 55
					});                                                               //
					return;                                                           // 57
				}                                                                  //
				self.setState({                                                    // 59
					msg: passedMsg                                                    // 60
				});                                                                //
			});                                                                 //
		} else {                                                             //
			this.setState({ msg: "Your passwords did not match, please try again." });
			this.setState({ waiting: false });                                  // 65
		}                                                                    //
	},                                                                    //
                                                                       //
	debuggerHelper: function () {},                                       // 69
                                                                       //
	printMsg: function () {                                               // 73
		console.log("printMsg is called");                                   // 74
		var currentMessages = this.state.msg ? [this.state.msg] : [];        // 75
		return React.createElement(                                          // 76
			"div",                                                              //
			null,                                                               //
			currentMessages.map(function (m, n) {                               //
				return React.createElement(                                        // 79
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
	checkButtonState: function (e) {                                      // 89
		var form = this.refs.resetForm.getFormData();                        // 90
		var test = _.every(_.values(form), function (t) {                    // 91
			return t.length && t.length > 0;                                    // 92
		});                                                                  //
		var pwMatch = form.pw == form.pwRepeat;                              // 94
		if (test && pwMatch) {                                               // 95
			this.setState({ msg: null, waiting: false, buttonActive: true });   // 96
		} else if (test && !pwMatch) {                                       //
			this.setState({                                                     // 98
				msg: "Your passwords did not match, please try again.",            // 99
				waiting: false,                                                    // 100
				buttonActive: false });                                            // 101
		} else {                                                             //
			this.setState({ buttonActive: false });                             // 103
		}                                                                    //
	},                                                                    //
                                                                       //
	render: function () {                                                 // 107
                                                                       //
		var inputTheme = "small-label";                                      // 109
		var buttonTheme = "full";                                            // 110
		if (_.contains(["overlay-light", "overlay-dark"], this.props.theme)) {
			inputTheme += "," + this.props.theme;                               // 112
			buttonTheme += "," + this.props.theme;                              // 113
		}                                                                    //
		return React.createElement(                                          // 115
			"div",                                                              //
			null,                                                               //
			React.createElement(                                                //
				RC.Form,                                                           // 117
				{ onSubmit: this.reset, onKeyUp: this.checkButtonState, ref: "resetForm" },
				React.createElement(RC.Input, { name: "pw", label: "Password", type: "password", theme: inputTheme, ref: "newPw" }),
				React.createElement(RC.Input, { name: "pwRepeat", label: "Repeat Password", type: "password", theme: inputTheme, ref: "newPwRepeat" }),
				this.printMsg(),                                                   //
				React.createElement(                                               //
					RC.Button,                                                        // 121
					{ name: "button", active: this.state.buttonActive, theme: buttonTheme, disabled: this.state.waiting },
					this.state.waiting ? React.createElement(RC.uiIcon, { uiClass: "circle-o-notch spin-slow" }) : "Reset Password"
				)                                                                  //
			)                                                                   //
		);                                                                   //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
