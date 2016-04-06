// registration classes
const reactiveFnClasses = ({context,actions}, onData) => {
    const errorId = 'ERROR_CLASSES';
    const methodName = 'program.getClasses';
    const error = context.LocalState.get(errorId);

    // we need to access this to be reactive
    const stateVersion = context.LocalState.get('state.classes');
    stateVersion;

    let {
        studentID,
        programID,
        sessionID
    } = context.StateBag.classes;

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
            if (!methodError) {
                context.MethodCache[methodName] = result;
                context.StateBag.classes.programID = result.programID;
                context.StateBag.classes.studentID = result.studentID;
                context.StateBag.classes.sessionID = result.sessionID;
            }

            onData(null,{
                registration : result || {classes:[]},
                error: methodError
            });
        });
    }

    return () => {
        context.StateBag.classes = {};
        actions.clearErrors(errorId);
    }
    //return actions.clearErrors.bind(null, errorId);
};
EdminForce.Containers.Classes = Composer.composeWithTracker(reactiveFnClasses)(EdminForce.Components.Classes);

