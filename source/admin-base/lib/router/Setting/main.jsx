if(Meteor.isClient){

    let Route = FlowRouter.group({
        prefix: '/setting',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });

    Route.route('/', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Setting | Index",
                bodyTmpl: <KUI.Setting_index />
            });
        }
    });

    Route.route('/changepassword', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Setting | Change Password",
                bodyTmpl: <KUI.Setting_changePassword />
            });
        }
    });

    Route.route('/account/add', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Setting | Add Account",
                bodyTmpl: <KUI.Setting_addAccount />
            });
        }
    });

    Route.route('/account/edit', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Setting | Edit Account",
                bodyTmpl: <KUI.Setting_profile />
            });
        }
    });

    Route.route('/account/edit/:id', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Setting | Edit Account",
                bodyTmpl: <KUI.Setting_EditUser />
            });
        }
    });

    Route.route('/account/list', {
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Setting | Account List",
                bodyTmpl: <KUI.Setting_AdminUserList />
            });
        }
    });








}