if(Meteor.isClient){

	let Route = FlowRouter.group({
		prefix: '/report',
		triggersEnter: [function (context) {

		}],
		triggersExit: [function () {

		}]
	});

	Route.route('/', {
		action: function (p) {
			App.routeHandler(p, {
				pageTitle: "Report | Index",
				bodyTmpl: <KUI.Report_Index />
			});
		}
	});

	Route.route('/finance', {
		action: function (p) {
			App.routeHandler(p, {
				pageTitle: "Report | Finance",
				bodyTmpl: <KUI.Report_Finance />
			});
		}
	});

	Route.route('/student', {
		action: function (p) {
			App.routeHandler(p, {
				pageTitle: "Report | Student",
				bodyTmpl: <KUI.Report_Student />
			});
		}
	});









}