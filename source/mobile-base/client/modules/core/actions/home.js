

EdminForce.Actions.Home = {
    goToPrograms() {
        FlowRouter.go('/programs');
    },

    goToAccount() {
        EdminForce.utils.authGo('/account');
    },

    goToContact() {
        FlowRouter.go('/contact');
    }
}

EdminForce.Contexts.Home = {
    LocalState: new ReactiveDict(),
}

ReactDI.injectContext(EdminForce.Contexts.Home, EdminForce.Actions.Home);