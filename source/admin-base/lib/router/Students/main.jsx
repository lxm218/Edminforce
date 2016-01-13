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
                pageTitle: "Home | Students",
                bodyTmpl: <KUI.Student_index />
            })
        }
    });






}