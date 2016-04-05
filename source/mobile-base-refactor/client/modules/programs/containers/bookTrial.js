// show students who are eligible for a given trial class
const reactiveFnTrialStudents = ({context,actions,classID}, onData) => {
    const errorId = 'ERROR_PROGRAM_BOOKTRIAL';
    const error = context.LocalState.get(errorId);
    if (error) {
        let cachedResult = context.MethodCache['program.getTrialStudents'] || {classItem:{},students:[]};   
        onData(null, {
            trialStudents: cachedResult,
            error
        })
    }
    else {
        // call onData with no data to show loading screen
        onData();
        // call method to get trial classes in 4 weeks
        Meteor.call('program.getTrialStudents', classID,  function(methodError, result) {
            !methodError && (context.MethodCache['program.getTrialStudents'] = result); 
            onData(null,{
                trialStudents : result,
                error: methodError
            });
        });
    }

    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.BookTrial = Composer.composeWithTracker(reactiveFnTrialStudents)(EdminForce.Components.BookTrial);
