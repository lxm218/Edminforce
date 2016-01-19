{
    let {
        App
        } = EdminForce.Components;
    if (Meteor.isClient) {

        // Important : Meta
        var metaTag=document.createElement('meta');
        metaTag.name = "viewport"
        metaTag.content = "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
        document.getElementsByTagName('head')[0].appendChild(metaTag)

        Meteor.startup(() => {
            //React.render(<EdminForce.Components.App />, document.getElementById("appContainer"));

            // Add App Container
            let appContainer = document.createElement('div');
            appContainer.id = "appContainer";
            document.body.appendChild(appContainer);

            ReactDOM.render(<App></App>, document.getElementById("appContainer"));
        });

    }
}