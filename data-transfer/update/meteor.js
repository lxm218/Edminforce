console.log("Meteor.isServer", Meteor.isServer);
if (Meteor.isServer) {

  console.log("Meteor.isServer");

  Meteor.startup(function () {

    let classCollection = Collections.class;
    let customer = Collections.Customer;
    let program = Collections.program;
    let classStudent = Collections.classStudent;
    let classLevel = Collections.classLevel;

    let session = Collections.session;
    let student = Collections.student;
    let adminUserCollection = new Mongo.Collection("EF-AdminUser");

    var accountsData = JSON.parse(Assets.getText('accounts.json'));
    let classesData = JSON.parse(Assets.getText('classes.json'));

    // convert weekday name from full name to short
    let weekDayMap = {
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun'
    }
    classesData.forEach ( (cls) => {
      if (cls.schedule && cls.schedule.days && cls.schedule.days.length > 0) {
        for (let i = 0; i<cls.schedule.days.length; i++) {
          if (weekDayMap[cls.schedule.days[i].toLowerCase()]) {
            cls.schedule.days[i] = weekDayMap[cls.schedule.days[i].toLowerCase()];
          }
        }
      }
    });

    let classStudentsData = JSON.parse(Assets.getText('classStudents.json'));
    let customersData = JSON.parse(Assets.getText('customers.json'));
    let programsData = JSON.parse(Assets.getText('programs.json'));
    let sessionsData = JSON.parse(Assets.getText('sessions.json'));
    let studentsData = JSON.parse(Assets.getText('students.json'));
    let adminUsers = JSON.parse(Assets.getText('adminUsers.json'));
    let classLevelData = JSON.parse(Assets.getText('classLevels.json'));

console.log('students:', studentsData.length);
console.log('accounts:', accountsData.length);
console.log('customers:', customersData.length);

    var delay = 0;

    function insertData(name, data, db, check, callback){
      console.log("[inserData], data: ", name);
      check = check || function(d){
            return d;
          };
      db.remove({});
      //console.log('---- '+ name + ' is start ----');
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

    function importDatas(){
      var F = {
        // program : function(){
        //   insertData('Program', programsData, program, null, F.classLevel);
        // },
        // classLevel: function(){
        //   insertData('ClassLevel', classLevelData, classLevel, null, F.session);
        // },
        // session : function(){
        //   insertData('Session', sessionsData, session, null, F.account);
        //   //insertData('Session', sessionsData, session, null, F.account);
        // },
        account : function(){
          insertData('Account', accountsData, Meteor.users, null, F.customer);
          //insertData('Account', accountsData, Meteor.users, null, F.adminuser);
        },
        customer : function(){
          insertData('Customer', customersData, customer, null, F.adminuser);
          customer.update({},{$set:{hasRegistrationFee:false}}, {multi:true});
        },
        adminuser : function(){
          insertData('AdminUser', adminUsers, adminUserCollection, null, F.student);
        },
        // classes : function(){
        //   insertData('Class', classesData, classCollection, null, F.student);
        //   //insertData('Class', classesData, classCollection, null, function(){});
        // },
        student : function(){
          insertData('Student', studentsData, student, function(item){
            if(!item.profile){
              item.profile = {};
            }
            if(!item.profile.birthday){
              item.profile.birthday = new Date(1900);
            }
            if(!item.profile.gender){
              item.profile.gender = 'Male';
            }

            if (!item || !item.profile || !item.profile.gender) {
              return null;
            }
            return item;
          }, function(){console.log('done')});
        },
        // classstudent : function(){
        //   insertData('ClassStudent', classStudentsData, classStudent, function(item){
        //     if (!item.accountID || !item.classID || !item.programID || !item.studentID) {
        //       return null;
        //     }
        //     return item;
        //   }, function(){
        //     //EdminForce.Registration.syncClassRegistrationCount();
        //     console.log('done');
        //   });
        // }
      };

      // clean up some extra tables
      //Collections.orders.remove({});
      //Collections.customerCoupon.remove({});
      //Collections.studentComment.remove({});
console.log('start import')
      F.account();
    }


    let url = process.env.MONGO_URL;
    console.log("mongo url: ", url);
    if(url){
      // It is on localhost, don't need to use slow mode
      if(url.search("localhost")!==-1||url.search("127.0.0.1")!==-1){
        delay = 0;
      }else{ // otherwise it is production mode
      }
      console.log('delay: ', delay);
      importDatas();
    }

  });
}
