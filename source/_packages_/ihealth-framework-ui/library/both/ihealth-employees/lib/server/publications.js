
Meteor.publish("employeesTest", function(query, sort, employeesPerPage, currentPage) {
  Counts.publish(this, 'employeesTestCount', IH.Coll.EmployeesTest.find(query), { noReady: true });
  if(sort && employeesPerPage && currentPage) {
    let skip = (currentPage - 1) * employeesPerPage
    return IH.Coll.EmployeesTest.find(query, {sort: sort, limit: employeesPerPage, skip: skip})
  }
  else {
    return IH.Coll.EmployeesTest.find(query)
  }
})

Meteor.publish("employeeTest", function(_id) {
  return IH.Coll.EmployeesTest.find({_id: _id})
})
