// registration classes
const reactiveFnClasses = ({context,actions, registration}, onData) => {
    const errorId = 'ERROR_CLASSES';
    const methodName = 'program.getClasses';
    const error = context.LocalState.get(errorId);

    registration = registration || {}
    const studentID = context.LocalState.get('classes.studentID') || registration.studentID;
    const programID = context.LocalState.get('classes.programID') || registration.programID;
    const sessionID = context.LocalState.get('classes.sessionID') || registration.sessionID;
    
    if (error) {
        let cachedResult = context.MethodCache[methodName] || {classes:[]};
        onData(null, {
            registration : cachedResult,
            error
        })
    }
    else {
        // call onData with no data to show loading screen
        onData();
        Meteor.call(methodName, !studentID, studentID, programID, sessionID, function(methodError, result) {
            !methodError && (context.MethodCache[methodName] = result);
            onData(null,{
                registration : result || {classes:[]},
                error: methodError
            });
        });
    }
    return actions.clearErrors.bind(null, errorId);
};
EdminForce.Containers.Classes = Composer.composeWithTracker(reactiveFnClasses)(EdminForce.Components.Classes);

