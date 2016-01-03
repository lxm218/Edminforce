if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/home',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    Route.route('/login', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Home | login",
                bodyTmpl: <KUI.Home_login />
            })
        }
    });






}