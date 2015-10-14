let themes = ["overlay-light","overlay-dark"]

Cal.ResetUserName = React.createClass({

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
		this.refs.userName.reset()
		this.setState({ 
			msg: null,
			waiting: false,
			buttonActive: false })
	},

	changeUserName(e){
		debugger
		e.preventDefault()
		let self = this
		let form = this.refs.changeUserNameForm.getFormData()

		if (form.userName) {

	      	// Reset Account Password using token
	      	this.setState({ waiting: true })

	      	Meteor.call('SetUserName', Meteor.userId(), form.userName, function(err, result){
	      		debugger
	      		let passedMsg = err && err.error
	      				? (ph.errorMsgs[err.error] || err.reason)
	      				: null
	      		if (!!err) {
	      			console.log(err)
	      			self.setState({ 
	      				msg: passedMsg,
	      				waiting: false,
	      				buttonActive: false })
	      			return
	      		} else {
	      			self.clearForm()
		      		Dispatcher.dispatch({
		        		actionType: "USERNAME_CHANGE_SUCCESS"
		        	});
		        	return;
	      		}
	      	})
	  	} else { 
	  		this.setState({ msg: "UserName Cannot Be Empty." })
	  		this.setState({ waiting: false, buttonActive: false })
	  	}
	},

	debuggerHelper(){
		debugger
	},

	printMsg(){
		console.log("printMsg is called")
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

	checkButtonState(e){
		var form = this.refs.changeUserNameForm.getFormData()
		let test = _.every( _.values(form), function(t){
			return t.length && t.length>0
		})
		if(test	!= this.state.buttonActive) {
			this.setState({ buttonActive: test, msg: null})
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
				<RC.Form onSubmit={this.changeUserName} onKeyUp={this.checkButtonState} ref="changeUserNameForm">
					<RC.Input name="userName" label="New User name"  theme={inputTheme} ref="userName"  />
					{this.printMsg()}
					<RC.Button name="button" active={this.state.buttonActive} theme={buttonTheme} disabled={this.state.waiting}>
						{this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" /> : "Change userName"}
					</RC.Button>
				</RC.Form>
			</div>
		);
	}
}); 