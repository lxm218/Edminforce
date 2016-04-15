
EdminForce.Components.Payment = class extends RC.CSS {
    constructor(p) {
        super(p);

        this.payCreditCard = this.payCreditCard.bind(this);
        this.payECheck = this.payECheck.bind(this);
    }

    payCreditCard() {

        FlowRouter.go(FlowRouter.path("/paymentCreditCard", null, {
            orderId: FlowRouter.getQueryParam('orderId'),
            amount: FlowRouter.getQueryParam('amount'),
            makeupOnly: FlowRouter.getQueryParam('makeupOnly')
        }));
    }

    payECheck() {
        FlowRouter.go(FlowRouter.path("/paymentECheck", null, {
            orderId: FlowRouter.getQueryParam('orderId'),
            amount: FlowRouter.getQueryParam('amount'),
            makeupOnly: FlowRouter.getQueryParam('makeupOnly')
        }))
    }

    render() {
        return (
            <div>
                <RC.Button onClick={this.payCreditCard}>Use Credit Card, 3% Process Fee</RC.Button>
                <RC.Button onClick={this.payECheck}>Use ECheck, $0.5 Process Fee</RC.Button>
            </div>
        )
    }
}