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

	Route.route('/classstudent/pending', {
		action: function (p) {
			App.routeHandler(p, {
				pageTitle: "Report | Pending Registration",
				bodyTmpl: <KUI.Report_ClassStudent_Pending />
			});
		}
	});

	Route.route('/customer/schoolcredit', {
		action : function(p){
			App.routeHandler(p, {
				pageTitle: "Report | School Credit",
				bodyTmpl: <KUI.Report_Customer_SchoolCredit />
			});
		}
	});

	Route.route('/coupon', {
		action : function(p){
			App.routeHandler(p, {
				pageTitle: "Report | Coupon Credit",
				bodyTmpl: <KUI.Report_Coupon />
			});
		}
	});







}