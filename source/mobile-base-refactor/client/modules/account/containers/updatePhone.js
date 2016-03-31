// account > update phone
const reactiveFnAccountUpdatePhone = ({context,actions}, onData) => {
    const error = context.LocalState.get('ERROR_ACCOUNT_UPDATEPHONE');
    EdminForce.Contexts.Account.SubManager.subscribe('account');
    if (EdminForce.Contexts.Account.SubManager.ready()) {
        if (!Meteor.userId()) return;

        onData(null, {
            customer: Collections.Customer.findOne({_id:Meteor.userId()}),
            error
        })
    }

    return actions.clearErrors.bind(null,'ERROR_ACCOUNT_UPDATEPHONE');
};

EdminForce.Containers.AccountUpdatePhone = Composer.composeWithTracker(reactiveFnAccountUpdatePhone)(EdminForce.Components.AccountUpdatePhone);
