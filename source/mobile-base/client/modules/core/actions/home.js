

EdminForce.Actions.Home = {
    goToPrograms() {
        FlowRouter.go(`/${EdminForce.sid}/programs`);
    },
    
    goToRegistration() {
        FlowRouter.go(`/${EdminForce.sid}/classes`);
    },
    
    goToStudents() {
        FlowRouter.go(`/${EdminForce.sid}/students`);
    },
    
    goToAccount() {
        EdminForce.utils.authGo(`/${EdminForce.sid}/account`);
    },

    goToMakeup(){
        EdminForce.utils.authGo(`/${EdminForce.sid}/student/makeup`);
    }
}

EdminForce.Contexts.Home = {
    LocalState: new ReactiveDict(),
}

ReactDI.injectContext(EdminForce.Contexts.Home, EdminForce.Actions.Home);