if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/program',
        triggersEnter: [],
        triggersExit: []
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Home | Program",
                bodyTmpl: <KUI.Program_index />
            })
        }
    });







}