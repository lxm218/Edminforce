/**
 * Created on 10/23/15.
 */
{

    let Route = FlowRouter.group({
        prefix: '/adminPrograms',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });


    Route.route('/', {
        //name: "account",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "ProgramsIndexPage",
                headerNav: null,
                bodyTmpl: <Cal.ProgramsIndexPage />
            })
        }
    })


}