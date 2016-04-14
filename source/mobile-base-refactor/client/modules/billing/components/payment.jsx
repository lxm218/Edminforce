
EdminForce.Components.Payment = class extends RC.CSS {
    constructor(p) {
        super(p);
    }

    payECheck() {

        FlowRouter.go(FlowRouter.path("/paymentCreditCard", null, {
            orderId: FlowRouter.getQueryParam('orderId'),
            amount: FlowRouter.getQueryParam('amount'),
            makeupOnly: FlowRouter.getQueryParam('makeupOnly')
        }));
    }

    payCreditCard() {
        FlowRouter.go(FlowRouter.path("/paymentECheck", null, {
            orderId: FlowRouter.getQueryParam('orderId'),
            amount: FlowRouter.getQueryParam('amount'),
            makeupOnly: FlowRouter.getQueryParam('makeupOnly')
        }))
    }

    render() {
        return (
            <div>
                <RC.Button onClick={this.payECheck}>Use Credit Card, 3% Process Fee</RC.Button>
                <RC.Button onClick={this.payCreditCard}>Use ECheck, $0.5 Process Fee</RC.Button>
            </div>
        )
    }
}