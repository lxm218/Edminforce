## Overview
This document describes the details of each collection. Basically, we need following collections we:

* users: mainly for login information, Meteor user and account framework will create this collection by default.
* accounts: normal account information, embed swimmers information 
* swimmers: normal swimmer information, embed class information. Easy for querying, ranking and other swimmer related DB operations 
* classes: swim class information, refers to swimmers collection, refers to coach information., Easy for DB CRUD operations from admin side.

## "users" collection
Those accounts who needs login to the system with password should create user login information in this collection.
So far normal account users and coaches need to create user login information in this collection.

NOTE: No separated "coaches" collection since it can be covered in this "users" collection

### "user" document
```javascript
{
  _id: "bbca5d6a-2156-41c4-89da-0329e8c99a4f",  // Meteor.userId()
  username: "cool_kid_13", // unique name
  emails: [
    // each email address can only belong to one user.
    { address: "cool@example.com", verified: true },
    { address: "another@different.com", verified: false }
  ],
  createdAt: Wed Aug 21 2013 15:16:52 GMT-0700 (PDT),
  profile: {
    // The profile is writable by the user by default.
    name: "Joe Schmoe"
  },
  services: {
    facebook: {
      id: "709050", // facebook id
      accessToken: "AAACCgdX7G2...AbV9AZDZD"
    },
    resume: {
      loginTokens: [
        { token: "97e8c205-c7e4-47c9-9bea-8e2ccc0694cd",
          when: 1349761684048 }
      ]
    }
  }
}
```

Detail descriptions can be found in [Meteor doc](http://docs.meteor.com/#/full/meteor_users)

We are not intent to modify the structure of this document and but put more information in "accounts" collection.

Every account or coach will create a document in "users" collection when they sign up. The rest part of our App will use Meteor.userId() to refer to this login information.

## "accounts" collection
Every new user (not coach) will create a new document in this collection. Everything related an account will put in this collection. Each account embeds a "swimmers" array, which matches swimmers information in "swimmers" collection.

This is used to record information for an account holder (parents for instance).

### "account" document
```javascript
{
    _id: "bbca5d6a-2156-41c4-89da-0329e8c99a4f",  // Meteor.userId()
    name: "Bryan Wu",
    location: "Dublin" or "Fremont",
    credits: 200.00, // Credit that can be used to buy class
    paymentInfo: { // Payment information for online payment. TODO
    },
    contactInfo: { // Account contact information
        email: "cooloney@gmail.com", // The email to sign up an account in "users" collection
        phone: "+1 555 555 5555",
        address: "Somewhere, San Jose, CA 95134",
        allowContact: true,
    },
    alterContact: { // Alternative contact information 
        name: "Mike Zhang"
        email: "mikezhang@gmail.com",
        phone: "+1 666 666 6666",
        address: "Somewhere, San Jose, CA 95134",
        relation: "Friend",
        allowContact: true,
    },
    emergencyContact: { // Emergency contact information
        name: "Cindy Wu"
        email: "cindywu@gmail.com",
        phone: "+1 888 888 8888",
        address: "Somewhere, San Jose, CA 95134",
        relation: "Sister",
    },
    swimmers: [ // Swimers array contains all the information about swimmers
        {
           // please refers to "swimmer" document
        },
    ],
}
```

* Question 1:
Do we need to keep both alternative contact and emergency contact? is the relation relative to account holder?
* Question 2:
Should locatoin for one account or for every swimmer? All the swimmer in one account is in same location?

## "swimmers" collection
This collection holds all the information of swimmers. Each "swimmer" document embeds a "class" document.

### "swimmer" document
```javascript
{
    _id: "bbca5d6a-2156-41c4-89da-0329e2deb9a4", // created when insert a new swimmer into "swimmers" collection
    name: "Jessica Wang",
    accountId: "bbca5d6a-2156-41c4-89da-0329e8c99a4f", // match account's user ID
    birthday: Wed Aug 21 2013 15:16:52 GMT-0700 (PDT), 
    gender: "Female",
    age: 2,
    allergy: "Peanuts, ...",
    level: 1,
    waiveFormAgreed: true,
    paymentStatus: true,
    meetingDate: Wed Aug 21 2015 13:00:00 GMT-0700 (PDT), // meeting with coach
    registerAt: Wed Aug 21 2013 15:16:52 GMT-0700 (PDT), 
    class: {
        ..., // please refer to "class" document,
    },
}
```

*Question:
 Each swimmer can only have one class, right?

## "classes" collection
This collection is easily managed by admins and easy to generate classes calendar for class registration.

### "class" document
```javascript
{
    _id: "bbca5d6a-2156-41c4-89da-0329e2deb9a4", // created when insert a new "class" document into "classes" collection
    name: "Level 1 freestyle swim class",
    startDate: Wed Aug 21 2015 13:00:00 GMT-0700 (PDT),
    endDate: Wed Aug 21 2015 13:00:00 GMT-0700 (PDT),
    duration: "2 hours",
    frequency: "Every Monday",
    level: 1,
    type: "Freestyle",
    coachId: "bbca5d6a-2156-41c4-89da-0329e888efc5", // match coach's user ID
    coachName: "Steve Guo",
    students: [ // students array just store "swimmer" ID
        { _id: ""},
        ...,
    ],
}
```

*Question:
 How to handle the class date in a good way? Any calendar package?