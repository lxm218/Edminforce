Cal.Auth = React.createClass({
	mixins: [ReactMeteorData],
  	
	getMeteorData() {
	 	return {
	  		currentUser: Meteor.user()
	  	};
	 },

	render() {
	    return (

	    	<RC.List className="padding">

	            { this.data.currentUser ?
	            	<div>
	            		<RC.Item theme="text-wrap"> User Name: {this.data.currentUser.username}</RC.Item>
	            		<RC.Item theme="text-wrap"> User Email: {this.data.currentUser.emails[0].address}</RC.Item>
	            	</div> : <RC.Item theme="text-wrap"> User Not Logged In</RC.Item>
	            }
	            <RC.URL href="/user/User_Login_Basic">
	                <RC.Button name="button" theme="full" buttonColor="brand">
	                    Log In
	                </RC.Button>
	            </RC.URL>

        	</RC.List>

		    // <div>
		    //   <h2 className="brand"> User {this.data.currentUser.username}</h2>
	   		// <div className="padding">
	     //  		This is an app for Yifan Wang testing.
	    	// </div>
	    	// </div>
	    );
	 }
})