
# TODO: use global util functions for createdAt and updateAt autoValue


## ----------------------- iHealth user data schema ----------------------- ##

## user address schema

iHealth.schemas.address = new SimpleSchema

  street:
    type: String
    max: 100

  city:
    type: String
    max: 50

  state:
    type: String
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/

  zip:
    type: String
    regEx: /^[0-9]{5}$/


## Common user data, TODO: might move this to profile
iHealth.schemas.UserBasic = new SimpleSchema

  name:
    type: String
    optional: false
    editable: true
    editableBy: [ "admin", "doctor" ]

  tel:
    type: Number
    optional: false
    editable: true
    editableBy: [ "admin", "doctor", "patient" ]

  address:
    type: iHealth.schemas.address
    optional: true
    editable: true
    editableBy: [ "admin", "doctor", "patient" ]


## Doctor-specific user data
iHealth.schemas.UserDoctor = new SimpleSchema

  verified:
    type: Boolean
    optional: false
    editable: false
    editableBy: [ "admin" ]
    autoValue: ->
      # return true if user created by admin else false

  title:
    type: String
    optional: true
    editable: true
    editableBy: [ "admin", "doctor" ]

  specialties:
    type: [ String ]
    optional: true
    editable: true
    editableBy: [ "admin", "doctor" ]

  languages:
    type: [ String ]
    optional: true
    editable: true
    editableBy: [ "admin", "doctor" ]

  ## Aggregated from reviews
  rating:
    type: Number
    optional: true
    decimal: true
    editable: false
    editableBy: [ "admin" ]

  patients:
    type: Object
    optional: true
    editable: false
    editableBy: [ "admin", "doctor" ]

  ## TODO:
  ##  either use predefined patient groups
  ##  or let the doctor define her own

  "patients.regular"
    type: [ String ]
    optional: true

  "patients.vip"
    type: [ String ]
    optional: true


## Patient-specific user data
iHealth.schemas.UserPatient = new SimpleSchema

  DOB:
    type: Date
    optional: true
    editable: true

  height:
    type: Number
    decimal: true
    optional: true
    editable: true

#  heightUnit:

  weight:
    type: Number
    decimal: true
    optional: true
    editable: true

#  weightUnit:

  doctors:
    type: [ String ]
    optional: true
    editableBy: [ "admin", "doctor" ]

  ## iHealth device types. e.g. `BP`, `BG`, etc
  devices:
    type: Object
    optional: true
    blackbox: true


iHealth.schemas.iHealth = new SimpleSchema

  basic:
    type: iHealth.schemas.UserBasic
    optional: true

  doctor:
    type: iHealth.schemas.UserDoctor
    optional: true

  patient:
    type: iHealth.schemas.UserPatient
    optional: true


# Users schema extended from Meteor.users
UsersSchema = new SimpleSchema

  createdAt:
    type: Date
    optional: true

  updatedAt:
    type: Date
    optional: true

  username:
    type: String
    optional: true
#    unique: true

  emails:
    type: [ Object ]
    optional: true

  "emails.$.address":
    type: String
    regEx: SimpleSchema.RegEx.Email
    optional: true

  "emails.$.verified":
    type: Boolean
    optional: true

  roles:
    type: [ String ]
    allowedValues: [ "admin", "doctor", "patient" ]
    optional: true

  profile:
    type: Object
    optional: true
    blackbox: true

  ihealth:
    type: iHealth.schemas.iHealth
    optional: true

  services:
    type: Object
    optional: true
    blackbox: true


# TODO: remove attachSchema after done testing
Meteor.users.attachSchema(UsersSchema)

## ----------------------- Users permissions ----------------------- ##
# TODO:

