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

    Route.route('/edit/:id', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Program | Edit",
                bodyTmpl: <KUI.Program_edit />
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

    Route.route('/session/edit/:id', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Session | Edit",
                bodyTmpl: <KUI.Session_edit />
            })
        }
    });

    Route.route('/session/copy_class/:sessionID', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle : 'Session | Copy Class',
                bodyTmpl : <KUI.Session_CopySessionClass />
            });
        }
    });





}