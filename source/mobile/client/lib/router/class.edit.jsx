
{

    let ClassEditRoute = FlowRouter.group({
        prefix: '/classEdit',
        triggersEnter: [function(context){

            if(!(Meteor.loggingIn()|| Meteor.userId())){

                //Todo hard code; should使用name ;等待 name path最终确定
                if(context.path != '/user/User_Login_Basic'){

                    //用于登陆后回调  登陆应该以dispatch message方式
                    Session.set('redirectAfterLogin', context.path)

                    FlowRouter.go('/user/User_Login_Basic')
                }
            }


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
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Registered Class",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.SwimmerRegisteredClassPage {...p} />
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
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Class Operation",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.WriteComment {...p}  />
            })
        }
    })





}



