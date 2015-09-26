Cal.Auth = React.createClass({
	mixins: [ReactMeteorData],
  	
	getMeteorData() {
	 	return {
	  		currentUser: Meteor.user()
	  	};
	 },

	render() {
	    return (

		    <div>
		      <h2 className="brand"> User {this.data.currentUser.username}</h2>
	   		<div className="padding">
	      		This is an app for Yifan Wang testing.
	    	</div>
	    	</div>
	    );
	 }
})