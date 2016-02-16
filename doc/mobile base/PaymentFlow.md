## Payment Flow

Describe the flow of payment.

1. User book a class. The book class will be expired after 15mins(This value can be changed)  
2. User go to checkout page, in this page list all user booked classes(status is "pending").
3. User can use coupon or school credit, delete booked classes
4. User click "Process Payment", change all the selected book classes's status to "checkouting", and add an order to orders collection. 
5. Call payment function, set order's status to "checkouting", pass order id to payment.
5.1 If payment successful, update order status to "checkouted", also update all the selected book classes's status to "checkouted".
5.2 If payment fail, user can go to "Billing->Currently" to see in progress order, and pay again. If user didn't finish payment in 15mins(this value can be changed), this order will be expired. Set order's status to expired, and also change selected book classes's status to "pending"