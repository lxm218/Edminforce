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

    Route.route('/profile/:id', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle : 'Family | profile',
                bodyTmpl : <KUI.Family_profile />
            });
        }
    });

    Route.route('/add', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle : 'Family | profile',
                bodyTmpl : <KUI.Family_add />
            });
        }
    });








}