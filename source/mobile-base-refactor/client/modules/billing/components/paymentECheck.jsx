EdminForce.Components.PaymentECheck = class extends RC.CSS {
    constructor(p) {
        super(p);
        this.state = {
            valid: false
        }

        this.paymentTotal = Number(this.props.amount) + 0.5;

        this.validateFormData = this.validateFormData.bind(this);
        this.postPayment = this.postPayment.bind(this);
    }

    postPayment(event) {
        event.preventDefault();

        if (!this.state.valid) return;
        let form = this.refs.paymentForm.getFormData()
        let checkPaymentInfo = {
            orderId: this.props.orderId,
            routingNumber: form.routingNumber,
            accountNumber: form.accountNumber,
            nameOnAccount: form.nameOnAccount
        }
        this.props.actions.payECheck(checkPaymentInfo);
    }

    validateFormData(e){
        let form = this.refs.paymentForm.getFormData()
        var routingNumber = form.routingNumber
        var accountNumber = form.accountNumber
        var nameOnAccount = form.nameOnAccount
        let message = [];
        if (routingNumber.length != 9) {
            this.setState({valid:false});
        }
        if (accountNumber.length == 0) {
            this.setState({valid:false});
        }
        if (nameOnAccount.length == 0) {
            this.setState({valid:false});
        }

        this.setState({valid:true});
    }

    render() {
        var inputTheme = "small-label"
        var buttonTheme = "full"
        if (_.contains(["overlay-light", "overlay-dark"], this.props.theme)) {
            inputTheme += "," + this.props.theme
            buttonTheme += "," + this.props.theme
        }
        var payButtonOpts = {};
        if (!this.state.valid) {
            payButtonOpts.disabled = "disabled";
        }

        return (
            <RC.List className="padding">
                {EdminForce.utils.renderError(this.props.error)}
                <span className="totalAmount">Total Amount is : ${this.paymentTotal}</span>
                <br/>
                <br/>
                <RC.Form onSubmit={this.postPayment} ref="paymentForm">
                    <RC.Input name="routingNumber" label="Routing Number" theme={inputTheme} onChange={this.validateFormData} ref="routingNumber"/>
                    <RC.Input name="accountNumber" label="Account Number" theme={inputTheme} onChange={this.validateFormData} ref="accountNumber"/>
                    <RC.Input name="nameOnAccount" label="Check Holder Name" theme={inputTheme} onChange={this.validateFormData} ref="nameOnAccount"/>
                    <RC.Button name="button" theme="full" buttonColor="brand" {...payButtonOpts}>Pay Now</RC.Button>
                </RC.Form>
            </RC.List>
        );
    }
}