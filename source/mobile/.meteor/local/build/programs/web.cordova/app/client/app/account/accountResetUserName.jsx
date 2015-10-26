(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/account/accountResetUserName.jsx                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var themes = ["overlay-light", "overlay-dark"];                        // 1
                                                                       //
Cal.ResetUserName = React.createClass({                                // 3
	displayName: "ResetUserName",                                         //
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
		this.refs.userName.reset();                                          // 19
		this.setState({                                                      // 20
			msg: null,                                                          // 21
			waiting: false,                                                     // 22
			buttonActive: false });                                             // 23
	},                                                                    //
                                                                       //
	changeUserName: function (e) {                                        // 26
		e.preventDefault();                                                  // 27
		var self = this;                                                     // 28
		var form = this.refs.changeUserNameForm.getFormData();               // 29
                                                                       //
		if (form.userName) {                                                 // 31
                                                                       //
			// Reset Account Password using token                               //
			this.setState({ waiting: true });                                   // 34
                                                                       //
			Meteor.call('SetUserName', Meteor.userId(), form.userName, function (err, result) {
				var passedMsg = err && err.error ? ph.errorMsgs[err.error] || err.reason : null;
				if (!!err) {                                                       // 40
					console.log(err);                                                 // 41
					self.setState({                                                   // 42
						msg: passedMsg,                                                  // 43
						waiting: false,                                                  // 44
						buttonActive: false });                                          // 45
					return;                                                           // 46
				} else {                                                           //
					self.clearForm();                                                 // 48
					Dispatcher.dispatch({                                             // 49
						actionType: "USERNAME_CHANGE_SUCCESS"                            // 50
					});                                                               //
					return;                                                           // 52
				}                                                                  //
			});                                                                 //
		} else {                                                             //
			this.setState({ msg: "UserName Cannot Be Empty." });                // 56
			this.setState({ waiting: false, buttonActive: false });             // 57
		}                                                                    //
	},                                                                    //
                                                                       //
	debuggerHelper: function () {},                                       // 61
                                                                       //
	printMsg: function () {                                               // 64
		console.log("printMsg is called");                                   // 65
		var currentMessages = this.state.msg ? [this.state.msg] : [];        // 66
		return React.createElement(                                          // 67
			"div",                                                              //
			null,                                                               //
			currentMessages.map(function (m, n) {                               //
				return React.createElement(                                        // 70
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
	checkButtonState: function (e) {                                      // 80
		var form = this.refs.changeUserNameForm.getFormData();               // 81
		var test = _.every(_.values(form), function (t) {                    // 82
			return t.length && t.length > 0;                                    // 83
		});                                                                  //
		if (test != this.state.buttonActive) {                               // 85
			this.setState({ buttonActive: test, msg: null });                   // 86
		}                                                                    //
	},                                                                    //
                                                                       //
	render: function () {                                                 // 90
		var inputTheme = "small-label";                                      // 91
		var buttonTheme = "full";                                            // 92
		if (_.contains(["overlay-light", "overlay-dark"], this.props.theme)) {
			inputTheme += "," + this.props.theme;                               // 94
			buttonTheme += "," + this.props.theme;                              // 95
		}                                                                    //
		return React.createElement(                                          // 97
			"div",                                                              //
			null,                                                               //
			React.createElement(                                                //
				RC.Form,                                                           // 99
				{ onSubmit: this.changeUserName, onKeyUp: this.checkButtonState, ref: "changeUserNameForm" },
				this.printMsg(),                                                   //
				React.createElement(RC.Input, { name: "userName", label: "New User name", theme: inputTheme, ref: "userName" }),
				React.createElement(                                               //
					RC.Button,                                                        // 102
					{ name: "button", active: this.state.buttonActive, theme: buttonTheme, disabled: this.state.waiting },
					this.state.waiting ? React.createElement(RC.uiIcon, { uiClass: "circle-o-notch spin-slow" }) : "Change userName"
				)                                                                  //
			)                                                                   //
		);                                                                   //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
