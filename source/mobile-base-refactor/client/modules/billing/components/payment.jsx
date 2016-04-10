
EdminForce.Components.Payment = () => (
    <div>
        <RC.Button onClick={
                FlowRouter.go(FlowRouter.path("/paymentCredit", null, {
                    orderId: FlowRouter.getQueryParam('orderId'),
                    makeupOnly: FlowRouter.getQueryParam('makeupOnly')
                }))
            }>Use Credit Card, 3% Process Fee</RC.Button>
        
        <RC.Button onClick={
                FlowRouter.go(FlowRouter.path("/paymentECheck", null, {
                    orderId: FlowRouter.getQueryParam('orderId'),
                    makeupOnly: FlowRouter.getQueryParam('makeupOnly')
                }))
            }>Use ECheck, $0.5 Process Fee</RC.Button>
    </div>
) 