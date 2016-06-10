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

    Route.route('/index/student/:studentID', {
        action: function (p) {
            let studentID = FlowRouter.getParam('studentID');

            App.routeHandler(p, {
                pageTitle: "Registration | index",
                bodyTmpl: <KUI.Registration_index1 studentID={studentID} />
            })
        }
    });

    Route.route('/index/class/:classID', {
        action: function (p) {

            App.routeHandler(p, {
                pageTitle: "Registration | index",
                bodyTmpl: <KUI.Registration_index2 />
            })
        }
    });

    Route.route('/payment/:id', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Registration | payment",
                bodyTmpl: <KUI.Registration_payment />
            });
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

    //new register page
    Route.route('/register', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Registration | register class",
                bodyTmpl: <KUI.Registration_Page />
            });
        }
    });

    Route.route('/summary', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Registration | Summary",
                bodyTmpl: <KUI.Registration_SummaryPage />
            });
        }
    });

    Route.route('/register/success', {
        action : function(p){
            App.routeHandler(p, {
                pageTitle: "Registration | success",
                bodyTmpl: <KUI.Registration_SuccessPage />
            })
        }
    });




}