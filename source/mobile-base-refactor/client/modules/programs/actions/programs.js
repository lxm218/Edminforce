
EdminForce.Actions.Programs = {
    
    showTrialClasses({LocalState}, programID) {
        let path = FlowRouter.path("/trialClasses/:programID", {programID});
        FlowRouter.go(path);
    },
    
    showTrialEligibleStudents({LocalState}, classItem) {
        let path = FlowRouter.path("/bookTrial", null,{
            classID: classItem._id,
            timestamp: classItem.lessonDate.getTime(),
        });

        if (Meteor.user()) {
            FlowRouter.go(path);
        }
        else {
            let loginRedirect = FlowRouter.path('/login',null,{r:path});
            FlowRouter.go(loginRedirect);
        }
    },
    
    bookTrial({LocalState}, studentID, trialClass, trialDate) {
        
    },
    
    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
        LocalState.set('WAIT_ACCOUNT', false);
    }
};

EdminForce.Contexts.Programs = {
    LocalState: new ReactiveDict()
}

ReactDI.injectContext(EdminForce.Contexts.Programs, EdminForce.Actions.Programs);