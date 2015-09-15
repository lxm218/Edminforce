

Meteor.startup ->

  if Meteor.isServer

    if IH.Coll.ChatChannels.find().count() is 0 || IH.Coll.ChatStatus.find().count() is 0
      patient =
        username: "patient"
        password: "test"
        profile:
          name: "Patient"
          gender: "male"
          avatar: "/assets/examples/avatar"+String(Math.floor(Math.random()*9)+1)+".jpg"
      patientId = Accounts.createUser(patient)

      doctorList = [ "A", "B", "C", "D", "E", "F" ]
      _.each(doctorList, (s) ->
        doctor =
          username: "doctor_#{s}"
          password: "test"
          profile:
            firstName: "Doctor"
            lastName: "#{s}"
            gender: "male"
            avatar: "/assets/examples/avatar"+String(Math.floor(Math.random()*9)+1)+".jpg"
        doctorId = Accounts.createUser(doctor)

        initObj =
          PID: patientId
          DID: doctorId

        chid = IH.Coll.ChatChannels.insert(initObj)

        patientStatus =
          UID: patientId
          CHID: chid

        doctorStatus =
          UID: doctorId
          CHID: chid

        IH.Coll.ChatStatus.insert(patientStatus)
        IH.Coll.ChatStatus.insert(doctorStatus)
      )

      doctorId = Meteor.users.findOne({username: "doctor_A"})._id
      patientList = [ "A", "B", "C", "D", "E", "F" ]
      _.each(patientList, (s) ->
        patient =
          username: "patient_#{s}"
          password: "test"
          profile:
            firstName: "Patient"
            lastName: "#{s}"
            gender: "female"
            avatar: "/assets/examples/avatar"+String(Math.floor(Math.random()*9)+1)+".jpg"
        patientId = Accounts.createUser(patient)

        initObj =
          PID: patientId
          DID: doctorId

        chid = IH.Coll.ChatChannels.insert(initObj)

        patientStatus =
          UID: patientId
          CHID: chid

        doctorStatus =
          UID: doctorId
          CHID: chid

        IH.Coll.ChatStatus.insert(patientStatus)
        IH.Coll.ChatStatus.insert(doctorStatus)
      )

