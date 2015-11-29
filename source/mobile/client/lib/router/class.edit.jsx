
{

    let ClassEditRoute = FlowRouter.group({
        prefix: '/classEdit',
        triggersEnter: [function(context){

        }],
        triggersExit: [function(){

        }]
    });


    ClassEditRoute.route('/swimmerList', {
        //name: "swimmerList",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Your Swimmers",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CESwimmerListPage/>
            })
        }
    })

    ClassEditRoute.route('/SwimmerRegisteredClass', {
        //name: "home",
        action: function (p,query) {
            App.routeHandler(p, {
                pageTitle: "Registered Class",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.SwimmerRegisteredClassPage {...p} {...query} />
            })
        }
    })


    ClassEditRoute.route('/billingAndPayment', {
        //name: "CEBillingAndPayment",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "CEBillingAndPayment",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CEBillingAndPayment/>
            })
        }
    })

    ////////////////////////////////////////

    ClassEditRoute.route('/operationBoard', {
        //name: "home",
        action: function (p,query) {
            App.routeHandler(p, {
                pageTitle: "Class Operation",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.ClassOperationBoardPage {...p} {...query} />
            })
        }
    })
    ClassEditRoute.route('/change', {
        //name: "home",
        action: function (p , query) {
            App.routeHandler(p, {
                pageTitle: "Class Operation",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.ChangeClassPage {...p} {...query} />
            })
            Dispatcher.dispatch({actionType: "GOTO_ChangeClassPage"});

        }
    })


    ClassEditRoute.route('/cancel', {
        //name: "home",
        action: function (p, query) {
            App.routeHandler(p, {
                pageTitle: "Class Operation",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CECancelClassPage {...p} {...query} />
            })
        }
    })

    ClassEditRoute.route('/makeup', {
        //name: "home",
        action: function (p, query) {
            App.routeHandler(p, {
                pageTitle: "Class Operation",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CEMakeUpClassPage {...p} {...query} />
            })
        }
    })
    ClassEditRoute.route('/CancelClassConfirmPage', {
        //name: "home",
        action: function (p, query) {
            App.routeHandler(p, {
                pageTitle: "CancelClassConfirmPage",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CECancelClassConfirmPage {...p}  {...query}/>
            })
        }
    })

    ClassEditRoute.route('/ChangeClassBillingPage', {
        //name: "home",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Class Operation",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.ChangeClassBillingPage {...p}  />
            })
        }
    })

    ClassEditRoute.route('/sheduleMeeting', {
        //name: "home",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Class Operation",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.SheduleMeetingPage {...p}  />
            })
        }
    })
    ClassEditRoute.route('/writeComment', {
        //name: "home",
        action: function (p, query) {
            App.routeHandler(p, {
                pageTitle: "Class Operation",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.WriteComment {...p}  {...query}/>
            })
        }
    })





}



