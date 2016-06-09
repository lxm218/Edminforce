Meteor.methods({
  sendMassEmail(formData, query){
    const employees = IH.Coll.EmployeesTest.find(query, {fields: {email:1, name:1}, limit:1}).fetch();
    const subject = formData.subject;
    const from = "no-reply@ihealthlabs.com"
    const time = 0;
    employees.forEach((employee)=>{
      const employeeName = employee.name.split(" ");
      const message = formData.message;
      commConn.call("sendEmail",subject, "kris@paytagz.com", from, message, {firstName:employeeName[0], lastName:employeeName[1]}, time);
    })
  }
})
