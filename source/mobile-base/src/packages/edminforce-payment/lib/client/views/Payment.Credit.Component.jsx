{
  EdminForce.Components.CreditCard = React.createClass ({

    mixins: [RC.Mixins.Theme],
    mixins: [ReactMeteorData],
        
    getMeteorData() {
            let orderID = FlowRouter.getQueryParam("order");
            let handler = Meteor.subscribe("EF-ShoppingCarts-Checkout");
            let o = EdminForce.Collections.orders.find({"_id":orderID}).fetch()
            let ready = handler.ready()
            return {
                isReady:ready,
                order: o
            }
    },

    getInitialState() {
      return {
        buttonActive: false,
        waiting: false,
        msg: null,
        notification: null,
        orderId:null,
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
                    "creditCard": {
                        "cardNumber": "5424000000000015",
                        "expirationDate": "1220",
                        "cardCode": "999"
                    }
                },
                "profile":{
                  "createProfile": false

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
                
                "customerIP": "192.168.1.1",
                "transactionSettings": {
                    "setting": {
                        "settingName": "testRequest",
                        "settingValue": "false"
                    }
                },
            }
        }
    }

    // if (this.state.msg) return null

    let form = this.refs.paymentForm.getFormData()

    console.log(form.creditCardNumber)
    console.log(form.expirationDate)
    console.log(form.ccv)

    var cardNumber = this.refs.paymentForm.getFormData().creditCardNumber
    var ccv = this.refs.paymentForm.getFormData().ccv
    var expirationDate = this.refs.paymentForm.getFormData().expirationDate
    var message = []
    if(cardNumber.length != 16){
      message.push("Credit Card Length Error; ")
    }

    var patt = /[0-9]{2}\/[0-9]{2}/


    if (!patt.test(expirationDate)){
      message.push("Expiration Date Format Format Error; ")
    }
    if (ccv.length > 4){
      message.push("CCV Format Error;")
    }
    if (message.length != 0) {
      this.setState({
        msg: message
      })
      return
    }
      // expirationDate = expirationDate.slice(0,2)+expirationDate.slice(3,5)

    let orderID = FlowRouter.getQueryParam("order");

    paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.cardNumber = form.creditCardNumber
    paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.expirationDate = form.expirationDate
    paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.cardCode = form.ccv
    paymentInfo.createTransactionRequest.transactionRequest.billTo.firstName = form.cardHolderFirstName
    paymentInfo.createTransactionRequest.transactionRequest.billTo.lastName = form.cardHolderLastName
    paymentInfo.createTransactionRequest.transactionRequest.billTo.address = form.street
    paymentInfo.createTransactionRequest.transactionRequest.billTo.city = form.city
    paymentInfo.createTransactionRequest.transactionRequest.billTo.state = form.state
    paymentInfo.createTransactionRequest.transactionRequest.billTo.zip = form.zip
    paymentInfo.createTransactionRequest.refId = String(orderID)
    paymentInfo.createTransactionRequest.transactionRequest.customer.id = Meteor.userId()

    
    this.setState({orderId: orderID})
    let o = EdminForce.Collections.orders.find({"_id":orderID}).fetch()
    let amt = o[0].amount+0
    amt = amt * 1.03
    paymentInfo.createTransactionRequest.transactionRequest.amount = String(amt)
    console.log(paymentInfo)
    var URL = 'https://apitest.authorize.net/xml/v1/request.api'
    HTTP.call('POST',URL, {data: paymentInfo}, function(error, response){
      if(!!error){
        console.log(error)
      }
      if(!!response){
        console.log(response)
      }

      if (response.data.messages.message[0].code == "I00001") {
        console.log("Success")
        // console.log(response.data.profileResponse.customerPaymentProfileIdList[0])
        Meteor.call('sendEmailText',
                Meteor.user().emails[0].address,
                'Confirmation',
                'Thank you for your order.',
                function(err, res){
                  if(!!err){
                    console.log(err)
                  }
                  if(!!res){
                    console.log(res)
                  }
                });
        EdminForce.Collections.orders.update({
            "_id":self.state.orderId
          }, {
            $set:{
              "_id": self.state.orderId,
              paymentTotal:String(amt),
              status:"checkouted"
            }
          }, function(err, res){
               if(err) {
                   console.error("[Error] update order fail: ", err);
               }else{
                   console.log("[Info] Pay successful");
                   let params = {
                       orderId: self.state.orderId
                   };
                   let path = FlowRouter.path("/orders/summary/:orderId", params);
                   FlowRouter.go(path);
               }
            });
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

    checkCardNumber(){
      var ccv = this.refs.paymentForm.getFormData().ccv
      var cardNumber = this.refs.paymentForm.getFormData().creditCardNumber
      var expirationDate = this.refs.paymentForm.getFormData().expirationDate
      if (cardNumber.length > 16){
        this.setState({
              msg: "Credit Card Length Error"
            })
      }
    },

    checkExpirationDate(e){
      var cardNumber = this.refs.paymentForm.getFormData().creditCardNumber
      var ccv = this.refs.paymentForm.getFormData().ccv
      var expirationDate = this.refs.paymentForm.getFormData().expirationDate
      var message = []
      if(cardNumber.length != 16){
        message.push("Credit Card Length Error; ")
      }

      if (expirationDate.length > 5){
        message.push("Expiration Date Format Format Error; ")
      }
      if (message.length != 0) {
        this.setState({
              msg: message
            })
      }
    },

    checkCCV(e){
      var cardNumber = this.refs.paymentForm.getFormData().creditCardNumber
      var ccv = this.refs.paymentForm.getFormData().ccv
      var expirationDate = this.refs.paymentForm.getFormData().expirationDate
      var message = []
      if(cardNumber.length != 16){
        message.push("Credit Card Length Error; ")
      }

      var patt = /[0-9]{2}\/[0-9]{2}/


      if (!patt.test(expirationDate)){
        message.push("Expiration Date Format Format Error; ")
      }
      if (ccv.length > 4){
        message.push("CCV Format Error;")
      }
      if (message.length != 0) {
        this.setState({
              msg: message
            })
      }
    },

    calculateTotal(e){
      let orderID = FlowRouter.getQueryParam("order");
      let o = EdminForce.Collections.orders.find({"_id":orderID}).fetch()
      var amt = 0
      if (typeof o[0] === "undefined") {
        return amt
      }
      amt = o[0].amount+0
      amt = amt * 1.03
      return amt
    },

  render() {
    var inputTheme = "small-label"
      var buttonTheme = "full"
    if (_.contains(["overlay-light","overlay-dark"], this.props.theme)) {
          inputTheme += ","+this.props.theme
          buttonTheme += ","+this.props.theme
      }
      
      return (
        <RC.List className="padding">
        <RC.Loading isReady={this.data.isReady}>
              <span className="totalAmount">Total Amount is: ${this.calculateTotal()}</span>
              <br/>
              <br/>
              <RC.Form onSubmit={this.postPayment}   ref="paymentForm">
                {this.printMsg()}
              <RC.Input name="creditCardNumber" onKeyUp={this.checkCardNumber} label="Credit Card Number" theme={inputTheme} ref="cardNumber" />
              <RC.Input name="expirationDate" onKeyUp={this.checkExpirationDate} label="Expiration Date (MM/YY)"  theme={inputTheme} ref="expirationDate" />
              <RC.Input name="ccv" onKeyUp={this.checkCCV} label="CCV" theme={inputTheme} ref="ccv"/>
              <RC.Input name="cardHolderFirstName" label="Card Holder First Name" theme={inputTheme} ref="cardHolderFirstName"/>
              <RC.Input name="cardHolderLastName" label="Card Holder Last Name" theme={inputTheme} ref="cardHolderLastName"/>
              <RC.Input name="street"  label="Street Address" theme={inputTheme} ref="street"/>
              <RC.Input name="city"  label="City" theme={inputTheme} ref="city"/>
              <RC.Input name="state" label="State" theme={inputTheme} ref="state"/>
              <RC.Input name="zip" label="Zip" theme={inputTheme} ref="zip"/>
              <RC.Button name="button" theme="full" buttonColor="brand">
                  Pay Now
              </RC.Button>
            </RC.Form>
            </RC.Loading>
        </RC.List>
      );
    }
  });
}