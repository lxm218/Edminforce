
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
                <RC.Button onClick={this.payCreditCard}>Credit Card</RC.Button>
                <RC.Button onClick={this.payECheck}>eCheck</RC.Button>
                <RC.VerticalAlign left={true} className="padding"><h6>Note: 3% transaction fee is applied to credit card; 0.75% is applied to eCheck.</h6></RC.VerticalAlign>
            </div>
        )
    }
}
