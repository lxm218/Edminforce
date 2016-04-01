
EdminForce.Actions.Programs = {
    
    showTrialClasses({LocalState}, programID) {
        let path = FlowRouter.path("/trialClasses/:programID", {programID});
        FlowRouter.go(path);
    },
    
    bookTrial({LocalState}, programId) {
        // let programID = FlowRouter.getParam("programID");
        // // user login
        // if (Meteor.user()) {
        //     //TODO if currently user not student, jump to add student page, after add successful then jump to confirm page
        //     console.log("User logged");
        //     let params = {
        //         programID: programID,
        //         classID: item._id,
        //         timestamp: item.lessonDate.getTime()
        //     }
        //     let path = FlowRouter.path("/programs/:programID/:classID/:timestamp", params);
        //     FlowRouter.go(path);
        //
        // } else {  // user not login
        //     console.log("User not logged");
        //     FlowRouter.go('/login');
        //     Session.set("BookTrialClassId", item._id);
        //     Session.set("BookTrialProgramId", programID);
        //     Session.set("BookTrialTimestamp", item.lessonDate.getTime());
        // }
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