if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/registration',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Home | Registrations",
                bodyTmpl: <KUI.Registration_index />
            })
        }
    });






}