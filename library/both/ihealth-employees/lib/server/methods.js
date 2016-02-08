Meteor.methods({
  sendMassEmail(formData, query, saveTemplate){
    const employees = Meteor.users.find(query, {limit:1}).fetch();
    const subject = formData.subject;
    const message = formData.message;
    const from = "no-reply@ihealthlabs.com"
    const time = Date.now();
    commConn.call("sendMassEmail", subject, employees, from, message, time, saveTemplate, Meteor.absoluteUrl());
  }
})
