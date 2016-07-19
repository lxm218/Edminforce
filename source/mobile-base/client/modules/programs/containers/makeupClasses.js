// makeup classes
const reactiveFnMakeupClasses = ({context,actions,studentID,classID}, onData) => {
    const errorId = 'ERROR_MAKEUPCLASSES';
    const methodName = 'program.getMakeupClasses';
    const error = context.LocalState.get(errorId);
    let makeupDate = context.LocalState.get('makeupDate');
    if (error) {
        onData(null, {
            classes : [],
            makeupDate,
            error
        })
    }
    else {
        if (!makeupDate) {
            onData(null, {
                classes: []
            });
            return;
        }
        
        // call onData with no data to show loading screen
        onData();
        // call method to get makeup classes in 4 weeks
        Meteor.call('program.getMakeupClasses', studentID, classID, makeupDate, makeupDate,  function(methodError, result) {
            if (!methodError){
                EdminForce.utils.parseLessonDate(result);
            } 
            
            onData(null,{
                classes : result,
                makeupDate,
                error: methodError
            });
        });
    }
    //return actions.clearErrors.bind(null,errorId);
    return () => {
        context.LocalState.set('makeupDate', null);
        actions.clearErrors(errorId);
    }
};
EdminForce.Containers.MakeupClasses = Composer.composeWithTracker(reactiveFnMakeupClasses)(EdminForce.Components.MakeupClasses);

