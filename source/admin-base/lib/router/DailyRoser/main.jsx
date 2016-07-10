if(Meteor.isClient){

	let Route = FlowRouter.group({
		prefix: '/dailyroster',
		triggersEnter: [function (context) {

		}],
		triggersExit: [function () {

		}]
	});


	Route.route('/', {
		action : function(p){
			App.routeHandler(p, {
				pageTitle: "Daily Roster",
				bodyTmpl: <KUI.Report_DailyRoster/>
			});
		}
	});



}