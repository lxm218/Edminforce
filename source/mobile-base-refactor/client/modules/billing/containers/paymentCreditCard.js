// pay with credit card
const reactiveFnPaymentCreditCard = ({context,actions}, onData) => {
    const errorId = 'ERROR_PAY_CREDITCARD';
    const error = context.LocalState.get(errorId);
    onData(null, {error});

    return actions.clearErrors.bind(null,errorId);
};

EdminForce.Containers.PaymentCreditCard = Composer.composeWithTracker(reactiveFnPaymentCreditCard)(EdminForce.Components.PaymentCreditCard);
