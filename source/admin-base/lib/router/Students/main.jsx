if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/student',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Students | Index",
                bodyTmpl: <KUI.Student_index />
            });
        }
    });

    Route.route('/:id', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Students | profile",
                bodyTmpl: <KUI.Student_profile />
            });

        }
    });

    Route.route('/add/under/:accountID', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Students | add",
                bodyTmpl: <KUI.Student_add />
            });

        }
    });

    Route.route('/trailclass/:studentID', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Students | Trail Class",
                bodyTmpl: <KUI.Student_TrailClass />
            });

        }
    });






}