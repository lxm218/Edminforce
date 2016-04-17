// pay with echeck
const reactiveFnPaymentECheck = ({context,actions}, onData) => {
    const errorId = 'ERROR_PAY_ECHECK'
    const error = context.LocalState.get(errorId);
    onData(null, {error});
   
    return actions.clearErrors.bind(null,errorId);
};

EdminForce.Containers.PaymentECheck = Composer.composeWithTracker(reactiveFnPaymentECheck)(EdminForce.Components.PaymentECheck);