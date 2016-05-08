if(Meteor.isClient){

	let Route = FlowRouter.group({
		prefix: '/requestlog',
		triggersEnter: [],
		triggersExit: []
	});

	Route.route('/', {
		action: function (p) {
			App.routeHandler(p, {
				pageTitle: "Log | index",
				bodyTmpl: <KUI.RequestLog_Index />
			})
		}
	});






}