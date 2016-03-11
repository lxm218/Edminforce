if (Meteor.isServer) {


  Meteor.startup(function () {

    let classCollection = EdminForce.Collections.class;
    let customer = EdminForce.Collections.Customer;
    let program = EdminForce.Collections.program;
    let classStudent = EdminForce.Collections.classStudent;

    let session = EdminForce.Collections.session;
    let student = EdminForce.Collections.student;
    let adminUserCollection = new Mongo.Collection("EF-AdminUser");

    var accountsData = JSON.parse(Assets.getText('accounts.json'));
    let classesData = JSON.parse(Assets.getText('classes.json'));
    let classStudentsData = JSON.parse(Assets.getText('classStudents.json'));
    let customersData = JSON.parse(Assets.getText('customers.json'));
    let programsData = JSON.parse(Assets.getText('programs.json'));
    let sessionsData = JSON.parse(Assets.getText('sessions.json'));
    let studentsData = JSON.parse(Assets.getText('students.json'));
    let adminUsers = JSON.parse(Assets.getText('adminUsers.json'));

    var delay = 500;

    function insertData(name, data, db, check, callback){
      check = check || function(d){
            return d;
          };
      db.remove({});
      console.log('---- '+ name + ' is start ----');
      var len = data.length;

      var loop = function(x){
        if(x<len){
          var td = check(data[x]);

          if(td){
            console.log(td);
            db.insert(td);
          }

          Meteor.setTimeout(function(){
            var t = x+1;
            loop(t);
          }, delay);

        }
        else{
          callback();
        }
      };

      loop(0);
    }

    function importToProduction(){
      var F = {
        program : function(){
          insertData('Program', programsData, program, null, F.session);
        },
        session : function(){
          insertData('Session', sessionsData, session, null, F.account);
        },
        account : function(){
          insertData('Account', accountsData, Meteor.users, null, F.customer);
        },
        customer : function(){
          insertData('Customer', customersData, customer, null, F.adminuser);
        },
        adminuser : function(){
          insertData('AdminUser', adminUsers, adminUserCollection, null, F.classes);
        },
        classes : function(){
          insertData('Class', classesData, classCollection, null, F.student);
        },
        student : function(){
          insertData('Student', studentsData, student, function(item){
            if(!item.profile){
              item.profile = {};
            }
            if(!item.profile.birthday){
              item.profile.birthday = new Date(1970);
            }
            if(!item.profile.gender){
              item.profile.gender = 'Male';
            }

            if (!item || !item.profile || !item.profile.gender) {
              return null;
            }
            return item;
          }, F.classstudent);
        },
        classstudent : function(){
          insertData('ClassStudent', classStudentsData, classStudent, function(item){
            if (!item.accountID || !item.classID || !item.programID || !item.studentID) {
              return null;
            }
            return item;
          }, function(){});
        }
      };

      F.program();
    }

    function importToLocal() {
      program.remove({});
      programsData.forEach(function (item, i, a) {
        //console.log(item);
        program.insert(item);
      });

      Meteor.users.remove({});
      accountsData.forEach(function (item, i, a) {
        //console.log(item);
        Meteor.users.insert(item);
      });

      customer.remove({});
      customersData.forEach(function (item, i, a) {
        customer.insert(item);
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
        //if (!item || !item.profile || !item.profile.gender || !item.profile.birthday) {
        if (!item || !item.profile || !item.profile.gender) {

        } else {
          student.insert(item);
        }
      });

      classCollection.remove({});
      classesData.forEach(function (item, i, a) {
        classCollection.insert(item);
      });

      adminUserCollection.remove({});
      adminUsers.forEach(function (item, i, a) {
        adminUserCollection.insert(item);
      });

    }

    let url = process.env.MONGO_URL||"";
    if(url){
      // It is on localhost, don't need to use slow mode
      if(url.search("localhost")!==-1||url.search("127.0.0.1")!==-1){
        importToLocal();
      }else{ // otherwise it is production mode
        importToProduction();
      }
    }

  });
}