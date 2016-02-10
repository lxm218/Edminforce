if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/program/coupon',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Coupon | Index",
                bodyTmpl: <KUI.Coupon_index />
            });
        }
    });
    Route.route('/add', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Coupon | Index",
                bodyTmpl: <KUI.Coupon_add />
            });
        }
    });







}