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
  postPayment: function (form){
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

    var cardNumber = form.creditCardNumber
    var ccv = form.ccv
    var expirationDate = form.expirationDate
    if(cardNumber.length != 16){
      throw new Meteor.Error("Format Error", 
        "Credit Card Length Error")
    }

    var patt = /[0-9]{2}\/[0-9]{2}/
    if (!patt.test(expirationDate)){
      throw new Meteor.Error("Format Error", 
        "Expritation Date Format Error")
    }
    if (ccv.length > 4){
      throw new Meteor.Error("Format Error", 
        "CCV Length Error")
    }

    let orderID = form.order;
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
    paymentInfo.createTransactionRequest.transactionRequest.customer.id = form.id
    let amt = form.amount
    if (amt === "undefined"){
      amt = 0
    } else {
      amt = amt * 1.03
    }
    paymentInfo.createTransactionRequest.transactionRequest.amount = String(amt)
    var URL = 'https://apitest.authorize.net/xml/v1/request.api'
    HTTP.call('POST',URL, {data: paymentInfo}, function(error, response){
      if(!!error){
        console.log(error)
      }
      if(!!response){
        console.log(response)
      }
      if (response.data.messages.message[0].code != "I00001") {
        throw new Meteor.Error("Payment Error")
      }
      return amt
    })
  },
})