if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/payment',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    Route.route('/creditcard', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Payment | Credit Card",
                bodyTmpl: <KUI.Payment_CreditCardPay />
            });
        }
    });

    Route.route('/echeck', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Payment | ECheck",
                bodyTmpl: <KUI.Payment_ECheckPay />
            });
        }
    });








}