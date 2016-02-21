let themes = ["overlay-light","overlay-dark"]
KUI.Payment_ECheckPay = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },


    getInitialState() {
        return {
            buttonActive: false,
            waiting: false,
            msg: null,
            notification: null
        }
    },

    postPayment(e){

        // To do: get the charging amount from database
        // To do: change the referece id

        e.preventDefault()
        let self = this
        var paymentInfo = {
            "createTransactionRequest": {
                "merchantAuthentication": {
                    "name": "42ZZf53Hst",
                    "transactionKey": "3TH6yb6KN43vf76j"
                },
                "refId": "123461",
                "transactionRequest": {
                    "transactionType": "authCaptureTransaction",
                    "amount": "5",
                    "payment": {
                        "bankAccount": {
                            "accountType": "checking",
                            "routingNumber": "125000024",
                            "accountNumber": "12345678",
                            "nameOnAccount": "John Doe"
                        }
                    },

                    "lineItems": {
                        "lineItem": {
                            "itemId": "1",
                            "name": "vase",
                            "description": "Cannes logo",
                            "quantity": "1",
                            "unitPrice": "0.02"
                        }
                    },
                    // "tax": {
                    //     "amount": "4.26",
                    //     "name": "level2 tax name",
                    //     "description": "level2 tax"
                    // },
                    // "duty": {
                    //     "amount": "8.55",
                    //     "name": "duty name",
                    //     "description": "duty description"
                    // },
                    // "shipping": {
                    //     "amount": "4.26",
                    //     "name": "level2 tax name",
                    //     "description": "level2 tax"
                    // },
                    "poNumber": "456654",
                    "customer": {
                        "id": "99999456656"
                    },
                    "billTo": {
                        "firstName": "Ellen",
                        "lastName": "Johnson",
                        "company": "Souveniropolis",
                        "address": "14 Main Street",
                        "city": "Pecan Springs",
                        "state": "TX",
                        "zip": "44628",
                        "country": "USA"
                    },
                    // "shipTo": {
                    //     "firstName": "China",
                    //     "lastName": "Bayles",
                    //     "company": "Thyme for Tea",
                    //     "address": "12 Main Street",
                    //     "city": "Pecan Springs",
                    //     "state": "TX",
                    //     "zip": "44628",
                    //     "country": "USA"
                    // },
                    "customerIP": "192.168.1.1",
                    "transactionSettings": {
                        "setting": {
                            "settingName": "testRequest",
                            "settingValue": "false"
                        }
                    },
                    // "userFields": {
                    //     "userField": [
                    //         {
                    //             "name": "MerchantDefinedFieldName1",
                    //             "value": "MerchantDefinedFieldValue1"
                    //         },
                    //         {
                    //             "name": "favorite_color",
                    //             "value": "blue"
                    //         }
                    //     ]
                    // }
                }
            }
        }

        // if (this.state.msg) return null

        let form = this.refs.paymentForm.getFormData()

        // console.log(form.creditCardNumber)
        // console.log(form.expirationDate)
        // console.log(form.ccv)

        // var cardNumber = this.refs.paymentForm.getFormData().creditCardNumber
        // 		var ccv = this.refs.paymentForm.getFormData().ccv
        // 		var expirationDate = this.refs.paymentForm.getFormData().expirationDate
        // 		var message = []
        // if(cardNumber.length != 16){
        // 	message.push("Credit Card Length Error; ")
        // }

        // var patt = /[0-9]{2}\/[0-9]{2}/


        // if (!patt.test(expirationDate)){
        // 	message.push("Expiration Date Format Format Error; ")
        // }
        // if (ccv.length > 4){
        // 	message.push("CCV Format Error;")
        // }
        // if (message.length != 0) {
        // 	this.setState({
        //         msg: message
        //       })
        // 	return
        // }
        // expirationDate = expirationDate.slice(0,2)+expirationDate.slice(3,5)

        paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.routingNumber = form.routingNumber
        paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.accountNumber = form.accountNumber
        paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.nameOnAccount = form.nameOnAccount
        paymentInfo.createTransactionRequest.refId = Math.floor((Math.random() * 100000) + 1).toString()
        paymentInfo.createTransactionRequest.transactionRequest.amount = "0.1"

        var URL = 'https://apitest.authorize.net/xml/v1/request.api'
        HTTP.call('POST',URL, {data: paymentInfo}, function(error, response){
            if(!!error){
                console.log(error)
            }
            if(!!response){
                console.log(response)
            }

            if (response.data.messages.message[0].code == "I00001") {
                // debugger
                console.log("Success");
                alert('pay success');

            } else{
                self.setState({
                    msg: "The transaction was unsuccessful."
                })
            }

        })

    },

    printMsg(){
        console.log("printMsg is called", this.state.msg)

        let currentMessages = this.state.msg ? [this.state.msg] : []
        return <div>
            {
                currentMessages.map(function(m,n){
                    return <div className="center" key={n}>
                        <div className="bigger inline-block invis-70 red">
                            {_.isString(m) ? <p>{m}</p> : m}
                        </div>
                    </div>
                })
            }
        </div>

    },

    checkCardNumber(e){
        // var ccv = this.refs.paymentForm.getFormData().ccv
        // var cardNumber = this.refs.paymentForm.getFormData().creditCardNumber
        // var expirationDate = this.refs.paymentForm.getFormData().expirationDate
        // if (cardNumber.length > 16){
        // 	this.setState({
        //         msg: "Credit Card Length Error"
        //       })
        // }
    },

    checkExpirationDate(e){
        // var cardNumber = this.refs.paymentForm.getFormData().creditCardNumber
        // var ccv = this.refs.paymentForm.getFormData().ccv
        // var expirationDate = this.refs.paymentForm.getFormData().expirationDate
        // var message = []
        // if(cardNumber.length != 16){
        // 	message.push("Credit Card Length Error; ")
        // }

        // if (expirationDate.length > 5){
        // 	message.push("Expiration Date Format Format Error; ")
        // }
        // if (message.length != 0) {
        // 	this.setState({
        //         msg: message
        //       })
        // }
    },

    checkName(e){
        // var cardNumber = this.refs.paymentForm.getFormData().creditCardNumber
        // var ccv = this.refs.paymentForm.getFormData().ccv
        // var expirationDate = this.refs.paymentForm.getFormData().expirationDate
        // var message = []
        // if(cardNumber.length != 16){
        // 	message.push("Credit Card Length Error; ")
        // }

        // var patt = /[0-9]{2}\/[0-9]{2}/


        // if (!patt.test(expirationDate)){
        // 	message.push("Expiration Date Format Format Error; ")
        // }
        // if (ccv.length > 4){
        // 	message.push("CCV Format Error;")
        // }
        // if (message.length != 0) {
        // 	this.setState({
        //         msg: message
        //       })
        // }

    },


    render() {
        var inputTheme = "small-label"
        var buttonTheme = "full"
        if (_.contains(["overlay-light","overlay-dark"], this.props.theme)) {
            inputTheme += ","+this.props.theme
            buttonTheme += ","+this.props.theme
        }

        let total = Session.get('_register_class_money_total_');
        return (

            <RC.List className="padding">
                <RC.Div>Total Money : ${total}</RC.Div>
                <RC.Form onSubmit={this.postPayment}   ref="paymentForm">
                    {this.printMsg()}
                    <RC.Input name="routingNumber" onKeyUp={this.checkRoutingNumber} label="Routing Number" theme={inputTheme} ref="routingNumber" />
                    <RC.Input name="accountNumber" onKeyUp={this.checkAccountNumber} label="Account Number"  theme={inputTheme} ref="accountNumber" />
                    <RC.Input name="name" onKeyUp={this.checkName} label="Name" theme={inputTheme} ref="name"/>
                    <RC.Button name="button" theme="full" buttonColor="brand">
                        Pay Now
                    </RC.Button>
                </RC.Form>



            </RC.List>
        );
    }
})