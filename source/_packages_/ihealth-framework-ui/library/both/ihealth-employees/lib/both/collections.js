
IH.Coll.EmployeesTest = new Mongo.Collection('employeesTest')

IH.Coll.EmployeesTest.allow({
  insert: function (userId, doc) {
    return true
  },
  update: function (userId, doc) {
    return true
  }
})

