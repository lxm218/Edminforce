

Meteor.startup ->

  if Meteor.isServer

    patient =
      username: "patient"
      password: "test"
      profile:
        name: "Patient"
        gender: "male"
        avatar: "/assets/examples/avatar"+String(Math.floor(Math.random()*9)+1)+".jpg"

    doctor =
      username: "doctor"
      password: "test"
      profile:
        name: "Doctor"
        gender: "male"
        avatar: "/assets/examples/avatar"+String(Math.floor(Math.random()*9)+1)+".jpg"

    if Meteor.users.find().count() is 0
      patientId = Accounts.createUser(patient)
      doctorId = Accounts.createUser(doctor)

    if IH.Coll.ChatChannels.find().count() is 0
      initObj =
        PID: patientId
        DID: doctorId

      chid = IH.Coll.ChatChannels.insert(initObj)


    if IH.Coll.ChatStatus.find().count() is 0
      status =
        UID: patientId
        CHID: chid

      IH.Coll.ChatStatus.insert(status)


  if Meteor.isClient
    Meteor.loginWithPassword("patient", "test")

