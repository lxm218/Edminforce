if(Meteor.isClient){




    let Route = FlowRouter.group({
        prefix: '/home',
        triggersEnter: [],
        triggersExit: []
    });

    Route.route('/login', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Home | login",
                bodyTmpl: <KUI.Home_login />
            })
        }
    });

    Route.route('/', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Home | index",
                bodyTmpl: <KUI.Home_index />
            })
        }
    });

    Route.route('/changepassword', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Home | change password",
                bodyTmpl: <KUI.Home_change_password />
            });
        }
    });






}