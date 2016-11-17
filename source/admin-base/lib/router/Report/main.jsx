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

	Route.route('/dailyRoster', {
		action : function(p){
			App.routeHandler(p, {
				pageTitle: "Report | Daily Roster",
				bodyTmpl: <KUI.Report_DailyRoster/>
			});
		}
	});

	Route.route('/classstudent/program_registration', {
		action : function(p){
			App.routeHandler(p, {
				pageTitle: "Report | Program Registration",
				bodyTmpl: <KUI.Report_ClassStudent_ProgramRegistration />
			});
		}
	});

	Route.route('/classstudent/trialormakeup', {
		action : function(p){
			App.routeHandler(p, {
				pageTitle: "Report | Trial/Makeup Class",
				bodyTmpl: <KUI.Report_ClassStudent_TrialOrMakeup />
			});
		}
	});


	//for shell
	Route.route('/shell/aaa', {
		action : function(p){
			App.routeHandler(p, {
				pageTitle: "Shell",
				bodyTmpl: <KUI.Shell_editClassStudentFeeAndDiscountedForAdmin />
			});
		}
	});

	// Route.route('/emaillist', {
	// 	action : function(p){
	// 		App.routeHandler(p, {
	// 			pageTitle : 'Email List',
	// 			bodyTmpl : <KUI.EmailList_Report />
	// 		})
	// 	}
	// })

	Route.route('/emaillist/:sessionID', {
		action : function(p){
			App.routeHandler(p, {
				pageTitle : 'Email List',
				bodyTmpl : <KUI.EmailList_Report />
			})
		}
	})


}
