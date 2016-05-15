if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/program/class',
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

    Route.route('/detail/:id', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Class | detail",
                bodyTmpl: <KUI.Class_detail />
            });

        }
    });


    //todo move to another place?
    FlowRouter.route('/classCalendar', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "calendar",
                bodyTmpl: <KUI.Class_calendar />
            });

        }
    });









}