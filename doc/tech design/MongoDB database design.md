## User Document
### Purpose
We maitain this form to use UserAccount Package to take care of log-in
### Fileds
This is specified by the package, two fields are of particular importance
* email: the email address to log in, it will also be the contact email address for the account holder
* usedId: the id will also be used to index the UserInfo Doc
* userName: the name of the user
> Question:
> Can we add more fields to

## UserInfo Document
### Purpose
This is used to record information for an account holder (parents for instance).
### Fields
// Contact Information
* id: used to specify a particular user, the id specified by UserAccount Package
* name: accound holder name, same to register page
* email: email address for contact, this is also the email to register an account
* phone: contact phone nubmer

// Alternative Contact
* atvName: name of the altative contact
* atvEmail: email address of alternative contact
* atvPhone: phone number of of alternative contact
* atvRelation: relationship to user
* atvContactFlag: boolean type to show whether we can contact the alternative contact
>Question: is atvRelation the relation to account holder or relation to swimmers?

// emergency contact
* emgName: name of the emergency contact
* emgPhone: phone nubmer of the emergency contact
* emgEmail: email address of the emergency contact
* emgRelation: relationship to the account holder
>Question:
 Do we need to keep both alternative contact and emergency contact?
 is the relation relative to account holder?

* password: password to log in  // this can also be stored
* location: dublin or fremont
* credit: credit that can be used to buy class
* payment: payment information, if we can store
* contactFlag: whethere we can contact the account holder
* swimmerId: an array of swimmer IDs affiliated to the account

## Swimmer Document
### Purpose
This will be used to record swimmer information for a single swimmer
### Fields
* swimmerId: specify a swimmer
* name: name of the swimmer
* userId: the user to whom the swimmer affiliate
* gender: gender of the swimmer
* birthaday: birthday of the swimmer
* level: the current level of the swimmer
* waiveForm: whether the swimmer has agreed to the waiver
* age: the age of the swimmer
* coachId: the coach with whom the swimmer learn swimming
* coachName: the name of the coach
* status: paid or not
* allergy: the allergy of the swimmer
* registerDate: the date when the swimmer register the class
* meetingDate: the date when the swimmer meets the coach

// Below is a duplicate to the class information, when there is a change on class, we will use method call to

// change class document
* classId: the id of the class
* classDate: date of the class
* className: name of the class

## Class Document
### Purpose
This will be used to record swimmer information for a single class
The class information is updated on backend. When a swimmer changes his class, we will use method call to change
the class document separetely
### Fields
* classId: to specify a class
* coachId: the coach who teaches the class
* className: the name of the class
* date: the date of the class
* level: the lebel of the class
* swimmerIds: the registered list of students

## Coach Document
### Pupose
Recoord Information for Coach
### Fields
* coachId:
* coachName:

// wait for the design on administration part

