
const config = {
    "merchantAuthentication" : {
        "name" : "9XD2ru9Z",
        "transactionKey" : "5yZ52WCb2EC5et2c"
    },

    requestUrl : 'https://apitest.authorize.net/xml/v1/request.api'
};

let CreditCardData = {
    createTransactionRequest : {
        merchantAuthentication : config.merchantAuthentication,
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
            }
        }
    }
};

let ECheckData = {
    "createTransactionRequest": {
        "merchantAuthentication": config.merchantAuthentication,
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
};

let Validate = {
    creditCardNumber : function(card){
        if(card.length !== 16){
            return new Meteor.Error('Format Error', 'Credit Card Length Error');
        }
        return true;
    },
    expirationDate : function(date){
        let patt = /[0-9]{2}\/[0-9]{2}/;
        if (!patt.test(date)){
            return new Meteor.Error('Format Error', "Expritation Date Format Error");
        }

        return true;
    },
    ccv : function(ccv){
        if (ccv.length > 4){
            return new Meteor.Error("Format Error", "CCV Length Error");
        }
        return true;
    },

    routingNumber : function(n){
        if(n.length !== 9){
            return new Meteor.Error("Format Error", "Routing Number Length Error; ");
        }
        return true;
    },
    accountNumber : function(n){
        if(n.length < 1){
            return new Meteor.Error("Format Error", "Account Number Cannot Be Empty; ");
        }
        return true;
    },
    nameOnAccount : function(n){
        if(n.length < 1){
            return new Meteor.Error("Format Error", "Name Cannot Be Empty; ");
        }
        return true;
    }
};

Meteor.methods({
    /*
     @param
     form = {
         creditCardNumber: the credit card number customer use
         ccv: the ccv of the credit card
         expirationDate: the expiration of the card
         order: order id
         id: customer id
         cardHolderFirstName: card holder first name of of billing address
         cardHolderLastName: card holder last name of of billing address
         street: street of billing address
         city: city of billing address
         state: state of billing address
         zip: zip code of billing address
         amount: the amount of dollar to be charged
     }
     @return the amount of money for be charged (I mutiply the total amount by
     1.03 to have a 3% process fee)
     @error{
     "Format Error": [
     "Credit Card Length Error",
     "Expritation Date Format Error",
     "CCV Length Error"
     ],
     "Payment Error"
     }
     */
    postPaymentByCreditCard : function(form){
        form = _.extend({
            creditCardNumber : '',
            ccv : '',
            expirationDate : '',
            order : '',
            id : '',
            cardHolderFirstName : '',
            cardHolderLastName : '',
            street : '',
            city : '',
            state : '',
            zip : '',
            amount : 0
        }, form||{});

        //validate
        let f1 = Validate.creditCardNumber(form.creditCardNumber),
            f2 = Validate.expirationDate(form.expirationDate),
            f3 = Validate.ccv(form.ccv);

        if(f1 !== true){
            throw f1;
        }
        if(f2 !== true){
            throw f2;
        }
        if(f3 !== true){
            throw f3;
        }

        let data = CreditCardData;
        _.extend(data.createTransactionRequest.transactionRequest.payment.creditCard, {
            cardNumber : form.creditCardNumber,
            expirationDate : form.expirationDate,
            cardCode : form.ccv
        });
        _.extend(data.createTransactionRequest.transactionRequest.billTo, {
            firstName : form.cardHolderFirstName,
            lastName : form.cardHolderLastName,
            address : form.street,
            city : form.city,
            state : form.state,
            zip : form.zip
        });
        _.extend(data.createTransactionRequest.transactionRequest.customer, {
            id : form.id
        });
        data.createTransactionRequest.refId = form.order;
        //data.createTransactionRequest.transactionRequest.amount = (parseInt(form.amount, 10)*1.03).toString();
        data.createTransactionRequest.transactionRequest.amount = form.amount.toString();


        let result = HTTP.call('POST', config.requestUrl, {data: data});
        if(result.statusCode>199){
            let json = result.data.messages.message[0];
            console.log(json);
            if(json.code !== 'I00001'){
                throw new Meteor.Error(json.code, json.text);
            }
            else{
                return json.text;
            }
        }
    },

    /*
     @param
     form = {
         routingNumber: the routing nubmer of the check
         accountNumber: the account nubmer of the check
         nameOnAccount: the name on the check
         order: order id
         id: customer id
         amount: the amount of dollar to be charged
     }
     @return the amount of money for be charged (no process fee)
     @error{
     "Format Error": [
     "Credit Card Length Error",
     "Expritation Date Format Error",
     "CCV Length Error"
     ],
     "Payment Error"
     }
     */
    postPaymentByECheck : function(form){
        form = _.extend({
            routingNumber : '',
            accountNumber : '',
            nameOnAccount : '',
            order : '',
            id : '',
            amount : 0
        }, form||{});

        let f1 = Validate.routingNumber(form.routingNumber),
            f2 = Validate.accountNumber(form.accountNumber),
            f3 = Validate.nameOnAccount(form.nameOnAccount);

        if(f1 !== true){
            throw f1;
        }
        if(f2 !== true){
            throw f2;
        }
        if(f3 !== true){
            throw f3;
        }

        let paymentInfo = ECheckData;
        paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.routingNumber = form.routingNumber;
        paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.accountNumber = form.accountNumber;
        paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.nameOnAccount = form.nameOnAccount;
        paymentInfo.createTransactionRequest.refId = form.order;
        paymentInfo.createTransactionRequest.transactionRequest.customer.id = form.id
        paymentInfo.createTransactionRequest.transactionRequest.amount = form.amount.toString();

        let result = HTTP.call('POST', config.requestUrl, {data: paymentInfo});
        if(result.statusCode>199){
            let json = result.data.messages.message[0];
            console.log(json);
            if(json.code !== 'I00001'){
                throw new Meteor.Error(json.code, json.text);
            }
            else{
                return json.text;
            }
        }
    }
});