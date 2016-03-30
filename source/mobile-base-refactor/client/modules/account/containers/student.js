// account > add/update student
const reactiveFnAccountStudent = ({context,actions,studentID}, onData) => {
    const error = context.LocalState.get('ERROR_ACCOUNT_STUDENT');
    if (studentID) {
        EdminForce.Contexts.Account.SubManager.subscribe('student');
        if (EdminForce.Contexts.Account.SubManager.ready()) {
            if (!Meteor.userId()) return;
            let student = EdminForce.Collections.student.findOne({_id:studentID});
            if (student.profile) {
                student.gender = student.profile.gender;
                student.birthday = moment(student.profile.birthday).format("MM/DD/YYYY");
            }
            onData(null, { student,error });
        }
    }
    else {
        onData(null, {
            student: {},
            error
        })
    }

    return actions.clearErrors.bind(null,'ERROR_ACCOUNT_STUDENT');
};

EdminForce.Containers.AccountStudent = Composer.composeWithTracker(reactiveFnAccountStudent)(EdminForce.Components.AccountStudent);
