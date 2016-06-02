if(Meteor.isClient){
    let Route = FlowRouter.group({
        prefix: '/teachers',
        triggersEnter: [],
        triggersExit: []
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Teachers",
                bodyTmpl: <KUI.Teachers_index />
            })
        }
    });
}