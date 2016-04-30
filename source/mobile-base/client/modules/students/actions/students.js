
EdminForce.Actions.Students = {
    
    // save student
    upsertStudent({LocalState}, updatedStudent, redirectUrl) {
        LocalState.set('ERROR_STUDENT', null);
        let student = {... _.omit(updatedStudent, ['gender','birthday'])};
        !student.status && (student.status='Active');
        student.profile = {
            gender: updatedStudent.gender,
            birthday: new Date(updatedStudent.birthday)
        }
        Meteor.call('students.upsertStudent', student, function (err) {
            if (err) {
                LocalState.set('ERROR_STUDENT', err.reason);
            }
            else {
                EdminForce.utils.postActionRedirect(redirectUrl);
            }
        });
    },


    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
    }
};

EdminForce.Contexts.Students = {
    LocalState: new ReactiveDict(),
    SubManager: new SubsManager({
        // maximum number of cached subscriptions
        cacheLimit: 20,
        // expiration time in minutes
        expireIn: 30
    })
}

ReactDI.injectContext(EdminForce.Contexts.Students, EdminForce.Actions.Students);