

Meteor.startup ->

  if Meteor.isServer

    if IH.Coll.ChatChannels.find().count() is 0 || IH.Coll.ChatStatus.find().count() is 0
      try
        AppName = 'pilot'
        if AppName? and AppName is 'pilot'
          patientAvatar = 'f-patient4'
        else
          patientAvatar = 'avatar'+String(Math.floor(Math.random()*9)+1)

        patient =
          username: "patient"
          password: "test"
          profile:
            firstName: "Patient"
            lastName: "First"
            gender: "male"
            avatar: "/assets/examples/"+patientAvatar+".jpg"
            roles: "patient"

        patientObj = Meteor.users.findOne({username: patient.username});
        if patientObj
          patientId = patientObj._id
        else
          try
            patientId = Accounts.createUser(patient)
          catch err
            console.error('create patientId  ', patient , ' error: ', err);

        doctorList = [ "A", "B", "C", "D", "E", "F" ]

        _.each(doctorList, (s,i) ->
          if AppName? and AppName is 'pilot'
            if i%2 is 0
              gender = 'male'
              doctorAvatar = 'm-doctor'+(Math.floor(i/2)+1)
            else
              gender = 'female'
              doctorAvatar = 'f-doctor'+(Math.floor(i/2)+1)
          else
            gender = 'male'
            doctorAvatar = 'avatar'+String(Math.floor(Math.random()*9)+1)

          doctor =
            username: "doctor_#{s}"
            password: "test"
            profile:
              firstName: "Doctor"
              lastName: "#{s}"
              gender: gender
              avatar: "/assets/examples/"+doctorAvatar+".jpg"
              roles: "doctor"
          console.log 'creating fake doctor account ' + doctor.username  + ' for ' + AppName + ' app'

          doctorObj  = Meteor.users.findOne({username: doctor.username});
          # console.log 'doctorObj', doctorObj.username
          if doctorObj
            doctorId = doctorObj._id
          else
            try
              doctorId = Accounts.createUser(doctor)
            catch err
              console.error('create doctorId ', doctor, ' error: ', err);

          initObj =
            PID: patientId
            DID: doctorId

          # console.log('initObj ', initObj)
          chid = IH.Coll.ChatChannels.insert(initObj)

          patientStatus =
            UID: patientId
            CHID: chid

          doctorStatus =
            UID: doctorId
            CHID: chid

          console.log('insert', patientStatus, doctorStatus)
          IH.Coll.ChatStatus.insert(patientStatus)
          IH.Coll.ChatStatus.insert(doctorStatus)
        )

        doctorId = Meteor.users.findOne({username: "doctor_A"})._id
        patientList = [ "A", "B", "C", "D", "E", "F" ]
        _.each(patientList, (s,i) ->
          if AppName? and AppName is 'pilot'
            if i%2 is 0
              gender = 'male'
              patientAvatar = 'm-patient'+(Math.floor(i/2)+1)
            else
              gender = 'female'
              patientAvatar = 'f-patient'+(Math.floor(i/2)+1)
          else
            gender = 'female'
            doctorAvatar = 'avatar'+String(Math.floor(Math.random()*9)+1)
          patient =
            username: "patient_#{s}"
            password: "test"
            profile:
              firstName: "Patient"
              lastName: "#{s}"
              gender: gender
              avatar: "/assets/examples/"+patientAvatar+".jpg"
              roles: "patient"
          console.log 'creating fake patient account ' + JSON.stringify(patient) + ' ' + AppName

          patiendObj = Meteor.users.findOne({username: patient.username});
          if patientObj
            patientId = patientObj
          else
            try
              patientId = Accounts.createUser(patient)
            catch err
              console.error('create patientId ', patient , ' error: ', err);

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
      catch err
        console.log 'counldnt create fake data' #, err
