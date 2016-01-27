if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/program',
        triggersEnter: [],
        triggersExit: []
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Program | index",
                bodyTmpl: <KUI.Program_index />
            })
        }
    });

    Route.route('/session', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Program | session",
                bodyTmpl: <KUI.Program_session />
            })
        }
    });





}