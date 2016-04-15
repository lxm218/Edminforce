// account > update phone
const reactiveFnAccountUpdatePhone = ({context,actions}, onData) => {
    const errorId = 'ERROR_ACCOUNT_UPDATEPHONE';
    const error = context.LocalState.get(errorId);
    context.SubManager.subscribe('account');
    if (context.SubManager.ready()) {
        if (!Meteor.userId()) return;

        onData(null, {
            customer: Collections.Customer.findOne({_id:Meteor.userId()}),
            error
        })
    }

    return actions.clearErrors.bind(null,errorId);
};

EdminForce.Containers.AccountUpdatePhone = Composer.composeWithTracker(reactiveFnAccountUpdatePhone)(EdminForce.Components.AccountUpdatePhone);
