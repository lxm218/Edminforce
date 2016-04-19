Meteor.methods({
	payCreditCard: function(form){
	    let self = this;
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
	                // "lineItems": {
	                //     "lineItem": {
	                //         "itemId": "1",
	                //         "name": "vase",
	                //         "description": "Cannes logo",
	                //         "quantity": "1",
	                //         "unitPrice": "0.02"
	                //     }
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

	    paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.cardNumber = form.creditCardNumber;
	    paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.expirationDate = form.expirationDate;
	    paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.cardCode = form.ccv;
	    paymentInfo.createTransactionRequest.transactionRequest.billTo.firstName = form.cardHolderFirstName;
	    paymentInfo.createTransactionRequest.transactionRequest.billTo.lastName = form.cardHolderLastName;
	    paymentInfo.createTransactionRequest.transactionRequest.billTo.address = form.street;
	    paymentInfo.createTransactionRequest.transactionRequest.billTo.city = form.city;
	    paymentInfo.createTransactionRequest.transactionRequest.billTo.state = form.state;
	    paymentInfo.createTransactionRequest.transactionRequest.billTo.zip = form.zip;
	    //Missing
	    paymentInfo.createTransactionRequest.refId = form.orderID;
	    paymentInfo.createTransactionRequest.transactionRequest.customer.id = form.userID;
	    paymentInfo.createTransactionRequest.transactionRequest.amount = form.amt;

	    // console.log(paymentInfo);
	    var URL = 'https://apitest.authorize.net/xml/v1/request.api';
	    var res = HTTP.call('POST',URL, {data: paymentInfo});
	    console.log(res);
	    return res;
	    // HTTP.call('POST',URL, {data: paymentInfo}, function(error, response){
	    //   // if(!!error){
	    //   //   console.log(error);
	    //   // }
	    //   // if(!!response){
	    //   //   console.log(response);
	    //   // }

	    //   if (response && response.data.messages.message[0].code == "I00001") {
	    //     console.log("Success");
	    //   } else{
	    //     console.log("Error");
	    //     throw new Meteor.Error("Payment Error", error);
	    //   }
	    //   self.res = response
	    // })
	    // return response;
    },

    payECheck: function(form){
	    let self = this;
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
	                // "lineItems": {
	                //     "lineItem": {
	                //         "itemId": "1",
	                //         "name": "vase",
	                //         "description": "Cannes logo",
	                //         "quantity": "1",
	                //         "unitPrice": "0.02"
	                //     }
	                // },
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
	    };

	    paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.routingNumber = form.routingNumber
    	paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.accountNumber = form.accountNumber
    	paymentInfo.createTransactionRequest.transactionRequest.payment.bankAccount.nameOnAccount = form.nameOnAccount
	    //Missing
	    paymentInfo.createTransactionRequest.refId = form.orderID;
	    paymentInfo.createTransactionRequest.transactionRequest.customer.id = form.userID;
	    paymentInfo.createTransactionRequest.transactionRequest.amount = form.amt;

	    // console.log(paymentInfo);
	    var URL = 'https://apitest.authorize.net/xml/v1/request.api'
	    var res = HTTP.call('POST',URL, {data: paymentInfo});
	    console.log(res);
	    return res;
	    // HTTP.call('POST',URL, {data: paymentInfo}, function(error, response){
	    //   // if(!!error){
	    //   //   console.log(error);
	    //   // }
	    //   // if(!!response){
	    //   //   console.log(response);
	    //   // }

	    //   if (response && response.data.messages.message[0].code == "I00001") {
	    //     console.log("Success");
	    //   } else{
	    //     console.log("Error");
	    //     throw new Meteor.Error("Payment Error", error);
	    //   }
	    //   self.res = response
	    // })
	    // return response;
    },

})


