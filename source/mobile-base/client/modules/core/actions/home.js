

EdminForce.Actions.Home = {
    goToPrograms() {
        FlowRouter.go('/programs');
    },
    
    goToRegistration() {
        FlowRouter.go('/classes');
    },
    
    goToStudents() {
        FlowRouter.go('/students');
    },
    
    goToAccount() {
        EdminForce.utils.authGo('/account');
    }
}

EdminForce.Contexts.Home = {
    LocalState: new ReactiveDict(),
}

ReactDI.injectContext(EdminForce.Contexts.Home, EdminForce.Actions.Home);