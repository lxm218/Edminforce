// pay with echeck
const reactiveFnPaymentECheck = ({context,actions}, onData) => {
    const error = context.LocalState.get('ERROR_PAYMENT');
    onData(null, {error});
   
    return actions.clearErrors.bind(null,'ERROR_PAYMENT');
};

EdminForce.Containers.PaymentECheck = Composer.composeWithTracker(reactiveFnPaymentECheck)(EdminForce.Components.PaymentECheck);