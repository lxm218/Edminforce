let themes = ["overlay-light","overlay-dark"]

Cal.ChangeAlternateContact = React.createClass({

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
		this.refs.name.reset()
		this.refs.phone.reset()
		this.refs.address.reset()
		this.setState({ 
			msg: null,
			waiting: false,
			buttonActive: false })
	},

	updateAlternateContact(e){
		e.preventDefault()
		let self = this
		let form = this.refs.AlternateContactForm.getFormData()

		if (form.name) {

	      	// Reset Account Password using token
	      	this.setState({ waiting: true })
	      	let alternateContact = {
	      		name: form.name,
	      		phone: form.phone,
	      		address: form.address,
	      		location: null
	      	}

	      	Meteor.call('SetAlternateContact', Meteor.userId(), alternateContact, function(err, result){
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
		        		actionType: "ALTERNATE_CONTACT_CHANGE_SUCCESS"
		        	});
		        	return;
	      		}
	      	})
	  	} else { 
	  		this.setState({ msg: "Name Cannot Be Empty." })
	  		this.setState({ waiting: false, buttonActive: false })
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
		var form = this.refs.AlternateContactForm.getFormData()
		let test = _.every( _.values(form), function(t){
			return t.length && t.length>0
		})
		if(test	!= this.state.buttonActive) {
			this.setState({ buttonActive: test, msg: null})
		}
	},

	backToAccount(e){
		Dispatcher.dispatch({
		    actionType: "GO_BACK"
		});
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
				<RC.Form onSubmit={this.updateAlternateContact} onKeyUp={this.checkButtonState} ref="AlternateContactForm">
					{this.printMsg()}
					<RC.Input name="name" label="Contact Name"  theme={inputTheme} ref="name"  />
					<RC.Input name="phone" label="Contact Phone Number"  theme={inputTheme} ref="phone"  />
					<RC.Input name="address" label="Contact Address"  theme={inputTheme} ref="address"  />
					{
			            <p className="center">
			              <span className="smallest inline-block cursor open-registration invis-70" onClick={this.backToAccount}>
			                Go Back To My Account
			              </span>
			            </p>
			        }
					<RC.Button bgColor="brand1" name="button" active={this.state.buttonActive} theme={buttonTheme} disabled={this.state.waiting}>
						{this.state.waiting ? <RC.uiIcon uiClass="circle-o-notch spin-slow" /> : "Update Alternate Contact"}
					</RC.Button>
				</RC.Form>
			</div>
		);
	}
}); 