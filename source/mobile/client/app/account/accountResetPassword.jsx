let themes = ["overlay-light","overlay-dark"]

Cal.ResetPasswordUser = React.createClass({

	mixins: [RC.Mixins.Theme],
	themeGroup: "ih-login",
	themeDefault: "overlay-dark",
	themes: themes,

	getInitialState() {
		return {
			buttonActive: false,
			waiting: false,
			msg: null,
		}
	},

	clearForm(){
		this.refs.oldPw.reset()
		this.refs.newPw.reset()
		this.refs.newPwRepeat.reset()
		this.setState({ 
			msg: null,
			waiting: false,
			buttonActive: false })
	},

	changePassword(e){
		e.preventDefault()
		let self = this
		let form = this.refs.changePasswordForm.getFormData()

		if (form.pw == form.pwRepeat) {
			if (!App.checkPassword(form.pw)) {
				this.setState({
          			msg: "Password shoud have at least 8 characters, containing Capital Letters AND Numbers.",
          			waiting: false
        		})
        		return
			};
	      	// Reset Account Password using token
	      	this.setState({ waiting: true })
	      	Accounts.changePassword(
	      		form.oldPw,
	      		form.pw,
	      		function(err) {
		      		let passedMsg = err && err.error
		      			? (ph.errorMsgs[err.error] || err.reason)
		      			: <p>Password Changed Successfully!</p>
		      		if (!err) {
		      			self.clearForm()
		      			Dispatcher.dispatch({
		        			actionType: "PASSWORD_CHANGE_SUCCESS"
		        		});
		        		return;
		      		}
		        	self.setState({
		        		msg: passedMsg
		        	})
	    		})
	  	} else { 
	  		this.setState({ msg: "Your passwords did not match, please try again." })
	  		this.setState({ waiting: false })
	  	}
	},

	debuggerHelper(){
	},

	printMsg(){
		console.log("printMsg is called")
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

	checkButtonState(e){
		var form = this.refs.changePasswordForm.getFormData()
		let test = _.every( _.values(form), function(t){
			return t.length && t.length>0
		})
		let pwMatch = form.pw == form.pwRepeat
		if (test && pwMatch) {
			this.setState({ msg: null, waiting: false, buttonActive: true})
		} else if (test && !pwMatch) {
			this.setState({ 
				msg: "Your passwords did not match, please try again.", 
				waiting: false, 
				buttonActive: false})
		} else {
			this.setState({ buttonActive: false })
		}
	},

	render: function() {
		var inputTheme = "small-label"
    	var buttonTheme = "full"
		if (_.contains(["overlay-light","overlay-dark"], this.props.theme)) {
      		inputTheme += ","+this.props.theme
      		buttonTheme += ","+this.props.theme
    	}
		return (
			<div>
				<RC.Form onSubmit={this.changePassword} onKeyUp={this.checkButtonState} ref="changePasswordForm">
					{this.printMsg()}
					<RC.Input name="oldPw" label="Current Password" type="password" theme={inputTheme} ref="oldPw" />
					<RC.Input name="pw" label="Password" type="password" theme={inputTheme} ref="newPw" />
					<RC.Input name="pwRepeat" label="Repeat Password" type="password" theme={inputTheme} ref="newPwRepeat" />
					<RC.Button name="button" active={this.state.buttonActive} theme={buttonTheme} disabled={this.state.waiting}>
						{this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" /> : "Change Password"}
					</RC.Button>
				</RC.Form>
			</div>
		);
	}
}); 