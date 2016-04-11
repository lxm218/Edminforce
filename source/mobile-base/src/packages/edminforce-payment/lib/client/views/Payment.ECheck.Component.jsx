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
                // "billTo": {
                //     "firstName": "Ellen",
                //     "lastName": "Johnson",
                //     "company": "Souveniropolis",
                //     "address": "14 Main Street",
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

    if (accountNumber.length == 0){
      message.push("Account Number Cannot Be Empty; ")
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

    var email = this.prepareEmail()
    let orderID = FlowRouter.getQueryParam("order");
    let o = EdminForce.Collections.orders.find({"_id":orderID}).fetch()
    var amt = Number(o[0].amount) + 0.5
    form.orderID = orderID
    form.userID = Meteor.userId()
    form.amt = String(amt)

    Meteor.call('payECheck', form, function (error, response) {
      if (!!error){
        self.setState({
             msg: "Connection Failure. Payment cannot be posted."
           })
      } 
      else if (response && response.data.messages.message[0].code == "I00001") {
        console.log("Success")
        EdminForce.Collections.Customer.updateRegistrationFeeFlagAfterPayment();
        Meteor.call('sendEmailHtml',
                  Meteor.user().emails[0].address,
                  email.subject,
                  email.content,
                  function (error, result) {
                    if (!!error){
                      console.log(error)
                    }
                    if (!!result){
                      console.log(result)
                    } } );
        EdminForce.Collections.orders.update({
            "_id":orderID
          }, {
            $set:{
              "_id": orderID,
              paymentTotal:amt,
              paymentMethod:"echeck",
              paymentSource:"mobile",
              status:"success"
            }
          }, function(err, res){
               if(err) {
                   console.error("[Error] update order fail: ", err);
               }else{
                   console.log("[Info] Pay successful");
                   let params = {
                       orderId: orderID
                   };
                   let path = FlowRouter.path("/orders/summary/:orderId",params,{makeupOnly:FlowRouter.getQueryParam("makeupOnly")});
                   FlowRouter.go(path);
               }
            });
      }
      else{
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

      if (accountNumber.length == 0){
        message.push("Account Number Cannot Be Empty; ")
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
      amt = Number(o[0].amount) + 0.5
      amt = amt.toFixed(2)
      return amt
    },

    prepareConfirmationEmail(){
      var o = this.data.order[0]
      var classes = this.getAllClasses(o.details)
      var registrationFee = o.registrationFee
      var couponDiscount = o.discount
      var amt = Number(o.amount)
      var total = amt + 0.5
      total = total.toFixed(2)
      var processFee = total - amt
      processFee = processFee.toFixed(2)
      if (typeof registrationFee == "undefined"){
        registrationFee = 0
      }
      if (typeof couponDiscount == "undefined"){
        couponDiscount = 0
      }
      return {
        "amount": amt,
        "classes": classes,
        "registrationFee" : registrationFee,
        "couponDiscount": couponDiscount,
        "processFee": processFee,
        "total": total
      }
    },


    getAllClasses(classStudentIDs){
      var res = {}
      for (var i = 0; i < classStudentIDs.length; i++) {
        var c = EdminForce.Collections.classStudent.find({
          _id: classStudentIDs[i]
        }, {}
        ).fetch();
        var student = EdminForce.Collections.student.find({
          _id: c[0].studentID
        }, {}
        ).fetch();
        if (res[student[0].name] == undefined){
          res[student[0].name] = {}
        }
        var doc = res[student[0].name]
        var classes = EdminForce.Collections.class.find({
          _id: c[0].classID
        }, {}
        ).fetch();
        var session = EdminForce.Collections.session.findOne({
          _id: classes[0].sessionID
        })
        var numberOfClass = EdminForce.Collections.class.calculateNumberOfClass(classes[0], session, true);
        doc[classes[0].name] = classes[0].tuition.money * numberOfClass
      }
      return res
    },

    getPaymentConfirmEmailTemplate(data){
        let school={
          "name" : "CalColor Academy"
        }
        let tpl = [
            '<h3>Hello,</h3>',
            '<p>This is your registration detail: </p>',
            '<table border=\"1\">',
        ].join('')
        var classes = data.classes

        for (var studentName in classes){
          var count = 0
          var l = ""
          var chosenClass = classes[studentName]
          for (var name in chosenClass){
            if(count != 0){
              var line = [
                  '<tr>',
                    '<td>',name,'</td>',
                    '<td>$',chosenClass[name],'</td>',
                  '</tr>',
              ].join('')
              l = l + line
            } else {
              var line = [
                    '<td>',name,'</td>',
                    '<td>$',chosenClass[name],'</td>',
                  '</tr>',
              ].join('')
              l = l + line
            }
            count ++
          }
          var fCol = [
                '<tr>',
                  '<td rowspan=',count,'>',studentName,'</td>',
            ].join('')
            tpl = tpl + fCol + l
        }

        if (data.couponDiscount != 0){
          tpl = tpl + [
              '<tr>',
                '<td colspan=\"2\">Coupon Discount</td>',
                '<td>-$',data.couponDiscount,'</td>',
              '</tr>',].join('')
        }
        if (data.registrationFee != 0){
          tpl = tpl + [
              '<tr>',
                '<td colspan=\"2\">Registration</td>',
                '<td>$',data.registrationFee,'</td>',
              '</tr>',].join('')
        }
        tpl = tpl + [
              '<tr>',
                '<td colspan=\"2\">ECheck Process Fee</td>',
                '<td>$',data.processFee,'</td>',
              '</tr>',
              '<tr>',
                '<td colspan=\"2\">Total</td>',
                '<td>$',data.total,'</td>',
              '</tr>',

            '</table>',

            '<h4>See details, please <a href="http://www.classforth.com" target="_blank">Login Your Account</a></h4>',

            '<br/><br/>',
            '<b>',school.name,'</b>'
        ].join('')
         return tpl
    },

    prepareEmail(){
      var o = this.data.order[0]
      var c = EdminForce.Collections.classStudent.findOne({
          _id: o.details[0]
        })
      if (c.type != "register") {
        var data = this.prepareMakeUpEmail()
        let html = this.getMakeUpConfirmEmailTemplate(data);
        return {
          "content": html,
          "subject": "Make Up Class Booking Confirmation"
        }

      } else {
        var data = this.prepareConfirmationEmail()
        let html = this.getPaymentConfirmEmailTemplate(data);
        return {
          "content": html,
          "subject": "Registration Confirmation"
        }
      }
    },

    prepareMakeUpEmail(){
      var o = this.data.order[0]
      var classes = this.getMakeUpClasses(o.details)
      var registrationFee = o.registrationFee
      var couponDiscount = o.discount
      var amt = Number(o.amount)
      var total = amt + 0.5
      total = total.toFixed(2)
      var processFee = total - amt
      processFee = processFee.toFixed(2)
      if (typeof registrationFee == "undefined"){
        registrationFee = 0
      }
      if (typeof couponDiscount == "undefined"){
        couponDiscount = 0
      }
      return {
        "amount": amt,
        "classes": classes,
        "registrationFee" : registrationFee,
        "couponDiscount": couponDiscount,
        "processFee": processFee,
        "total": total
      }
    },

    getMakeUpClasses(classStudentIDs){
      var res = {}
      for (var i = 0; i < classStudentIDs.length; i++) {
        var c = EdminForce.Collections.classStudent.find({
          _id: classStudentIDs[i]
        }, {}
        ).fetch();
        var student = EdminForce.Collections.student.find({
          _id: c[0].studentID
        }, {}
        ).fetch();
        if (res[student[0].name] == undefined){
          res[student[0].name] = {}
        }
        var doc = res[student[0].name]
        var classes = EdminForce.Collections.class.find({
          _id: c[0].classID
        }, {}
        ).fetch();
        doc[classes[0].name] = [classes[0].makeupClassFee, this.formatDate(c[0].lessonDate)]
      }
      return res
    },

    getMakeUpConfirmEmailTemplate(data){
        let school={
          "name" : "CalColor Academy"
        }
        let tpl = [
            '<h3>Hello,</h3>',
            '<p>This is your Make Up Class detail: </p>',
            '<table border=\"1\">',
            '<tr>',
                '<td>Name</td>',
                '<td>Class</td>',
                '<td>Date</td>',
                '<td>Fee</td>',
            '</tr>'
        ].join('')
        var classes = data.classes

        for (var studentName in classes){
          var count = 0
          var l = ""
          var chosenClass = classes[studentName]
          for (var name in chosenClass){
            if(count != 0){
              var line = [
                  '<tr>',
                    '<td>',name,'</td>',
                    '<td>',chosenClass[name][1],'</td>',
                    '<td>$',chosenClass[name][0],'</td>',
                  '</tr>',
              ].join('')
              l = l + line
            } else {
              var line = [
                    '<td>',name,'</td>',
                    '<td>',chosenClass[name][1],'</td>',
                    '<td>$',chosenClass[name][0],'</td>',
                  '</tr>',
              ].join('')
              l = l + line
            }
            count ++
          }
          var fCol = [
                '<tr>',
                  '<td rowspan=',count,'>',studentName,'</td>',
            ].join('')
            tpl = tpl + fCol + l
        }

        if (data.couponDiscount != 0){
          tpl = tpl + [
              '<tr>',
                '<td colspan=\"3\">Coupon Discount</td>',
                '<td>-$',data.couponDiscount,'</td>',
              '</tr>',].join('')
        }
        if (data.registrationFee != 0){
          tpl = tpl + [
              '<tr>',
                '<td colspan=\"3\">Registration</td>',
                '<td>$',data.registrationFee,'</td>',
              '</tr>',].join('')
        }
        tpl = tpl + [
              '<tr>',
                '<td colspan=\"3\">Credit Process Fee</td>',
                '<td>$',data.processFee,'</td>',
              '</tr>',
              '<tr>',
                '<td colspan=\"3\">Total</td>',
                '<td>$',data.total,'</td>',
              '</tr>',

            '</table>',

            '<h4>See details, please <a href="http://www.classforth.com" target="_blank">Login Your Account</a></h4>',

            '<br/><br/>',
            '<b>',school.name,'</b>'
        ].join('')
         return tpl
    },

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
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
              <div className="payment-container">
              <span className="totalAmount">Total Amount is : ${this.calculateTotal()}</span>
              <br/>
              <br/>
              <div>
                  <span className="sample-check"></span>
              </div>
              <RC.Form onSubmit={this.postPayment}   ref="paymentForm">
                {this.printMsg()}
                <RC.Input name="routingNumber" onKeyUp={this.checkRoutingNumber} label="Routing Number" theme={inputTheme} ref="routingNumber" />
                <RC.Input name="accountNumber" onKeyUp={this.checkAccountNumber} label="Account Number"  theme={inputTheme} ref="accountNumber" />
                <RC.Input name="nameOnAccount" onKeyUp={this.checkName} label="Check Holder Name" theme={inputTheme} ref="nameOnAccount"/>
              <RC.Button name="button" theme="full" buttonColor="brand">
                  Pay Now
              </RC.Button>
            </RC.Form>
            <a href="http://www.authorize.net/"><div className="authorize-verified"></div></a>
            </div>
          </RC.Loading>
        </RC.List>
      );
    }
  });
}
