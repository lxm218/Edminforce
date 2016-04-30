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
                pageTitle: "Students | Trial Class",
                bodyTmpl: <KUI.Student_TrailClass />
            });

        }
    });

    Route.route('/makeupclass/:studentID/:classID', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Students | Makeup Class",
                bodyTmpl: <KUI.Student_MakeupClass />
            });

        }
    });

    Route.route('/changeclass/:classstudentID', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Students | Change Class",
                bodyTmpl: <KUI.Student_ChangeClass />
            });

        }
    });

    Route.route('/changeclasspay/:classstudentID', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Students | Change Class Payment",
                bodyTmpl: <KUI.Student_ChangeClass_Payment />
            });

        }
    });

    Route.route('/cancelclass/:classstudentID', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Students | Cancel Class",
                bodyTmpl: <KUI.Student_CancelClass />
            });

        }
    });






}