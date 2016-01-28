EdminForce Common Data Design

1 AdminUser （for admin web app only）

	userID  
	password
	userProfile
		nickName
		email
		title 单独设定
		group 
		phone
		position
		image
		department
		gender
		birthday
		employmentDate
		...
	
	status
	type 
	createTime
	updateTime

2 Account
	userName login，(for now use email as login ID)
	password
	profile
		nickName
		image
		email
		phone
		emergencyContact
		emergencyPhone
		alternativeContact
		alternativePhone
		…

	status
	shoppingCarID 关联的购物车表
	money (balance)	
	createTime
	updateTime

3 Student
	accountID associated with account
	name
	email
	image
	phone
	location
	emergencyPhone
	emergencyContact
	alternativePhone
	alternativeContact
	birthday
	gender
	status
	skillLevel
	description 类似于自我简介
	createTime
	updateTime
	
4 StudentComment 
	studentID
	fromUser 
		ID
		name
		image
	
	message
	createTime

5 Class
	name
	status
	level
	teacher/coach/instructor (maybe more than one)
	schedule
	frequency
	tuition
	minAge
	maxAge
	maxStudent
	genderRequire [all, boy, girl]
	customerType 
	startTime
	endTime
	createTime

6 ClassStudent 存class的student信息
	classID
	className
	studentID
	studentName
	level 目前级别
	process 目前进度
	startTime
	createTime 
	… 
	
7 CustomerOrder 就是现在的Request表
	accountID
	studentID
	classID
	type [register, cancel …]
	status [complete, pending, waitPay …]
	paymentType
	paymentTime
	createTime
	updateTime
 
Appendix


Comparison between Calphin’s  database files/tables vs. Edmin Force DB


1.	Program
-	programID
-	program name
-	program description
2.	Class template (no)
3.	Class
-	classID
-	class name
-	level
-	teacherID
-	teacher name
-	frequency
-	tuition
-	class time
-	start_date
-	end_date
-	max_student
-	customer_type
4.	Session
–	sessionID
–	session name
–	start_date
–	end_date
–	registration_start_date
–	registration_status
5.	Custom Session Dates (no)
6.	No class dates (no)
7.	Age Group (no) 
8.	Charge (no, tuition in class)
9.	Customer order (registration)
-	transactionID
-	accountID
-	studentID
-	classID
-	payment_type
-	payment_amount
-	payment_time_stamp
-	checkout_type
-	status
-	
10.	 Enrollment (no, reference to customer order)
11.	 Additional charge (no)
12.	Membership (no)
13.	Event sign up (no)
14.	Event participant (no)
15.	Customer (account)
-	accountID
-	accountName
-	email
-	phone
-	emergency contact
-	emergency phone
-	alternative contact
-	alternative phone
-	login ID
-	password
16.	Customer contact (refer to customer section)
17.	Customer participant (Students)
-	studentID
-	student name
-	gender
-	birthday
-	skill_level
-	comments
-	first_registration_date
18.	Customer payment (no)
19.	Customer account summary (no)
20.	 Policy Acceptance (no)
21.	Customer Problem (no)
22.	 Store credit  (need to add)
23.	 Participant skill level (no)
24.	Skill level Group 
25.	Skill Level （double check)
-	ID
-	level name
-	level abbre.
-	level descript
26.	 Skill item set (no)
27.	 Test result code set (need to add-not common need)
-	ID
-	Result code
-	Result name
-	Created by
28.	Activity Type (no)
29.	 Receivable (see order)
30.	 Payable (see order)
31.	Payout (see order)
32.	 Cancel request (Customer request)
-	ID
-	Request_type
-	Descript
-	Date
33.	Cancel item (see customer request)
34.	Problem Resolution (no)
35.	Discount Schedule (need to add)
-	discountID
-	discount name
-	discount rate
-	date
36.	Billing schedule (no)
37.	 Enrollment request (no)
38.	 Participant attendance (no)
39.	Leave request (see customer request)
40.	Pass-out item (no)
41.	Pass-out log (no)
42.	Teach station (no)
43.	Preferred enrollment profile (no)
44.	Employee 
-	employeeID
-	employee_name
-	position
-	employment_date
-	email
-	phone
-	gender
-	birthday
-	type
-	status
-	department
45.	Employee Availability (no)
46.	Employee work schedule (no)
47.	 Work shift schedule (no)
48.	 Teaching skill schedule (no)
49.	 employee daily attendance (no)
50.	Employee punch time (no)
51.	Employee Lead (no)
52.	Employee performance (no)
53.	 Facility (no)









