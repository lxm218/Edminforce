
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



if (Meteor.isClient) {
    let {
        AppMain
        } = EdminForce.Components;

    Meteor.startup(() => {

        // Back Handler
        document.addEventListener("backbutton", function(e){
            e.preventDefault()
            if (FlowRouter.current().path=="/") {
                navigator.app.exitApp()
            } else {
                FlowRouter.BackButton = true
                navigator.app.backHistory()
            }
        }, false)

        // Important : Meta
        var metaTag=document.createElement('meta');
        metaTag.name = "viewport"
        metaTag.content = "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
        document.getElementsByTagName('head')[0].appendChild(metaTag)

        var titleTag = document.createElement("title");
        titleTag.content="Edmin Force";
        document.getElementsByTagName('head')[0].appendChild(titleTag);

        // Add App Container
        let appContainer = document.createElement('div');
        appContainer.id = "appContainer";
        document.body.appendChild(appContainer);

        ReactDOM.render(<AppMain></AppMain>, document.getElementById("appContainer"));
    });
}