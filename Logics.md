Logics for Customer Mobile App
1.	Existing customers will receive emails for swim class registration.  Once they click URL in the email, it will link to page 0.0b. The system is able to identify which facility (Fremont or Dublin) this customer belongs to. 

2.	New customers or existing customers, if they type Calphin URL, it leads to page 0.0, after click either facility, it leads to page 0.0a. 


3.	After log in, only Fremont customers will see page 0.3 shows ‘Swim Class’ and ‘Membership’

4.	When new customer creates an account, he needs to fill out new swimmer evaluation form for each new swimmer added (for swim class only), then system will assign a level to this swimmer (page 1.12a)

5.	Swim class registration adapts the following priorities:

1st week – Email sent to all current swimmers. Current swimmers are able to register class with same time slot. (go to page 2.0a)
2nd week – Email sent to all current swimmers who haven’t registered during the 1st week. Current swimmers are able to register class with different time slot (go to page 2.1 instead of 2.0a) 
3rd week – Email sent to all current swimmers who haven’t registered and returning swimmers. They are able to register any available class. (go to page 2.1 instead of 2.0a) 
4th week – Registration opens to everyone including new customers.  They are able to register any available class. (go to page 2.1 instead of 2.0a) 

Customers will only be able to pick available day/time for class registration (page 2.1, 2.11, 2.111)

Exception:  returning or new swimmer whose sibling is a current swimmer, he has the same priority as his sibling when his sibling also register for that session.

6.	On page 2.2, system will apply discount to total amount when multiple swimmers are registered under one account. Class fee will be stored in database and $10 discount applied to each additional swimmer register. Or $10 discount applied to each additional lesson a swimmer register.

7.	When customers click Pay Now on payment page, it gives them 5 minutes to finish transaction. If they click Pay in Store, it allows 24 hours to make payment to secure the spot. 

8.	After class registration, only new swimmer will see ‘waiver form’. 
(page 2.3). All other swimmers don’t need to see this button.

9.	See Calphin’s Swimmer_Agreement_Waiver, customers are able to click ‘Agree’ on page 2.33. Also add Print Waiver Form as option on the page. 

10.	Swimmer’s level is assigned by system that cannot edited by customers.

11.	On page 3.2, when customer enroll family membership, page 3.2a will be shown to add family member information.

12.	See Calphin’s Membership Payment Explanation including membership fee (page 3.21, 3.211), how to prorate, discount applied to different membership payment type. (page 3.21 and 3.211) , and how fee is calculated when customers suspend their membership (page 3.12)

13.	Member Waiver form on page 3.212a, customers are able to click ‘Agree’.  And also add Print option on that page. The same as Member Policy form (page 3.212b). 

14.	On page 1.21, one swimmer only has one chance to change class once session starts. Before session starts, customers CANNOT click ‘Change Class’. After ‘Change Class’ succeed, customer CANNOT click ‘Change Class’ for that swimmer for that session. 

15.	On page 1.21, ‘Cancel Class’ policy is listed on Swimmer Agreement Waiver, refund fee is applied based on when class is cancelled. 







