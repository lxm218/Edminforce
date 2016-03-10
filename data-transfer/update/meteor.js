if (Meteor.isServer) {


  Meteor.startup(function () {

    let classCollection = EdminForce.Collections.class;
    let customer = EdminForce.Collections.Customer;
    let program = EdminForce.Collections.program;
    let classStudent = EdminForce.Collections.classStudent;

    let session = EdminForce.Collections.session;
    let student = EdminForce.Collections.student;


    var accountsData = JSON.parse(Assets.getText('accounts.json'));
    let classesData = JSON.parse(Assets.getText('classes.json'));
    let classStudentsData = JSON.parse(Assets.getText('classStudents.json'));
    let customersData = JSON.parse(Assets.getText('customers.json'));
    let programsData = JSON.parse(Assets.getText('programs.json'));
    let sessionsData = JSON.parse(Assets.getText('sessions.json'));
    let studentsData = JSON.parse(Assets.getText('students.json'));


    function resetData() {

      Meteor.users.remove({});
      accountsData.forEach(function (item, i, a) {
        Meteor.users.insert(item);
      });

      customer.remove({});
      customersData.forEach(function (item, i, a) {
        customer.insert(item);
      });

      program.remove({});
      programsData.forEach(function (item, i, a) {
        program.insert(item);
      });

      classStudent.remove({});
      classStudentsData.forEach(function (item, i, a) {
        if (!item.accountID || !item.classID || !item.programID || !item.studentID) {

        } else {
          classStudent.insert(item);
        }
      });


      session.remove({});
      sessionsData.forEach(function (item, i, a) {
        session.insert(item);
      });

      student.remove({});
      studentsData.forEach(function (item, i, a) {
        if (!item || !item.profile || !item.profile.gender || !item.profile.birthday) {

        } else {
          student.insert(item);
        }
      });

      classCollection.remove({});
      classesData.forEach(function (item, i, a) {
        classCollection.insert(item);
      });

      let adminCustomer = {
        "name": "admin@classforth.com",
        "email": "admin@classforth.com",
        "phone": "",
        "status": "Active",
        "nickName" : 'ClassForth Administrator',
        "_id": "admin_classforth_com"
      }

      let data = {
        "_id": "admin_classforth_com",
        email : 'admin@classforth.com',
        password : 'admin',
        nickName : 'ClassForth Administrator',
        role : 'admin'
      };

      let adminUserCollection = new Mongo.Collection("EF-AdminUser");
      adminUserCollection.insert(data, function(err){
        if(err){
          console.error(err);
        }
      })


    }

    resetData();

  });
}