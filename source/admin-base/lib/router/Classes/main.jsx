if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/classes',
        triggersEnter: [],
        triggersExit: []
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Class | index",
                bodyTmpl: <KUI.Class_index />
            })
        }
    });

    Route.route('/add', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Class | add",
                bodyTmpl: <KUI.Class_add />
            })
        }
    });






}