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

	Route.route('/', {
		action : function(p){
			App.routeHandler(p, {
				pageTitle: "Daily Roster",
				bodyTmpl: <KUI.Report_DailyRoster/>
			});
		}
	});

	Route.route('/rosterPrinter', {
		action : function(p){
			App.routeHandler(p, {
				pageTitle: "Daily Roster Printer",
				bodyTmpl: <KUI.Report_RosterPrinter/>,
				layout: KUI.EmptyLayout,
            	showGlobalNav: false,
            	globalNav: null,
            	headerNav: null,
			});
		}
	});

}