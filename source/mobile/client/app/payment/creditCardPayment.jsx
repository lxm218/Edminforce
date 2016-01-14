let themes = ["overlay-light","overlay-dark"]
Cal.CreditCard = React.createClass({
	mixins: [ReactMeteorData],
  	
	getMeteorData() {
	 	return {
	  		currentUser: Meteor.user()
	  	};
	 },

	 logOut(){
	 	Meteor.logout()
	 	FlowRouter.go("/auth")
	 },

	 postPayment(e){

	 	// To do: get the charging amount from database
	 	// To do: change the referece id

	 	e.preventDefault()
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
		                "id": "99999456654"
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
		            "shipTo": {
		                "firstName": "China",
		                "lastName": "Bayles",
		                "company": "Thyme for Tea",
		                "address": "12 Main Street",
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
		            "userFields": {
		                "userField": [
		                    {
		                        "name": "MerchantDefinedFieldName1",
		                        "value": "MerchantDefinedFieldValue1"
		                    },
		                    {
		                        "name": "favorite_color",
		                        "value": "blue"
		                    }
		                ]
		            }
		        }
		    }
		}

		// if (this.state.msg) return null
		let self = this
		let form = this.refs.paymentForm.getFormData()

		console.log(form.creditCardNumber)
		console.log(form.expirationDate)
		console.log(form.ccv)

		paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.cardNumber = form.creditCardNumber
	 	paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.expirationDate = form.expirationDate
	 	paymentInfo.createTransactionRequest.transactionRequest.payment.creditCard.cardCode = form.ccv

		var URL = 'https://apitest.authorize.net/xml/v1/request.api'
		HTTP.call('POST',URL, {data: paymentInfo}, function(error, response){
			// debugger
			if(!!error){
				console.log(error)
			}
			if(!!response){
				console.log(response)
			}

			if (response.data.messages.message[0].code == "I00001") {
				console.log("Success")
				Meteor.call('sendEmail',
            		Meteor.user().emails[0].address,
            		'Confirmation',
            		'Thank you for your order.');

			};

		})

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

	            { this.data.currentUser ?
	            	<div>
	            		<RC.Item theme="text-wrap"> User Name: {this.data.currentUser.username}</RC.Item>
	            		<RC.Item theme="text-wrap"> User Email: {this.data.currentUser.emails[0].address}</RC.Item>
	            	</div> : <RC.Item theme="text-wrap"> User Not Logged In</RC.Item>
	            }
	            { this.data.currentUser ?
	            	<RC.Button onClick={this.logOut} name="button" theme="full" buttonColor="brand">
		                Log Out
		            </RC.Button> :
		            <RC.URL href="/login">
		                <RC.Button name="button" theme="full" buttonColor="brand">
		                    Log In
		                </RC.Button>
		            </RC.URL>
		            
		        }
	            <RC.URL href="/">
	                <RC.Button name="button" theme="full" buttonColor="brand">
	                    Home
	                </RC.Button>
	            </RC.URL>

	            <RC.Form onSubmit={this.postPayment} onKeyUp={this.checkButtonState} ref="paymentForm">
	            	<RC.Input name="creditCardNumber" label="Credit Card Number" theme={inputTheme} ref="cardNumber" />
			        <RC.Input name="expirationDate" label="Expiration Date"  theme={inputTheme} ref="expirationDate" />
			        <RC.Input name="ccv" ref="ccv"  label="CCV" theme={inputTheme} ref="ccv"/>
		            <RC.Button name="button" theme="full" buttonColor="brand">
		                    Pay Now
		                </RC.Button>
		        </RC.Form>

        	</RC.List>
	    );
	 }
})