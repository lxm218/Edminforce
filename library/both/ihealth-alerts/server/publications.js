Meteor.publish("alertsTest", function(query, sort, itemsPerPage, currentPage) {
  Counts.publish(this, 'alertsTestCount', IH.Coll.AlertsTest.find(query), { noReady: true });
  if(sort && itemsPerPage && currentPage) {
    let skip = (currentPage - 1) * itemsPerPage
    return IH.Coll.AlertsTest.find(query, {sort: sort, limit: itemsPerPage, skip: skip})
  }
  else {
    return IH.Coll.AlertsTest.find(query)
  }
})