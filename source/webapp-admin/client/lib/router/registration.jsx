/**
 * Created on 10/23/15.
 */

{

    let Route = FlowRouter.group({
        prefix: '/adminRegistration',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });


    Route.route('/', {
        //name: "account",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "RegistrationIndexPage",
                headerNav: null,
                bodyTmpl: <Cal.RegistrationIndexPage />
            })
        }
    })


}