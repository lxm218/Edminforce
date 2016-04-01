// trial classes
const reactiveFnTrialClasses = ({context,actions,programID}, onData) => {
    const error = context.LocalState.get('ERROR_TRIALCLASSES');
    if (error) {
        onData(null, {error})
    }
    else {
        // call onData with no data to show loading screen
        onData();
        // call method to get trial classes in 4 weeks
        Meteor.call('program.getTrialClasses', programID, new Date(), moment().add(4,'w').toDate(),  function(methodError, result) {
            onData(null,{
                classes : result || [],
                error: methodError
            });
        });
    }

    return actions.clearErrors.bind(null,'ERROR_TRIALCLASSES');
};
EdminForce.Containers.TrialClasses = Composer.composeWithTracker(reactiveFnTrialClasses)(EdminForce.Components.TrialClasses);
