
EdminForce.Actions.Programs = {
    
    showTrialClasses({LocalState}, programID) {
        let path = FlowRouter.path("/trialClasses/:programID", {programID});
        FlowRouter.go(path);
    },
    
    showTrialEligibleStudents({LocalState}, classItem) {
        let queryParams = {
            classID: classItem._id,
            timestamp: classItem.lessonDate.getTime(),
        };
        
        let path;
        if (Meteor.user()) {
            path = FlowRouter.path("/bookTrial", null,queryParams);
        }
        else {
            queryParams.r = "/bookTrial";
            path = FlowRouter.path("/login", null,queryParams);
        }

        FlowRouter.go(path);
    },
    
    bookTrial({LocalState}, studentID, classID, className, lessonDate) {
        LocalState.set('ERROR_PROGRAM_BOOKTRIAL', null);
        Meteor.call('program.bookTrial', studentID, classID, className, lessonDate, function (err) {
            err ? LocalState.set('ERROR_PROGRAM_BOOKTRIAL', err.reason) : FlowRouter.go('/bookTrialSummary');
        });
    },
    
    bookClass({LocalState}, studentID, classIDs) {
        LocalState.set('ERROR_CLASSES', null);
        Meteor.call('program.bookClasses', studentID, classIDs, function(err,result){
            err ? LocalState.set('ERROR_CLASSES', err.reason) : 
                FlowRouter.go(FlowRouter.path("/registrationSummary", null, {registrationIDs:result.join()}));
        });
    },
    
    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
    }
};

EdminForce.Contexts.Programs = {
    LocalState: new ReactiveDict(),
    // this is to cache meteor method call result
    // when handle errors raised by actions, we can use cached result in rendering, 
    // instead of calling the method
    MethodCache: {},
    
    // persisted state bag used for the communications between
    // UI component and its container
    StateBag: {
        classes: {}
    }
}

ReactDI.injectContext(EdminForce.Contexts.Programs, EdminForce.Actions.Programs);