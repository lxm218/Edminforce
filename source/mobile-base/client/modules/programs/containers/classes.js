
function setCollectionLabelAndValue(col) {
    if (!col) return;
    _.forEach(col, (c) => {
        c.value = c._id;
        c.label = c.name;
    })
}

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

        let loadContextData = !context.StateBag.classes.students ||
                !context.StateBag.classes.sessions ||
                !context.StateBag.classes.programs ||
                !studentID || !programID || !sessionID;

        Meteor.call(methodName, loadContextData, studentID, programID, sessionID, function(methodError, result) {
            if (!methodError) {
                context.MethodCache[methodName] = result;
                
                context.StateBag.classes.programID = result.programID;
                context.StateBag.classes.studentID = result.studentID;
                context.StateBag.classes.sessionID = result.sessionID;

                if (result.programs) {
                    context.StateBag.classes.programs = result.programs;
                    setCollectionLabelAndValue(context.StateBag.classes.programs);
                }
                if (result.sessions) {
                    context.StateBag.classes.sessions = result.sessions;
                    setCollectionLabelAndValue(context.StateBag.classes.sessions);
                }
                if (result.students) {
                    context.StateBag.classes.students = result.students;
                    setCollectionLabelAndValue(context.StateBag.classes.students);
                }
            }

            onData(null,{
                registration : result || {classes:[]},
                error: methodError
            });
        });
    }

    // return a cleanup function when the component is un-mounted
    return actions.clearErrors.bind(null,errorId);
    // return () => {
    //     context.StateBag.classes = {};
    //     actions.clearErrors(errorId);
    // }
};
EdminForce.Containers.Classes = Composer.composeWithTracker(reactiveFnClasses)(EdminForce.Components.Classes);

