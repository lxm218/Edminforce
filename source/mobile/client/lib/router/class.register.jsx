/**
 * Created on 9/14/15.
 */
//为简化期间 layout逻辑不单独分出一个store ，根据需要添加dispatch 消息


{

    let ClassRegisterRoute = FlowRouter.group({
        prefix: '/classRegister',
        triggersEnter: [function (context) {

            if (!(Meteor.loggingIn() || Meteor.userId())) {

                //Todo hard code; should使用name ;等待 name path最终确定
                if (context.path != '/user/User_Login_Basic') {

                    //用于登陆后回调  登陆应该以dispatch message方式
                    Session.set('redirectAfterLogin', context.path)

                    FlowRouter.go('/user/User_Login_Basic')
                }
            }


        }],
        triggersExit: [function () {

        }]
    });


    ClassRegisterRoute.route('/registraionInfoPage', {
        //name: "home",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "registraionInfoPage",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRRegistraionInfoPage/>
            })
        }
    })


    ClassRegisterRoute.route('/SelectClass', {
        //name: "SelectClass",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Select Class",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRSelectClassPage/>
            })

            Dispatcher.dispatch({actionType: "GOTO_CRSelectClassPage"});

        }
    })

    ClassRegisterRoute.route('/SelectClassReady', {
        //name: "SelectClassReady",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "SelectClassReady",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRSelectClassReadyPage/>
            })
        }
    })


    ClassRegisterRoute.route('/RegBillingPage', {
        //name: "CRRegBillingPage",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "CRRegBillingPage",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRRegBillingPage/>
            })
        }
    })
    ClassRegisterRoute.route('/paymentOptionsPage', {
        //name: "CRPaymentOptionsPage",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "CRPaymentOptionsPage",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRPaymentOptionsPage/>
            })
        }
    })
    ClassRegisterRoute.route('/paymentInstoreConfirm', {
        //name: "CRPaymentInstoreConfirm",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "CRPaymentInstoreConfirm",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRPaymentInstoreConfirm/>
            })
        }
    })


    ClassRegisterRoute.route('/AddWaitingList', {
        //name: "AddWaitingList",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "AddWaitingList",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRAddWaitingListPage/>
            })
        }
    })


    ClassRegisterRoute.route('/BookTheSameTimePage', {
        //name: "CRBookTheSameTimePage",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "CRBookTheSameTimePage",
                showGlobalNav: false,
                headerNav: null,
                bodyTmpl: <Cal.CRBookTheSameTimePage/>
            })
            Dispatcher.dispatch({actionType: "GOTO_CRBookTheSameTimePage"});

        }
    })
}
