
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
    
    bookTrial({LocalState}, studentID, classID, className, lessonDate) {
        LocalState.set('ERROR_PROGRAM_BOOKTRIAL', null);
        Meteor.call('program.bookTrial', studentID, classID, className, lessonDate, function (err) {
            err ? LocalState.set('ERROR_PROGRAM_BOOKTRIAL', err.reason) : FlowRouter.go('/account');
        });
    },
    
    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
    }
};

EdminForce.Contexts.Programs = {
    LocalState: new ReactiveDict()
}

ReactDI.injectContext(EdminForce.Contexts.Programs, EdminForce.Actions.Programs);