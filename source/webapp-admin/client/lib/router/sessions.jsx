/**
 * Created on 10/23/15.
 */
{

    let Route = FlowRouter.group({
        prefix: '/adminSessions',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });


    Route.route('/', {
        //name: "account",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "SessionsIndexPage",
                headerNav: null,
                bodyTmpl: <Cal.SessionsIndexPage />
            })
        }
    })
    Route.route('/detail/:sessionId', {
        //name: "account",
        action: function (p, query) {
            App.routeHandler(p, {
                pageTitle: "SessionsDetail",
                headerNav: null,
                bodyTmpl: <Cal.SessionsDetail {...p} {...query} />
            })
        }
    })


}