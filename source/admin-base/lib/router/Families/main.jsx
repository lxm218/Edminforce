if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/family',
        triggersEnter: [],
        triggersExit: []
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Family | index",
                bodyTmpl: <KUI.Family_index />
            })
        }
    });








}