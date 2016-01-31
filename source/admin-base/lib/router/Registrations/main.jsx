if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/registration',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Registration | index",
                bodyTmpl: <KUI.Registration_index />
            })
        }
    });

    Route.route('/success/:id', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Registration | success",
                bodyTmpl: <KUI.Registration_success />
            })
        }
    });






}