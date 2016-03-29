
// account page
const reactiveFnAccount = ({context,actions}, onData) => {
    const error = context.LocalState.get('ERROR_ACCOUNT');
    if (Meteor.subscribe('account').ready()) {
        if (!Meteor.userId()) return;

        onData(null, {
            user: Meteor.user(),
            customer: EdminForce.Collections.Customer.findOne({_id:Meteor.userId()}),
            students: EdminForce.Collections.student.find({accountID:Meteor.userId()}).fetch(),
            error
        })
    }

    return actions.clearErrors.bind(null,'ERROR_ACCOUNT');
};
EdminForce.Containers.Account = Composer.composeWithTracker(reactiveFnAccount)(EdminForce.Components.Account);