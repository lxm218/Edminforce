#Payment Integretion
##Where are they?
Router is located at `Calphin-Project/source/mobile2/client/lib/router/payment.jsx`

All related files are under `Calphin-Project/source/mobile2/client/app/payment/`

Two files are of particular importance:

`creditCardPayment.jsx` for processing credit card and `echeckPayment.jsx` for electronic checks
##What can they do?
They will debit a credit card or an electonic check.<br>
When error occurs, the transaction is not successful and error messages will be shown.<br>
If the transaction goes through, a confirmation email will be sent and I will also receive a confirmation from authorize.<br>
##How to change?
###Change the total amount
Within each file, there is a line of the following<br>
paymentInfo.createTransactionRequest.transactionRequest.amount = "0.1"<br>
‘0.1’ is a dummy total number, please change the amount in accordance with your database design<br>
###Desicde which payment method to use
Credit card payment is at `http://localhost:3000/payment/CreditCard`<br>
Electronic Payment is at `http://localhost:3000/payment/ECheck`<br>
Please decide to which page you jump at the final stage of "shopping cart"<br>
#Next Step (Not shown in demo)
 * Tokenize credit card
 * Store Payment history
 * Put all files in package for easy use next time
