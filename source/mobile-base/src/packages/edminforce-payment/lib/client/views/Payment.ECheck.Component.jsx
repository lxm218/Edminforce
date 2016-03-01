{

    // Don't forget to change `SomeName` to correct name
  EdminForce.Components.ECheck = React.createClass ({

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

    let form = this.refs.paymentForm.getFormData()

    console.log(form.routingNumber)
    console.log(form.accountNumber)
    console.log(form.nameOnAccount)

    var routingNumber = form.routingNumber
    var accountNumber = form.accountNumber
    var nameOnAccount = form.nameOnAccount
    var message = []
    if(routingNumber.length != 9){
      message.push("Routing Number Length Error; ")
    }

    if (accountNumber.length != 12){
      message.push("Account Number Length Error; ")
    }
    if (nameOnAccount.length == 0) {
      message.push("Name Cannot Be Empty; ")
    }
    if (message.length != 0) {
      this.setState({
        msg: message
      })
      return
    } else {
      this.setState({
        msg: null
      })
    }

    let orderID = FlowRouter.getQueryParam("order");
    this.setState({orderId: orderID})
    let o = EdminForce.Collections.orders.find({"_id":orderID}).fetch()
    paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.routingNumber = form.routingNumber
    paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.accountNumber = form.accountNumber
    paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.nameOnAccount = form.nameOnAccount
    // paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.bankName = form.bankNname
    paymentInfo.createTransactionRequest.refId = String(orderID)
    paymentInfo.createTransactionRequest.transactionRequest.customer.id = Meteor.userId()
    paymentInfo.createTransactionRequest.transactionRequest.amount = String(o[0].amount)
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
                'Thank you for your order.');
        EdminForce.Collections.orders.update({
            "_id":self.state.orderId
          }, {
            $set:{
              "_id": self.state.orderId,
              paymentTotal:String(o[0].amount),
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

    checkRoutingNumber(e){
      let form = this.refs.paymentForm.getFormData()
      var routingNumber = form.routingNumber
      var accountNumber = form.accountNumber
      var nameOnAccount = form.nameOnAccount
      if (routingNumber.length > 9){
        this.setState({
              msg: "Routing Number Length Error"
            })
      }
    },

    checkAccountNumber(e){
      let form = this.refs.paymentForm.getFormData()
      var routingNumber = form.routingNumber
      var accountNumber = form.accountNumber
      var nameOnAccount = form.nameOnAccount
      var message = []
      if(routingNumber.length != 9){
        message.push("Routing Number Length Error; ")
      }

      if (accountNumber.length > 12){
        message.push("Account Number Length Error; ")
      }
      if (message.length != 0) {
        this.setState({
              msg: message
        })
      }
    },

    checkName(e){
      let form = this.refs.paymentForm.getFormData()
      var routingNumber = form.routingNumber
      var accountNumber = form.accountNumber
      var nameOnAccount = form.nameOnAccount
      var message = []
      if(routingNumber.length != 9){
        message.push("Routing Number Length Error; ")
      }

      if (accountNumber.length != 12){
        message.push("Account Number Length Error; ")
      }
      if (nameOnAccount.length == 0) {
        message.push("Name Cannot Be Empty; ")
      }
      if (message.length != 0) {
        this.setState({
              msg: message
        })
      } else {
        this.setState({
              msg: null
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
              <span className="totalAmount">Total Amount is : ${this.calculateTotal()}</span>
              <br/>
              <br/>
              <RC.Form onSubmit={this.postPayment}   ref="paymentForm">
                {this.printMsg()}
                <RC.Input name="routingNumber" onKeyUp={this.checkRoutingNumber} label="Routing Number" theme={inputTheme} ref="routingNumber" />
                <RC.Input name="accountNumber" onKeyUp={this.checkAccountNumber} label="Account Number"  theme={inputTheme} ref="accountNumber" />
                <RC.Input name="nameOnAccount" onKeyUp={this.checkName} label="Check Holder Name" theme={inputTheme} ref="nameOnAccount"/>
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