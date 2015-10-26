(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/router/common.jsx                                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Client Routes                                                       //
 */                                                                    //
                                                                       //
{                                                                      // 6
    //global router control                                            //
                                                                       //
    FlowRouter.LastRoute = [];                                         // 9
    var savedRoute = null;                                             // 10
                                                                       //
    //define global triggers for test                                  //
    FlowRouter.triggers.enter([function (context) {                    // 13
        //console.log('Router enter: path='+context.path,' name= '+FlowRouter.getRouteName())
                                                                       //
        //hack 从注册页跳过来 todo 系统处理url history                            //
        if (savedRoute == '/login') {                                  // 17
            savedRoute = '/';                                          // 18
        }                                                              //
                                                                       //
        if (!FlowRouter.BackButton && savedRoute) FlowRouter.LastRoute.push(savedRoute);else if (FlowRouter.BackButton) FlowRouter.LastRoute.pop();
                                                                       //
        FlowRouter.BackButton = false;                                 // 27
        //calphin logic                                                //
        if (!(Meteor.loggingIn() || Meteor.userId())) {                // 29
            //Todo hard code; should使用name ;等待 name path最终确定           //
            if (context.path.indexOf("reset-password") > -1) {         // 31
                /*                                                     //
                 * This is for resetting password via email.           //
                 * User will click on an URL contianing 'reset-password'.
                 * At that time, user is not logged in, but he has the token to reset password
                 * So, we send him to reset password page, instead of the login page.
                 * Todo: make sure that the token is provided in the link, if not, we should still
                 * direct user to login page.                          //
                 */                                                    //
                FlowRouter.go(context.path);                           // 40
            } else if (context.path != '/login') {                     //
                //用于登陆后回调  登陆应该以dispatch message方式                     //
                Session.set('redirectAfterLogin', context.path);       // 43
                //var redirectAfterLogin =Session.get('redirectAfterLogin')
                //if(redirectAfterLogin && 'redirectAfterLogin不是login page时'){
                //    FlowRouter.go(redirectAfterLogin)                //
                //}else{                                               //
                //    //to verify                                      //
                //    FlowRouter.go('/')                               //
                //}                                                    //
                FlowRouter.go('/login');                               // 51
            }                                                          //
        }                                                              //
    }]);                                                               //
                                                                       //
    FlowRouter.triggers.exit([function (context) {                     // 59
        //console.log('Router exit: path='+context.path,' name= '+FlowRouter.getRouteName())
                                                                       //
        savedRoute = FlowRouter.current().path;                        // 62
        window.scrollTo(0, 0);                                         // 63
    }]);                                                               //
}                                                                      //
                                                                       //
// Home Route                                                          //
DefaultRoutes.route('/', {                                             // 75
    name: "home",                                                      // 76
    action: function (p) {                                             // 77
        App.routeHandler(p, {                                          // 78
            pageTitle: "Home",                                         // 79
            headerNav: null,                                           // 80
            leftNavToggle: true, //左侧导航触发按钮                            // 81
            bodyTmpl: React.createElement(Cal.Home, null),             // 82
                                                                       //
            hideBackButton: true,                                      // 84
            leftNavToggle: true                                        // 85
        });                                                            //
    }                                                                  //
});                                                                    //
                                                                       //
DefaultRoutes.route('/ContactInfoPage', {                              // 90
    name: "ContactInfoPage",                                           // 91
    action: function (p) {                                             // 92
        App.routeHandler(p, {                                          // 93
            pageTitle: "ContactInfoPage",                              // 94
            headerNav: null,                                           // 95
            leftNavToggle: true, //左侧导航触发按钮                            // 96
            bodyTmpl: React.createElement(Cal.ContactInfoPage, null)   // 97
        });                                                            //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
