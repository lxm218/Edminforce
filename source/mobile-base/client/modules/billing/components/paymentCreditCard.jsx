
EdminForce.Components.PaymentCreditCard = class extends RC.CSS {
    constructor(p) {
        super(p);
        this.state = {
            valid: false
        }

        this.paymentTotal = Number(this.props.amount) * 1.03;        

        this.validateFormData = this.validateFormData.bind(this);
        this.postPayment = this.postPayment.bind(this);
        this.actionDone = this.actionDone.bind(this);
    }

    actionDone() {
        this.setState({
            processing: false
        })
    }
    
    postPayment(event) {
        event.preventDefault();
        if (!this.state.valid) return;
        if (!this.validateCreditCardInfo()) return;

        let formData = this.refs.paymentForm.getFormData();

        let creditCardPaymentInfo = {
            creditCardNumber: formData.creditCardNumber,
            expirationDate: formData.expirationDate,
            ccv: formData.ccv,
            firstName: formData.cardHolderFirstName,
            lastName: formData.cardHolderLastName,
            address: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            orderId: this.props.orderId
        }
        
        this.setState({
            processing: true
        });

        this.props.actions.payCreditCard(creditCardPaymentInfo, this.props.makeupOnly, this.actionDone);
    }

    validateFormData() {
        let formData = this.refs.paymentForm.getFormData();
        
        let cardNumber = formData.creditCardNumber;
        let expirationDate = formData.expirationDate;
        let ccv = formData.ccv;
        let expirationDateReg = /[0-9]{2}\/[0-9]{2}/;
        
        let invalid =  !cardNumber || cardNumber.length != 16 ||
            !expirationDate || !expirationDateReg.test(expirationDate) ||
            !ccv || ccv.length > 4 ;
        
        this.setState({
            valid: !invalid
        });
    }
    
    validateCreditCardInfo() {
        let formData = this.refs.paymentForm.getFormData();
        let cardNumber = formData.creditCardNumber;

        let valid = true;
        if (cardNumber.length != 16) {
            this.props.context.LocalState.set('ERROR_PAY_CREDITCARD', 'Credit card number has to be 16 digits');
            valid = false;
        }
        else {
            if (cardNumber[0] == '3' && (cardNumber[1] == '4' || cardNumber[1] == '7')) {
                this.props.context.LocalState.set('ERROR_PAY_CREDITCARD', 'American Express Is Not Supported');
                valid = false;
            }
        }

        return valid;
    }

    render() {
        if (this.state.processing)
            return (
                <RC.Loading isReady={this.state.processing}></RC.Loading>
            )
        
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
                <div className="payment-container">                
                    <span>Total Amount is: ${this.paymentTotal.toFixed(2)}</span>
                    <br/>
                    <br/>

                    <div>
                        <span className="card visa"></span>
                        <span className="card mastercard"></span>
                        <span className="card discover"></span>
                    </div>

                    <RC.Form onSubmit={this.postPayment} ref="paymentForm">
                        <RC.Input name="creditCardNumber" onChange={this.validateFormData} label="Credit Card Number"
                                  theme={inputTheme} ref="cardNumber"/>
                        <RC.Input name="expirationDate" onChange={this.validateFormData}
                                  label="Expiration Date (MM/YY)" theme={inputTheme} ref="expirationDate"/>
                        <RC.Input name="ccv" onChange={this.validateFormData} label="CCV" theme={inputTheme} ref="ccv"/>
                        <RC.Input name="cardHolderFirstName" label="Card Holder First Name" theme={inputTheme}
                                  ref="cardHolderFirstName"/>
                        <RC.Input name="cardHolderLastName" label="Card Holder Last Name" theme={inputTheme}
                                  ref="cardHolderLastName"/>
                        <RC.Input name="street" label="Street Address" theme={inputTheme} ref="street"/>
                        <RC.Input name="city" label="City" theme={inputTheme} ref="city"/>
                        <RC.Input name="state" label="State" theme={inputTheme} ref="state"/>
                        <RC.Input name="zip" label="Zip" theme={inputTheme} ref="zip"/>
                        <RC.Button name="button" theme="full" buttonColor="brand" {...payButtonOpts}>Pay Now</RC.Button>
                    </RC.Form>
                    <div style={{textAlign:'center'}}>
                        <a href="http://www.authorize.net/"><span className="badge authorize"></span></a>
                        <span className="badge positive"></span>
                        <span className="badge comodo"></span>
                    </div>      
                </div>
            </RC.List>
        );
    }
}