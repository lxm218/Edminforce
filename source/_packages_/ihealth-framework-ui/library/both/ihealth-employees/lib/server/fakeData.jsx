Meteor.startup(function() {
  if(!IH.Coll.EmployeesTest.findOne()) {

    let groupList = ['Pre-Hypertension', 'Hypertension', 'Diabetes', 'Pre-diabetes', 'Obese', 'Diabetes w/ oral medicine', 'Diabetes w/ insulin injection']
    let employeeList = [{
      dailyActivity: 'Sedentary'
    },{
      dailyActivity: 'Active'
    },{
      dailyActivity: 'Modest'
    }]

    _.each(employeeList, (employee) => {
      _.each(_.range(50), () => {
        employee = _.clone(employee)
        employee._id = Meteor.uuid()    
        employee.name = faker.name.findName()
        employee.email = faker.internet.email()
        employee.height = Number((160 + 30 * Math.random()).toFixed(2))
        employee.weight = Number((100 + 150 * Math.random()).toFixed(2))
        employee.bmi = Number((5 + 35 * Math.random()).toFixed(2))
        employee.age = 20 + parseInt(30 * Math.random())

        let group = groupList[Math.floor(Math.random() * 7)]
        let groups = [group]
        if(Math.random() > 0.7) {
          let groupList2 = _.without(groupList, group)
          groups.push(groupList2[Math.floor(Math.random() * 6)])
        }
        employee.groups = groups

        if(Math.random() > 0.5) {
          employee.gender = 'Male'
        }
        else {
          employee.gender = 'Female'
        }

        IH.Coll.EmployeesTest.insert(employee)
      })
    })
  }
})