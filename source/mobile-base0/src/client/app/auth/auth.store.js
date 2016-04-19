/**
 * Created on 9/27/15.
 */

Dependency.add('auth.store', new function () {

    var self = this;

    function postLoginAction() {
        if(Session.get("BookTrialClassId")){
            let params = {
                programsId: Session.get("BookTrialProgramId"),
                classId: Session.get("BookTrialClassId"),
                timestamp: Session.get("BookTrialTimestamp")
            }
            let path = FlowRouter.path("/programs/:programsId/:classId/:timestamp", params);
            FlowRouter.go(path);
            Session.set("BookTrialClassId", null);
            Session.set("BookTrialProgramId", null);
            Session.set("BookTrialTimestamp", null);
        }else{
            FlowRouter.go('/account')
        }
    }

    self.tokenId = Dispatcher.register(function (payload) {
        switch (payload.actionType) {
            case "AUTH_LOGOUT":{
                Meteor.logout(function(err){
                    if(err) {
                        console.error(err) //todo UI side
                        return;
                    }
                    FlowRouter.go('/login')
                })
                break;
            }
            case "AUTH_REGISTER_SUCCESS":{
                FlowRouter.LastRoute
                FlowRouter.LastRoute=[];
                postLoginAction();

                break;
            }
            case "AUTH_RESET_SUCCESS":{
                FlowRouter.LastRoute
                FlowRouter.LastRoute=[];
                FlowRouter.go('/account')
                break;
            }
            case "AUTH_LOGIN_SUCCESS":{
                postLoginAction();
                break;
            }
        }
    })
})