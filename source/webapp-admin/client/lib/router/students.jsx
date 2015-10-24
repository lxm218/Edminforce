/**
 * Created on 10/23/15.
 */

{

    let Route = FlowRouter.group({
        prefix: '/adminStudents',
        triggersEnter: [function (context) {

        }],
        triggersExit: [function () {

        }]
    });


    Route.route('/', {
        //name: "account",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "StudentsIndexPage",
                headerNav: null,
                bodyTmpl: <Cal.StudentsIndexPage />
            })
        }
    })


}