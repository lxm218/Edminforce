// studnets
const reactiveFnStudents = ({context,actions}, onData) => {
	const errorId = 'ERROR_STUDENTS';
	const error = context.LocalState.get(errorId);

	context.SubManager.subscribe('StudentsWithClasses');
	if (context.SubManager.ready()) {
		if (!Meteor.userId()) return;

		onData(null, {
			students: EdminForce.Registration.getStudentstWithClasses(Meteor.userId()),
			error
		})
	}

	return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.MakeupClasses_1= Composer.composeWithTracker(reactiveFnStudents)(EdminForce.Components.MakeupClasses_1);
