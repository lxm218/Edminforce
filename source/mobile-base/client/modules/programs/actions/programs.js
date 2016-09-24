
EdminForce.Actions.Programs = {
    
    showTrialClasses({LocalState}, programID) {
        let path = FlowRouter.path(`/${EdminForce.sid}/trialClasses/:programID`, {programID});
        FlowRouter.go(path);
    },
    
    showTrialEligibleStudents({LocalState}, classItem) {
        let queryParams = {
            classID: classItem._id,
            timestamp: classItem.lessonDate.getTime(),
        };
        
        let path;
        if (Meteor.user()) {
            path = FlowRouter.path(`/${EdminForce.sid}/bookTrial`, null,queryParams);
        }
        else {
            queryParams.r = `/${EdminForce.sid}/bookTrial`;
            path = FlowRouter.path("/login", null,queryParams);
        }

        FlowRouter.go(path);
    },
    
    bookTrial({LocalState}, studentID, classID, className, lessonDate) {
        LocalState.set('ERROR_PROGRAM_BOOKTRIAL', null);
        Meteor.call('program.bookTrial', studentID, classID, className, lessonDate, function (err) {
            err ? LocalState.set('ERROR_PROGRAM_BOOKTRIAL', err.reason) : FlowRouter.go(`/${EdminForce.sid}/bookTrialSummary`);
        });
    },
    
    bookClass({LocalState}, studentID, classIDs) {
        LocalState.set('ERROR_CLASSES', null);
        Meteor.call('program.bookClasses', studentID, classIDs, function(err,result){
            err ? LocalState.set('ERROR_CLASSES', err.reason) : 
                FlowRouter.go(FlowRouter.path(`/${EdminForce.sid}/registrationSummary`, null, {registrationIDs:result.join()}));
        });
    },
    
    bookMakeup({LocalState}, studentID, classID, lessonDate) {
        LocalState.set('ERROR_MAKEUPCLASSES', null);
        // add a pending registration for makeup
        // studentID, classID, lessonDate
        Meteor.call('program.bookMakeup', studentID, classID, lessonDate, function(err,result){
            err ? LocalState.set('ERROR_MAKEUPCLASSES', err.reason) :
                FlowRouter.go(`/${EdminForce.sid}/checkout`);
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
    },
    
    init() {
        EdminForce.Contexts.Programs.MethodCache = {};
        EdminForce.Contexts.Programs.StateBag = {
            classes: {}
        }
    }
}

ReactDI.injectContext(EdminForce.Contexts.Programs, EdminForce.Actions.Programs);