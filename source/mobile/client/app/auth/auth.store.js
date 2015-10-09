/**
 * Created on 9/27/15.
 */

 Dependency.add('auth.store', new function () {

    var self = this;

    self.tokenId = Dispatcher.register(function (payload) {
        switch (payload.actionType) {
            case "AUTH_LOGOUT":{
                Meteor.logout(function(err){
                    if(err) {
                        console.error(err) //todo UI side
                        return;
                    }
                    //跳到登陆页面 to be verified todo url 待定
                    FlowRouter.go('/login')
                })
                break;
            }
            case "AUTH_REGISTER_SUCCESS":{
                FlowRouter.LastRoute
                debugger
                FlowRouter.LastRoute=[];
                FlowRouter.go('/account')
                break;
            }
            case "AUTH_RESET_SUCCESS":{
                FlowRouter.LastRoute
                debugger
                FlowRouter.LastRoute=[];
                FlowRouter.go('/account')
                break;
            }
            case "AUTH_LOGIN_SUCCESS":{
                FlowRouter.go('/')
                break;
            }
        }
    })
})