{
    let {
        AppMain
        } = EdminForce.Components;
    if (Meteor.isClient) {

        Meteor.startup(() => {

            console.log("startup");

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

            // Add App Container
            let appContainer = document.createElement('div');
            appContainer.id = "appContainer";
            document.body.appendChild(appContainer);

            ReactDOM.render(<AppMain></AppMain>, document.getElementById("appContainer"));
        });

    }
}