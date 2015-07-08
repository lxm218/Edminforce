Logics for Customer Mobile App
1.	Existing customers will receive emails for swim class registration.  Once they click URL in the email, it will link to page 0.0b. The system is able to identify which facility (Fremont or Dublin) this customer belongs to. 

2.	New customers or existing customers, if they type Calphin URL, it leads to page 0.0, after click either facility, it leads to page 0.0a.
Delete page 0.0. Once customer log in, the sysem will know their location. For new customer sign up, add 'field' for location. 


3.	After log in, only Fremont customers will see page 0.3 shows ‘Swim Class’ and ‘Membership’

4.	When new customer creates an account, he needs to fill out new swimmer evaluation form for each new swimmer added (for swim class only), then system will assign a level to this swimmer (page 1.12a)

The new swimmer evaluation form only contains major level (not sub-level). Customer can only choose one level, then the system will assign major level - sublevel 1 by default. 

5.	Swim class registration adapts the following priorities:

1st week – Email sent to all current swimmers. Current swimmers are able to register class with same time slot. (go to page 2.0a)
2nd week – Email sent to all current swimmers who haven’t registered during the 1st week. Current swimmers are able to register class with different time slot (go to page 2.1 instead of 2.0a) 
3rd week – Email sent to all current swimmers who haven’t registered and returning swimmers. They are able to register any available class. (go to page 2.1 instead of 2.0a) 
4th week – Registration opens to everyone including new customers.  They are able to register any available class. (go to page 2.1 instead of 2.0a) 

Use their current process: the first email sent to everyone one week before registration starts. The email includes information about registration schedule. The 2nd email sent out during the 3rd week as a reminder to everyone - is it possible that the 2nd email only sent to ones who haven’t registered for that session).

Customers will only be able to pick available day/time for class registration (page 2.1, 2.11, 2.111)

Exception:  returning or new swimmer whose sibling is a current swimmer, he has the same priority as his sibling when his sibling also register for that session.

6.	On page 2.2, system will apply discount to total amount when multiple swimmers are registered under one account. Class fee will be stored in database and $10 discount applied to each additional swimmer register. Or $10 discount applied to each additional lesson a swimmer register.
On check out page, add 'field- coupon code', currently, only one coupon code - new swimmer coupon, which is 'free class free'. If member registerd class, 10% discount is appled. discount can be combined but membership 10% discount always applied the last. 
Come to payment page, add function of choose stored credit card, apply club credit, use discount. (reference: amazon check-out)

7.	When customers click Pay Now on payment page, it gives them 5 minutes to finish transaction. If they click Pay in Store, it allows 24 hours to make payment to secure the spot. 
Allow 10 min for online payment.

8.	After class registration, only new swimmer will see ‘waiver form’. 
(page 2.3). All other swimmers don’t need to see this button.
For new customer, before payment page, they need to sign 'waiver form' - click agree button and add date on the form. After they agree, it jumps onto payment page. 

9.	See Calphin’s Swimmer_Agreement_Waiver, customers are able to click ‘Agree’ on page 2.33. Also add Print Waiver Form as option on the page. 

10.	Swimmer’s level is assigned by system that cannot edited by customers.

11.	On page 3.2, when customer enroll family membership, page 3.2a will be shown to add family member information.

12.	See Calphin’s Membership Payment Explanation including membership fee (page 3.21, 3.211), how to prorate, discount applied to different membership payment type. (page 3.21 and 3.211) , and how fee is calculated when customers suspend their membership (page 3.12)

13.	Member Waiver form on page 3.212a, customers are able to click ‘Agree’.  And also add Print option on that page. The same as Member Policy form (page 3.212b). 
Members waiver form appears before payment page.

14.	On page 1.21, one swimmer only has one chance to change class once session starts. Before session starts, customers CANNOT click ‘Change Class’. After ‘Change Class’ succeed, customer CANNOT click ‘Change Class’ for that swimmer for that session. 
Customers can change class as many time as they want BEFORE session starts. If tuition difference appears, payment page will be shown or credit page. AFTER session start, they are only allowed to change class ONCE, no fee charged. 

Changes to make: Customers can only change class before session starts as many times as they want as long as the class is available. The class change ends 2 days before session starts. Once session starts, all class changes need to be made by front desk (due to they want to track all changes and make notes)

15.	On page 1.21, ‘Cancel Class’ policy is listed on Swimmer Agreement Waiver, refund fee is applied based on when class is cancelled. 

3 days before session starts, customers can cancel with full refund. after session starts, only club credit (after prorated) is back to customers not cash. 

16. On page 1.21C, it only needs to list class time, appointment time (5 min before class or 5 min after class)











