(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/auth/auth.jsx                                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Cal.Auth = React.createClass({                                         // 1
	displayName: "Auth",                                                  //
                                                                       //
	mixins: [ReactMeteorData],                                            // 2
                                                                       //
	getMeteorData: function () {                                          // 4
		return {                                                             // 5
			currentUser: Meteor.user()                                          // 6
		};                                                                   //
	},                                                                    //
                                                                       //
	logOut: function () {                                                 // 10
		Meteor.logout();                                                     // 11
		FlowRouter.go("/auth");                                              // 12
	},                                                                    //
                                                                       //
	render: function () {                                                 // 15
		return React.createElement(                                          // 16
			RC.List,                                                            // 18
			{ className: "padding" },                                           //
			this.data.currentUser ? React.createElement(                        //
				"div",                                                             //
				null,                                                              //
				React.createElement(                                               //
					RC.Item,                                                          // 22
					{ theme: "text-wrap" },                                           //
					" User Name: ",                                                   //
					this.data.currentUser.username                                    //
				),                                                                 //
				React.createElement(                                               //
					RC.Item,                                                          // 23
					{ theme: "text-wrap" },                                           //
					" User Email: ",                                                  //
					this.data.currentUser.emails[0].address                           //
				)                                                                  //
			) : React.createElement(                                            //
				RC.Item,                                                           // 24
				{ theme: "text-wrap" },                                            //
				" User Not Logged In"                                              //
			),                                                                  //
			this.data.currentUser ? React.createElement(                        //
				RC.Button,                                                         // 27
				{ onClick: this.logOut, name: "button", theme: "full", buttonColor: "brand" },
				"Log Out"                                                          //
			) : React.createElement(                                            //
				RC.URL,                                                            // 30
				{ href: "/login" },                                                //
				React.createElement(                                               //
					RC.Button,                                                        // 31
					{ name: "button", theme: "full", buttonColor: "brand" },          //
					"Log In"                                                          //
				)                                                                  //
			),                                                                  //
			React.createElement(                                                //
				RC.URL,                                                            // 37
				{ href: "/" },                                                     //
				React.createElement(                                               //
					RC.Button,                                                        // 38
					{ name: "button", theme: "full", buttonColor: "brand" },          //
					"Home"                                                            //
				)                                                                  //
			)                                                                   //
		)                                                                    //
                                                                       //
		// <div>                                                             //
		//   <h2 className="brand"> User {this.data.currentUser.username}</h2>
		// <div className="padding">                                         //
		//  		This is an app for Yifan Wang testing.                         //
		// </div>                                                            //
		// </div>                                                            //
		;                                                                    //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
