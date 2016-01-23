let themes = ["overlay-light","overlay-dark"]
Cal.PaymentConfirmation = React.createClass({
	mixins: [ReactMeteorData],
  	
	getMeteorData() {
	 	return {
	  		currentUser: Meteor.user()
	  	};
	 },

	 logOut(){
	 	Meteor.logout()
	 	FlowRouter.go("/auth")
	 },

					
	render() {
		var inputTheme = "small-label"
    	var buttonTheme = "full"
		if (_.contains(["overlay-light","overlay-dark"], this.props.theme)) {
      		inputTheme += ","+this.props.theme
      		buttonTheme += ","+this.props.theme
    	}

	    return (
	    	
	    	<RC.List className="padding">

	    		We have received your payment.

	    		Thank you.

	            
	            <RC.URL href="/">
	                <RC.Button name="button" theme="full" buttonColor="brand">
	                    Back To Home
	                </RC.Button>
	            </RC.URL>

        	</RC.List>
	    );
	 }
})