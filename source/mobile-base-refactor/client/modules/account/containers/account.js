
// account page
const reactiveFnAccount = ({context,actions}, onData) => {
    const error = context.LocalState.get('ERROR_ACCOUNT');
    EdminForce.Contexts.Account.SubManager.subscribe('account');
    //if (Meteor.subscribe('account').ready()) {
    if (EdminForce.Contexts.Account.SubManager.ready()) {
        if (!Meteor.userId()) return;

        onData(null, {
            user: Meteor.user(),
            customer: Collections.Customer.findOne({_id:Meteor.userId()}),
            students: Collections.student.find({accountID:Meteor.userId()}).fetch(),
            error
        })
    }

    return actions.clearErrors.bind(null,'ERROR_ACCOUNT');
};
EdminForce.Containers.Account = Composer.composeWithTracker(reactiveFnAccount)(EdminForce.Components.Account);