// add/update student
const reactiveFnStudent = ({context,actions,studentID}, onData) => {
    const errorId = 'ERROR_STUDENT';
    const error = context.LocalState.get(errorId);
    if (studentID) {
        context.SubManager.subscribe('student');
        if (context.SubManager.ready()) {
            if (!Meteor.userId()) return;
            let student = Collections.student.findOne({_id:studentID});
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

    return actions.clearErrors.bind(null,errorId);
};

EdminForce.Containers.Student = Composer.composeWithTracker(reactiveFnStudent)(EdminForce.Components.Student);
