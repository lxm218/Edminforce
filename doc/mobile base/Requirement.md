# Mobile Base requirement
 
## Program List

### Wireframe
[https://popapp.in/w/projects/5696be00171e40032f0b329b/mockups/5696be10d4590ff476c586e9](https://popapp.in/w/projects/5696be00171e40032f0b329b/mockups/5696be10d4590ff476c586e9)

[https://docs.google.com/presentation/d/1_uJwFzMBr2ONr373vETGgO8niD7W43Zz_JMDeCI2q88/edit](https://docs.google.com/presentation/d/1_uJwFzMBr2ONr373vETGgO8niD7W43Zz_JMDeCI2q88/edit)

### Description

List all the available Programs by this order: Begining, Intermediate, Advanced, Pre-AP/AP.
 
## Program List Detail

### Wireframe
[https://popapp.in/w/projects/5696be00171e40032f0b329b/mockups/5696be16b10aa1f72eb47918](https://popapp.in/w/projects/5696be00171e40032f0b329b/mockups/5696be16b10aa1f72eb47918)

### Description

1. **Detail:** description of this program (When user clicks program name, description shows below; once user clicks another program name, the previous program description closed up while showing the current program description clicked)
2. **Book trial class:** User can book a trial class of this program.  

   * It should be setted in admin, if a program set to trail true, then this button show, otherwise do need to show this button. For example, **Summer Camp** don't have Book trail
3. **Sample Art Works**: Don't need to implement this version. Show it(don't show in the first version), but cannot click
4. **Photo List**: don't need in the first version. 
 
## Book Trial Class

### Wireframe
[https://popapp.in/w/projects/5696be00171e40032f0b329b/mockups/5696be17f1de3a7b2cd488f0](https://popapp.in/w/projects/5696be00171e40032f0b329b/mockups/5696be17f1de3a7b2cd488f0)

### Description
1. As discuss with Lan, For this version we can show the avaiable classes in a list. This is an example:

  ![Calendar List](./calendar-list.jpg)

2. Just show the next 2 week avaialbe classes
3. Avaiable Classes condition
  
  * Class is not full. Default.
  * Class trial's max value not reach. Defualt value is 0 

  How to calculate:(as for calcolor school, trial max is 2 for each class which is included in class max. For example, class max is 10, trial max is 2. Currently, it has 9 registred students, this class is available for trial. If it has 10 registered student, this class is not available for trial.)
  
  `Register trial student number<= Class's Max student-Class's current students number`
   
   if `Class's trail Max student number` not 0,  `Register trial student number<=Class's trail Max student number`
   
   Then this day is available
  
  ***Note***
  
  * Case 1
  
       **Painting Beginning Class** max student number is 10, max trial student number is 0, currently registered student number is 9. 
       
       Now Mark book a trail for this class.
       
       After several day later, Kevin book this class, so after Kevin registered, this class's currently registered student number is 10, it should not be booked trail class, but Mark booked trail class before.
       
       For this conflict, need to solve by school manually.

## Students 

### Click menu - student
This page shows all the students under this account 

1. If this student has class in progress show all the class he/she is doing now
2. If this student has class in waitinglist show it/if this student has new registration for next session, show it. 
3. If this student doesn't have current class or new registration/waitlist, but this student has completed class, show the last completed class only.
4. If this student hasn't registered any class, show student, but the middle content is empty

Note: 
1. If student has multiple class, order by day(Mon - Sun)
2. If student has new registration and current class, list new registration first.

### Click a student (change link to middle column -class)
1. click current class, it goes to current tab which includes make up button, change class buttons, etc.
2. click new registration class, it goes to current tab which includes change class buttons, disabled all other buttons. 
3. Click completed class, it goes to history tab directly, disable 'current tab' for this student. 
4. History tab lists all classes this student every taken (see UI)

## Registration
### Click menu - registration
This page shows registration - select student(if more than one student under this account), select program, select day (show 7 days of week for selection, once user click one day, available time will show up under TIME part), select time. 

Note: During the first week of registration (starting registration start date + 7 days), registration page only shows current student's current class, disable all select options, users only needs to click book button. After the first week, registration is back to normal as described above. 

### Registration more - repeat registration process 

## Regarding Coupon
### add new coupon
1. admin user input coupon code, code itself cannot be edited after created. 
2. discount is either $ or % (Note: coupon discount is only applied to tuition, NOT applied to registration fee or make up class fee)
3. description - coupon description
4. Minimum transcation amount - if $$ in this field, coupon will only be applied when tuition meets this requirement. If blank, coupon can be applied to any tuition amount. 
5. For program, if it's "all", means coupon can be applied to all program. If it's other program, it mean coupon will be only applied that certain program. (for example, for beginning, it means this coupon can only be applied to beginning class)
6. Date, if dates are shown, it means coupon can only be applied during this specified dates. If no dates selected, it means there is no date limitation for this coupon usage. （note: can select more than one)
7. On day - if it's all, it means this coupon doesn't have days limitation. if it's Mon, it means which coupon can be only applied to classes on Mondays, etc. (note: can select more than one)
8. Max usage per account, if it's 1, means this coupon can only be used for this account once, etc. if it's blank, mean there's no limitation on this. 
9. valid for new customer, if it's checked, this coupon will only be applied to account who haven't booked any class before. (Note: this look at account not student. for example, one account has a student who has been here for a year, not it adds another student (new student) but they cannot use this coupon as they're not new account. 
5. 
