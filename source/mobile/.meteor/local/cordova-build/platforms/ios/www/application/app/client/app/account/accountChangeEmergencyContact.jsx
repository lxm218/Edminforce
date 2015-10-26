(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/account/accountChangeEmergencyContact.jsx                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var themes = ["overlay-light", "overlay-dark"];                        // 1
                                                                       //
Cal.ChangeEmergencyContact = React.createClass({                       // 3
	displayName: "ChangeEmergencyContact",                                //
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
		this.refs.name.reset();                                              // 19
		this.refs.phone.reset();                                             // 20
		this.refs.address.reset();                                           // 21
		this.setState({                                                      // 22
			msg: null,                                                          // 23
			waiting: false,                                                     // 24
			buttonActive: false });                                             // 25
	},                                                                    //
                                                                       //
	updateEmergencyContact: function (e) {                                // 28
		e.preventDefault();                                                  // 29
		var self = this;                                                     // 30
		var form = this.refs.EmergencyContactForm.getFormData();             // 31
                                                                       //
		if (form.name) {                                                     // 33
                                                                       //
			// Reset Account Password using token                               //
			this.setState({ waiting: true });                                   // 36
			var emergencyContact = {                                            // 37
				name: form.name,                                                   // 38
				phone: form.phone,                                                 // 39
				address: form.address,                                             // 40
				location: null                                                     // 41
			};                                                                  //
                                                                       //
			Meteor.call('SetEmergencyContact', Meteor.userId(), emergencyContact, function (err, result) {
				var passedMsg = err && err.error ? ph.errorMsgs[err.error] || err.reason : null;
				if (!!err) {                                                       // 48
					console.log(err);                                                 // 49
					self.setState({                                                   // 50
						msg: passedMsg,                                                  // 51
						waiting: false,                                                  // 52
						buttonActive: false });                                          // 53
					return;                                                           // 54
				} else {                                                           //
					self.clearForm();                                                 // 56
					Dispatcher.dispatch({                                             // 57
						actionType: "EMERGENCY_CONTACT_CHANGE_SUCCESS"                   // 58
					});                                                               //
					return;                                                           // 60
				}                                                                  //
			});                                                                 //
		} else {                                                             //
			this.setState({ msg: "Name Cannot Be Empty." });                    // 64
			this.setState({ waiting: false, buttonActive: false });             // 65
		}                                                                    //
	},                                                                    //
                                                                       //
	debuggerHelper: function () {},                                       // 69
                                                                       //
	printMsg: function () {                                               // 72
		console.log("printMsg is called");                                   // 73
		var currentMessages = this.state.msg ? [this.state.msg] : [];        // 74
		return React.createElement(                                          // 75
			"div",                                                              //
			null,                                                               //
			currentMessages.map(function (m, n) {                               //
				return React.createElement(                                        // 78
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
	checkButtonState: function (e) {                                      // 88
		var form = this.refs.EmergencyContactForm.getFormData();             // 89
		var test = _.every(_.values(form), function (t) {                    // 90
			return t.length && t.length > 0;                                    // 91
		});                                                                  //
		if (test != this.state.buttonActive) {                               // 93
			this.setState({ buttonActive: test, msg: null });                   // 94
		}                                                                    //
	},                                                                    //
                                                                       //
	backToAccount: function (e) {                                         // 98
		Dispatcher.dispatch({                                                // 99
			actionType: "GO_BACK"                                               // 100
		});                                                                  //
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
				{ onSubmit: this.updateEmergencyContact, onKeyUp: this.checkButtonState, ref: "EmergencyContactForm" },
				this.printMsg(),                                                   //
				React.createElement(RC.Input, { name: "name", label: "Contact Name", theme: inputTheme, ref: "name" }),
				React.createElement(RC.Input, { name: "phone", label: "Contact Phone Number", theme: inputTheme, ref: "phone" }),
				React.createElement(RC.Input, { name: "address", label: "Contact Address", theme: inputTheme, ref: "address" }),
				React.createElement(                                               //
					"p",                                                              //
					{ className: "center" },                                          //
					React.createElement(                                              //
						"span",                                                          //
						{ className: "smallest inline-block cursor open-registration invis-70", onClick: this.backToAccount },
						"Go Back To My Account"                                          //
					)                                                                 //
				),                                                                 //
				React.createElement(                                               //
					RC.Button,                                                        // 125
					{ name: "button", active: this.state.buttonActive, theme: buttonTheme, disabled: this.state.waiting },
					this.state.waiting ? React.createElement(RC.uiIcon, { uiClass: "circle-o-notch spin-slow" }) : "Update Emergency Contact"
				)                                                                  //
			)                                                                   //
		);                                                                   //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
