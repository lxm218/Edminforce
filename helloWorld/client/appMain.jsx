App.Main = React.createClass({
    clickHero() {
        FlowRouter.go("tabs");
    },

    render() {
        let hero = {
            theme: "bottom-left",
            backgroundImage: "/assets/images/background.jpg",
            avatar: "/assets/images/avatar.jpg",
            title: "Hello World",
            subtitle: "Test out Meteor + React, click to continue",

        }

        return ( <RC.WebBody>
            <RC.Hero {... hero} onClick={this.clickHero}/>
        </RC.WebBody>)
    }
})


App.NotImplemented = React.createClass({
    render() {
        return (
            <RC.Div style={{textAlign:"center"}}>
                <span className="h2">Coming soon...</span>
            </RC.Div>
        )
    }
})