
// account page
const reactiveFnAccount = ({context,actions}, onData) => {
    const errorId = 'ERROR_ACCOUNT';
    const error = context.LocalState.get(errorId);
    context.SubManager.subscribe('account');
    if (context.SubManager.ready()) {
        if (!Meteor.userId()) return;

        onData(null, {
            user: Meteor.user(),
            customer: Collections.Customer.findOne({_id:Meteor.userId()}),
            students: Collections.student.find({accountID:Meteor.userId()}).fetch(),
            error
        })
    }

    return actions.clearErrors.bind(null,errorId);
};
EdminForce.Containers.Account = Composer.composeWithTracker(reactiveFnAccount)(EdminForce.Components.Account);