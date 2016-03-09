if (Meteor.isServer) {


  Meteor.startup(function () {

    let adminUser = {
      "_id": "admin_classforth.com",
      emails: [
        {
          address: "admin@classforth.com",
          verified: false
        }
      ],
      username: 'admin@classforth.com',
      role: "admin",

      //password
      services: {
        "password": {//admin
          "bcrypt": "$2a$10$ASUX6d8i21L/qT4oU7kzrOD76uop2S/M5TbDkQXWwQWfYGV0DvkqW"
        }
      }
    };

    let adminCustomer = {
      "name": "admin@classforth.com",
      "email": "admin@classforth.com",
      "phone": "",
      "status": "Active",
      "_id": "admin_classforth.com"
    };

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

      Meteor.users.insert(adminUser);

      customer.remove({});
      customersData.forEach(function (item, i, a) {
        customer.insert(item);
      });

      customer.insert(adminCustomer);

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


    }

    resetData();

  });
}