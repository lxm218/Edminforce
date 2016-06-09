
IH.Coll.Alerts = new Meteor.Collection "alerts"

IH.Schema.DoctorAlert = new SimpleSchema(
  type:
    type:String
    label:"doctor alert type"
    allowedValues: [
      "sl", #sleep
      "ac", #activity
      "wt", #weight
      "bo", #blood oxygen
      "bg", #blood glucoses
      "bp"  #blood pressure
    ]
  MDateUTC:
    type:Date
    label:"utc time of measure"
  action:
    type: String
    label: "doctor action to choose"
    allowedValues: [
      "pending", # waiting for sending
      "mark", # important alert, no deleting auto
      "notified", # alert sent
      "closed"  # alert closed
    ]
)

IH.Schema.PatientReminder = new SimpleSchema(
  type:
    type:String
    label:"patient reminder type"
    allowedValues: [ "measure", "takePills", "sport"]
  content:
    type: String
    label: "patient reminder content" # e.g.'please measure blood pressure now'
)

IH.Schema.Alerts = new SimpleSchema (

  PID:
    type: String
    label: "patient _id"

  DID:
    type: String
    label: "doctor _id"

  DA:
    type: IH.Schema.DoctorAlert
    label: "doctor alert"
    optional:true

  PR:
    type: IH.Schema.PatientReminder
    label: "patient reminder"
    optional:true

  createdAt:
    type: Date
    label: "patient reminder sent time"
    autoValue: ->
      if @isInsert
        new Date
      else
        @unset()
  )

IH.Coll.Alerts.attachSchema IH.Schema.Alerts