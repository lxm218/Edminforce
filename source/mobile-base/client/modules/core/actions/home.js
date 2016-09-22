

EdminForce.Actions.Home = {
    goToPrograms({sid}) {
        FlowRouter.go(`/${sid}/programs`);
    },
    
    goToRegistration({sid}) {
        FlowRouter.go(`/${sid}/classes`);
    },
    
    goToStudents({sid}) {
        FlowRouter.go(`/${sid}/students`);
    },
    
    goToAccount({sid}) {
        EdminForce.utils.authGo(`/${sid}/account`);
    },

    goToMakeup({sid}){
        EdminForce.utils.authGo(`/${sid}/student/makeup`);
    }
}

EdminForce.Contexts.Home = {
    LocalState: new ReactiveDict(),
}

ReactDI.injectContext(EdminForce.Contexts.Home, EdminForce.Actions.Home);