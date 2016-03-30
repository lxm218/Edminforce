
// account > alternative contract
const reactiveFnAccountEmergency = ({context,actions}, onData) => {
    const error = context.LocalState.get('ERROR_ACCOUNT_EMERGENCY');
    EdminForce.Contexts.Account.SubManager.subscribe('account');
    if (EdminForce.Contexts.Account.SubManager.ready()) {
        if (!Meteor.userId()) return;

        let customer = EdminForce.Collections.Customer.findOne({_id:Meteor.userId()});
        let emergencyContact = customer ? customer.emergencyContact: {};
        onData(null, {
            emergencyContact,
            error
        })
    }

    return actions.clearErrors.bind(null,'ERROR_ACCOUNT_EMERGENCY');
};

EdminForce.Containers.AccountEmergency = Composer.composeWithTracker(reactiveFnAccountEmergency)(EdminForce.Components.AccountEmergency);


