Meteor.startup(function() {
  if(!Meteor.users.findOne({username: 'test0'})) {
    let testCount = 0
    let password = '12345678'
    let groupList = ['Pre-Hypertension', 'Hypertension', 'Diabetes', 'Pre-diabetes', 'Obese', 'Diabetes w/ oral medicine', 'Diabetes w/ insulin injection']
    let profileList = [{
      dailyActivity: 'Sedentary'
    },{
      dailyActivity: 'Active'
    },{
      dailyActivity: 'Modest'
    }]
    let today = new Date()
    let year = 31556952000

    _.each(profileList, (profile) => {
      _.each(_.range(10), () => {
        profile = _.clone(profile)
        profile._id = Meteor.uuid()    
        profile.name = faker.name.findName()
        profile.height = Number((160 + 30 * Math.random()).toFixed(2))
        profile.weight = Number((100 + 150 * Math.random()).toFixed(2))
        profile.bmi = Number((5 + 35 * Math.random()).toFixed(2))
        profile.dob = faker.date.between(new Date(today - 65 * year), new Date(today - 21 * year))

        let group = groupList[Math.floor(Math.random() * 7)]
        let groups = [group]
        if(Math.random() > 0.7) {
          let groupList2 = _.without(groupList, group)
          groups.push(groupList2[Math.floor(Math.random() * 6)])
        }
        profile.groups = groups

        if(Math.random() > 0.5) {
          profile.gender = 'Male'
        }
        else {
          profile.gender = 'Female'
        }
        profile.roleTest = 'employee'

        let user = {
          username: ('test' + (testCount++)),
          email: faker.internet.email(),
          profile: profile,
          password: password
        }
        Accounts.createUser(user)
      })
    })
  }
})