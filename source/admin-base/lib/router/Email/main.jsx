if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/email',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Email | Index",
                bodyTmpl: <KUI.Email_index />
            });
        }
    });

    Route.route('/template/add', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Email | Add Template",
                bodyTmpl: <KUI.Email_AddTemplate />
            });
        }
    });

    Route.route('/template/edit/:emailID', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Email | Edit Template",
                bodyTmpl: <KUI.Email_EditTemplate />
            });
        }
    });







}