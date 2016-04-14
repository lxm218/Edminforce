// pay with credit card
const reactiveFnPaymentCreditCard = ({context,actions}, onData) => {
    const error = context.LocalState.get('ERROR_PAY_CREDITCARD');
    onData(null, {error});

    return actions.clearErrors.bind(null,'ERROR_PAY_CREDITCARD');
};

EdminForce.Containers.PaymentCreditCard = Composer.composeWithTracker(reactiveFnPaymentCreditCard)(EdminForce.Components.PaymentCreditCard);
