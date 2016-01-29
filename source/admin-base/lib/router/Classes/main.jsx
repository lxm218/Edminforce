if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/classes',
        triggersEnter: [],
        triggersExit: []
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Home | Classes",
                bodyTmpl: <KUI.Classes_index />
            })
        }
    });

    Route.route('/add', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Classes | add",
                bodyTmpl: <KUI.Class_add />
            })
        }
    });






}