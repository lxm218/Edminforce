
EdminForce.Components.PaymentCreditCard = class extends RC.CSS {
    constructor(p) {
        super(p);
        this.state = {
            valid: false
        }

        this.validateFormData = this.validateFormData.bind(this);
        this.postPayment = this.postPayment.bind(this);
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
        this.props.actions.payCreditCard(creditCardPaymentInfo);
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
                <span>Total Amount is: ${this.props.amount}</span>
                <br/>
                <br/>
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
            </RC.List>
        );
    }
}

EdminForce.Components.CreditCard = React.createClass({

    mixins: [RC.Mixins.Theme],
    mixins: [ReactMeteorData],

    getMeteorData() {
        let orderID = FlowRouter.getQueryParam("order");
        let handler = Meteor.subscribe("EF-ShoppingCarts-Checkout");
        let o = EdminForce.Collections.orders.find({"_id": orderID}).fetch()
        let ready = handler.ready()
        return {
            isReady: ready,
            order: o
        }
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

        e.preventDefault()
        let self = this

        var form = this.refs.paymentForm.getFormData()

        // Format Checking
        var cardNumber = this.refs.paymentForm.getFormData().creditCardNumber
        var ccv = this.refs.paymentForm.getFormData().ccv
        var expirationDate = this.refs.paymentForm.getFormData().expirationDate
        var message = []
        if (cardNumber.length != 16) {
            message.push("Credit Card Length Error; ")
        }
        if (cardNumber.length > 2) {
            if (cardNumber[0] == '3' && (cardNumber[1] == '4' || cardNumber[1] == '7')) {
                message.push("American Express Is Not Supported; ")
            }
        }
        var patt = /[0-9]{2}\/[0-9]{2}/
        if (!patt.test(expirationDate)) {
            message.push("Expiration Date Format Format Error; ")
        }
        if (ccv.length > 4) {
            message.push("CCV Format Error;")
        }
        if (message.length != 0) {
            this.setState({
                msg: message
            })
            return
        }

        // Prepare Confirmation Email
        var email = this.prepareEmail()

        // Prepare Payment Data
        let orderID = FlowRouter.getQueryParam("order");
        let o = EdminForce.Collections.orders.find({"_id": orderID}).fetch()
        let amt = Number(o[0].amount) * 1.03
        amt = amt.toFixed(2)
        form.orderID = orderID
        form.userID = Meteor.userId()
        form.amt = amt

        Meteor.call('payCreditCard', form, function (error, response) {
            if (!!error) {
                self.setState({
                    msg: "Connection Failure. Payment cannot be posted"
                })
            }
            else if (response && response.data.messages.message[0].code == "I00001") {
                // Payment is successful
                console.log("Success")
                EdminForce.Collections.Customer.updateRegistrationFeeFlagAfterPayment();

                Meteor.call('sendEmailHtml',
                    Meteor.user().emails[0].address,
                    email.subject,
                    email.content,
                    function (error, result) {
                        if (!!error) {
                            console.log(error)
                        }
                        if (!!result) {
                            console.log(result)
                        }
                    });

                // Update Database
                EdminForce.Collections.orders.update({
                    "_id": orderID
                }, {
                    $set: {
                        "_id": orderID,
                        paymentTotal: String(amt),
                        paymentMethod: "creditCard",
                        status: "success"
                    }
                }, function (err, res) {
                    if (err) {
                        console.error("[Error] update order fail: ", err);
                    } else {
                        console.log("[Info] Pay successful");
                        let params = {
                            orderId: orderID
                        };


                        let path = FlowRouter.path("/orders/summary/:orderId", params, {makeupOnly: FlowRouter.getQueryParam("makeupOnly")});
                        FlowRouter.go(path);
                    }
                });
            }
            else {
                self.setState({
                    msg: "The transaction was unsuccessful."
                })
            }
        });
    },

    printMsg(){
        console.log("printMsg is called", this.state.msg)

        let currentMessages = this.state.msg ? [this.state.msg] : []
        return <div>
            {
                currentMessages.map(function (m, n) {
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
        var message = []
        if (cardNumber.length > 16) {
            message.push("Credit Card Length Error; ")
        }

        if (cardNumber.length > 2) {
            if (cardNumber[0] == '3' && (cardNumber[1] == '4' || cardNumber[1] == '7')) {
                message.push("American Express Is Not Supported; ")
            }
        }

        if (message.length != 0) {
            this.setState({
                msg: message
            })
        }
    },

    checkExpirationDate(e){
        var cardNumber = this.refs.paymentForm.getFormData().creditCardNumber
        var ccv = this.refs.paymentForm.getFormData().ccv
        var expirationDate = this.refs.paymentForm.getFormData().expirationDate
        var message = []
        if (cardNumber.length != 16) {
            message.push("Credit Card Length Error; ")
        }
        if (cardNumber.length > 2) {
            if (cardNumber[0] == '3' && (cardNumber[1] == '4' || cardNumber[1] == '7')) {
                message.push("American Express Is Not Supported; ")
            }
        }

        if (expirationDate.length > 5) {
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
        if (cardNumber.length != 16) {
            message.push("Credit Card Length Error; ")
        }
        if (cardNumber.length > 2) {
            if (cardNumber[0] == '3' && (cardNumber[1] == '4' || cardNumber[1] == '7')) {
                message.push("American Express Is Not Supported; ")
            }
        }

        var patt = /[0-9]{2}\/[0-9]{2}/


        if (!patt.test(expirationDate)) {
            message.push("Expiration Date Format Format Error; ")
        }
        if (ccv.length > 4) {
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
        let o = EdminForce.Collections.orders.find({"_id": orderID}).fetch()
        var amt = 0
        if (typeof o[0] === "undefined") {
            return amt
        }
        amt = Number(o[0].amount) * 1.03
        amt = amt.toFixed(2)
        return amt
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

    prepareConfirmationEmail(){
        var o = this.data.order[0]
        var classes = this.getAllClasses(o.details)
        var registrationFee = o.registrationFee
        var couponDiscount = o.discount
        var amt = Number(o.amount)
        var total = amt * 1.03
        total = total.toFixed(2)
        var processFee = total - amt
        processFee = processFee.toFixed(2)
        if (typeof registrationFee == "undefined") {
            registrationFee = 0
        }
        if (typeof couponDiscount == "undefined") {
            couponDiscount = 0
        }
        return {
            "amount": amt,
            "classes": classes,
            "registrationFee": registrationFee,
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
            if (res[student[0].name] == undefined) {
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
        let school = {
            "name": "CalColor Academy"
        }
        let tpl = [
            '<h3>Hello,</h3>',
            '<p>This is your registration detail: </p>',
            '<table border=\"1\">',
        ].join('')
        var classes = data.classes

        for (var studentName in classes) {
            var count = 0
            var l = ""
            var chosenClass = classes[studentName]
            for (var name in chosenClass) {
                if (count != 0) {
                    var line = [
                        '<tr>',
                        '<td>', name, '</td>',
                        '<td>$', chosenClass[name], '</td>',
                        '</tr>',
                    ].join('')
                    l = l + line
                } else {
                    var line = [
                        '<td>', name, '</td>',
                        '<td>$', chosenClass[name], '</td>',
                        '</tr>',
                    ].join('')
                    l = l + line
                }
                count++
            }
            var fCol = [
                '<tr>',
                '<td rowspan=', count, '>', studentName, '</td>',
            ].join('')
            tpl = tpl + fCol + l
        }

        if (data.couponDiscount != 0) {
            tpl = tpl + [
                    '<tr>',
                    '<td colspan=\"2\">Coupon Discount</td>',
                    '<td>-$', data.couponDiscount, '</td>',
                    '</tr>',].join('')
        }
        if (data.registrationFee != 0) {
            tpl = tpl + [
                    '<tr>',
                    '<td colspan=\"2\">Registration</td>',
                    '<td>$', data.registrationFee, '</td>',
                    '</tr>',].join('')
        }
        tpl = tpl + [
                '<tr>',
                '<td colspan=\"2\">Credit Process Fee</td>',
                '<td>$', data.processFee, '</td>',
                '</tr>',
                '<tr>',
                '<td colspan=\"2\">Total</td>',
                '<td>$', data.total, '</td>',
                '</tr>',

                '</table>',

                '<h4>See details, please <a href="http://www.classforth.com" target="_blank">Login Your Account</a></h4>',

                '<br/><br/>',
                '<b>', school.name, '</b>'
            ].join('')
        return tpl
    },

    prepareMakeUpEmail(){
        var o = this.data.order[0]

        var classes = this.getMakeUpClasses(o.details)
        var registrationFee = o.registrationFee
        var couponDiscount = o.discount
        var amt = Number(o.amount)
        var total = amt * 1.03
        total = total.toFixed(2)
        var processFee = total - amt
        processFee = processFee.toFixed(2)
        if (typeof registrationFee == "undefined") {
            registrationFee = 0
        }
        if (typeof couponDiscount == "undefined") {
            couponDiscount = 0
        }
        return {
            "amount": amt,
            "classes": classes,
            "registrationFee": registrationFee,
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
            if (res[student[0].name] == undefined) {
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
        let school = {
            "name": "CalColor Academy"
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

        for (var studentName in classes) {
            var count = 0
            var l = ""
            var chosenClass = classes[studentName]
            for (var name in chosenClass) {
                if (count != 0) {
                    var line = [
                        '<tr>',
                        '<td>', name, '</td>',
                        '<td>', chosenClass[name][1], '</td>',
                        '<td>$', chosenClass[name][0], '</td>',
                        '</tr>',
                    ].join('')
                    l = l + line
                } else {
                    var line = [
                        '<td>', name, '</td>',
                        '<td>', chosenClass[name][1], '</td>',
                        '<td>$', chosenClass[name][0], '</td>',
                        '</tr>',
                    ].join('')
                    l = l + line
                }
                count++
            }
            var fCol = [
                '<tr>',
                '<td rowspan=', count, '>', studentName, '</td>',
            ].join('')
            tpl = tpl + fCol + l
        }

        if (data.couponDiscount != 0) {
            tpl = tpl + [
                    '<tr>',
                    '<td colspan=\"3\">Coupon Discount</td>',
                    '<td>-$', data.couponDiscount, '</td>',
                    '</tr>',].join('')
        }
        if (data.registrationFee != 0) {
            tpl = tpl + [
                    '<tr>',
                    '<td colspan=\"3\">Registration</td>',
                    '<td>$', data.registrationFee, '</td>',
                    '</tr>',].join('')
        }
        tpl = tpl + [
                '<tr>',
                '<td colspan=\"3\">Credit Process Fee</td>',
                '<td>$', data.processFee, '</td>',
                '</tr>',
                '<tr>',
                '<td colspan=\"3\">Total</td>',
                '<td>$', data.total, '</td>',
                '</tr>',

                '</table>',

                '<h4>See details, please <a href="http://www.classforth.com" target="_blank">Login Your Account</a></h4>',

                '<br/><br/>',
                '<b>', school.name, '</b>'
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
        if (_.contains(["overlay-light", "overlay-dark"], this.props.theme)) {
            inputTheme += "," + this.props.theme
            buttonTheme += "," + this.props.theme
        }

        return (
            <RC.List className="padding">
                    <span className="totalAmount">Total Amount is: ${this.calculateTotal()}</span>
                    <br/>
                    <br/>
                    <RC.Form onSubmit={this.postPayment} ref="paymentForm">
                        {this.printMsg()}
                        <RC.Input name="creditCardNumber" onKeyUp={this.checkCardNumber} label="Credit Card Number"
                                  theme={inputTheme} ref="cardNumber"/>
                        <RC.Input name="expirationDate" onKeyUp={this.checkExpirationDate}
                                  label="Expiration Date (MM/YY)" theme={inputTheme} ref="expirationDate"/>
                        <RC.Input name="ccv" onKeyUp={this.checkCCV} label="CCV" theme={inputTheme} ref="ccv"/>
                        <RC.Input name="cardHolderFirstName" label="Card Holder First Name" theme={inputTheme}
                                  ref="cardHolderFirstName"/>
                        <RC.Input name="cardHolderLastName" label="Card Holder Last Name" theme={inputTheme}
                                  ref="cardHolderLastName"/>
                        <RC.Input name="street" label="Street Address" theme={inputTheme} ref="street"/>
                        <RC.Input name="city" label="City" theme={inputTheme} ref="city"/>
                        <RC.Input name="state" label="State" theme={inputTheme} ref="state"/>
                        <RC.Input name="zip" label="Zip" theme={inputTheme} ref="zip"/>
                        <RC.Button name="button" theme="full" buttonColor="brand">
                            Pay Now
                        </RC.Button>
                    </RC.Form>
            </RC.List>
        );
    }
});