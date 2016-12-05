// trial classes
const reactiveFnTrialClasses = ({context,actions,programID}, onData) => {
    const errorId = 'ERROR_TRIALCLASSES';
    const methodName = 'program.getTrialClasses';
    const error = context.LocalState.get(errorId);
    let trialDate = context.LocalState.get('trialDate');
    if (error) {
        onData(null, {
            classes : [],
            trialDate,
            error
        })
    }
    else {
        if (!trialDate) {
            onData(null, {
                classes: []
            });
            return;
        }
       
        // call onData with no data to show loading screen
        onData();
        console.log('Meteor.call trialDate====',trialDate)
        // call method to get trial classes in 4 weeks
        Meteor.call('program.getTrialClasses', programID, trialDate, trialDate,  function(methodError, result) {
            console.log('Meteor.call trialDate====result',result)

            if (!methodError){
                EdminForce.utils.parseLessonDate(result);
            }

            onData(null,{
                classes : result || [],
                trialDate,
                error: methodError
            });
        });
    }
    
    //return actions.clearErrors.bind(null,errorId);
    return () => {
        context.LocalState.set('trialDate', null);
        actions.clearErrors(errorId);
    }
    
};

const availableDates = ({context,actions,programID}, onData)=>{
    const errorId = 'ERROR_TRIALCLASSES_AVAIBLE_DATES';
    const methodName = 'program.getTrialClassesSchedule';

    const error = context.LocalState.get(errorId);
    if (error) {
        onData(null, {
            availableDates : [],
            error
        })
    }
    else {

        Meteor.call(methodName, programID, function(methodError, result) {

            //console.log(result)
            onData(null,{
                availableDates : result || [],
                error: methodError
            });
        });

    }

    return () => {
        actions.clearErrors(errorId);
    }
}
EdminForce.Containers.TrialClasses =
  Composer.composeAll(
    Composer.composeWithTracker(reactiveFnTrialClasses),
    Composer.composeWithTracker(availableDates)

  )(EdminForce.Components.TrialClasses)

  //Composer.composeWithTracker(reactiveFnTrialClasses)(EdminForce.Components.TrialClasses);
