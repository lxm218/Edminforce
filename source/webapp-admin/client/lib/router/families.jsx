/**
 * Created on 10/19/15.
 */

{
    let CustomersRoute = FlowRouter.group({
        prefix: '/adminFamilies',
        triggersEnter: [function(context){

        }],
        triggersExit: [function(){

        }]
    });


    CustomersRoute.route('/', {
        //name: "account",
        action: function (p, query) {
            App.routeHandler(p, {
                pageTitle: "FamiliesIndexPage",
                headerNav: null,
                bodyTmpl: <Cal.FamiliesIndexPage {...p } {...query}  />
            })
        }
    })

    CustomersRoute.route('/detail/:accountId', {
        //name: "account",
        action: function (p, query) {
            App.routeHandler(p, {
                pageTitle: "FamiliesDetail",
                headerNav: null,
                bodyTmpl: <Cal.FamiliesDetail {...p} {...query} />
            })
        }
    })




}
