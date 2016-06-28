

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
    },

    goToMakeup(){
        EdminForce.utils.authGo('/student/makeup');
    }
}

EdminForce.Contexts.Home = {
    LocalState: new ReactiveDict(),
}

ReactDI.injectContext(EdminForce.Contexts.Home, EdminForce.Actions.Home);