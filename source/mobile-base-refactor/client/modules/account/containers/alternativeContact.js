// account > alternative contract
const reactiveFnAccountAlternative = ({context,actions}, onData) => {
    const error = context.LocalState.get('ERROR_ACCOUNT_ALTERNATIVE');
    context.SubManager.subscribe('account');
    if (context.SubManager.ready()) {
        if (!Meteor.userId()) return;

        let customer = Collections.Customer.findOne({_id:Meteor.userId()});
        let alternativeContact = customer ? customer.alternativeContact : {};
        onData(null, {
            alternativeContact,
            error
        })
    }

    return actions.clearErrors.bind(null,'ERROR_ACCOUNT_ALTERNATIVE');
};

EdminForce.Containers.AccountAlternative = Composer.composeWithTracker(reactiveFnAccountAlternative)(EdminForce.Components.AccountAlternative);

