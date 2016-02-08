
Meteor.publish("employeesTest", function(query, sort, employeesPerPage, currentPage) {
  Counts.publish(this, 'employeesTestCount', Meteor.users.find(query), { noReady: true });
  if(sort && employeesPerPage && currentPage) {
    let skip = (currentPage - 1) * employeesPerPage
    return Meteor.users.find(query, {sort: sort, limit: employeesPerPage, skip: skip})
  }
  else {
    return Meteor.users.find(query)
  }
})

Meteor.publish("employeeTest", function(_id) {
  return Meteor.users.find({_id: _id})
})
