if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/classes',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Home | Classes",
                bodyTmpl: <KUI.Classes_index />
            })
        }
    });






}