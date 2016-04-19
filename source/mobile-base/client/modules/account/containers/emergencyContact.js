
// account > alternative contract
const reactiveFnAccountEmergency = ({context,actions}, onData) => {
    const errorId = 'ERROR_ACCOUNT_EMERGENCY';
    const error = context.LocalState.get(errorId);
    context.SubManager.subscribe('account');
    if (context.SubManager.ready()) {
        if (!Meteor.userId()) return;

        let customer = Collections.Customer.findOne({_id:Meteor.userId()});
        let emergencyContact = customer ? customer.emergencyContact: {};
        onData(null, {
            emergencyContact,
            error
        })
    }

    return actions.clearErrors.bind(null,errorId);
};

EdminForce.Containers.AccountEmergency = Composer.composeWithTracker(reactiveFnAccountEmergency)(EdminForce.Components.AccountEmergency);


