/**
 * Created on 9/26/15.
 */

{

    let AccountRoute = FlowRouter.group({
        prefix: '/account',
        triggersEnter: [function(context){
            console.log('enter group')

            debugger
            if(!(Meteor.loggingIn()|| Meteor.userId())){

                //Todo hard code; should使用name ;等待 name path最终确定
                if(context.path != '/user/User_Login_Basic'){

                    //用于登陆后回调  登陆应该以dispatch message方式
                    Session.set('redirectAfterLogin', context.path)

                    //var redirectAfterLogin =Session.get('redirectAfterLogin')
                    //if(redirectAfterLogin){
                    //    FlowRouter.go(redirectAfterLogin)
                    //}else{
                    //    //to verify
                    //    FlowRouter.go('/')
                    //}


                    FlowRouter.go('/user/User_Login_Basic')
                }
            }


        }],
        triggersExit: [function(){

        }]
    });



    AccountRoute.route('/', {
        //name: "account",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "Management",
                headerNav: null,
                bodyTmpl: <Cal.AccountManagement/>
            })
        }
    })

    AccountRoute.route('/AddSwimmer', {
        //name: "home",
        action: function (p) {
            App.routeHandler(p, {
                pageTitle: "AddSwimmer",
                headerNav: null,
                bodyTmpl: <Cal.AccountAddSwimmer/>
            })
        }
    })

}


