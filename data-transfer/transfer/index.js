'use strict';

let excel = require('excel');
let jsonfile = require('jsonfile');
let fs = require('fs');
let Q = require('q');
let _ = require('lodash');
let outPutFolder = "../update/private";
let errorOutputFolder = "errorOutput";
let crypto = require('crypto');

// Change this value to decide how many items want to repeat. If value <=1, means no repeat, this should be default value
let repeat_time_class= 1;
let repeat_time_student = 1;

let default_birthday = new Date("1970/1/1");

// Following

let admin = {
    "services": {
        "password": {//admin
            "bcrypt": "$2a$10$ASUX6d8i21L/qT4oU7kzrOD76uop2S/M5TbDkQXWwQWfYGV0DvkqW"
        }
    },
    "username": "admin@classforth.com",
    "emails": [
        {
            "address": "admin@classforth.com",
            "verified": false
        }
    ],
    '_id' : 'admin_classforth_com',
    "role": "admin"
};

let adminUser = {
    "_id": "admin_classforth_com",
    email : 'admin@classforth.com',
    password : 'admin',
    nickName : 'ClassForth Administrator',
    role : 'admin'
};

let spring_2016_session = {
    "_id": getSessionID("Spring 2016"),
    "name": "Spring 2016",
    "startDate": new Date("2016-04-05"),
    "endDate": new Date("2016-06-12"),
    "registrationStartDate": new Date("2016-03-14"),
    "registrationStatus": "Yes",
    "blockOutDay": [
        new Date("2016-05-23")
    ],
    "registrationEndDate": new Date("2016-06-11")
};


let teacherUser = {
    "services": {
        "password": {//admin
            "bcrypt": "$2a$10$ASUX6d8i21L/qT4oU7kzrOD76uop2S/M5TbDkQXWwQWfYGV0DvkqW"
        }
    },
    "username": "",
    "emails": [
        {
            "address": "",
            "verified": false
        }
    ],
    "role": "admin"
};

let tacherAdminUser = {
    "nickName": "",
    "email": "",
    "role": "teacher",
    "supervisor": "teacher",
    "title": "Administrator"
};

var user = {
    emails: [
        {
            address: "",
            verified: false
        }
    ],
    username: '',
    role: "user",

    //password
    services: {
        "password": {//classforth
            "bcrypt": "$2a$10$k13k26qALFBBapCEcvvuwOgQyc61fnqxnK0.tllZ2WUeCp3JS7x3i"
        }
    }
};

var customer = {
    "name": "",
    "email": "",
    "phone": "",
    "location": "Fremont",
    "status": "Active",
    "hasRegistrationFee" : false,
    "schoolCredit" : 0
};

var classStudent = {
  "accountID": "",
  "classID": "",
  "programID": "",
  "studentID": "",
  "status": "checkouted",
  "type": "register",
  "attendance": {}
};

var school = {
    "name": "Class Forth",
    "email": "contract@classforth.com"
};

var student = {
    "name": "",
    "accountID": "",
    "profile": {
        "gender": "Male",
        "birthday": default_birthday
    },
    "status": "Active"
};

var session = {
    "name": "",
    "startDate": new Date("2016-07-25T00:00:00"),
    "endDate": new Date("2016-08-12T21:00:00"),
    "registrationStartDate": new Date("2016-06-01T00:00:00"),
    "registrationStatus": "Yes",
    "blockOutDay": [],
    "registrationEndDate": new Date("2016-08-12T21:00:00")
};

var program = {
    name:"",
    description: '',
    availableTrial: true
};

var classData = {
    programID: "",
    sessionID: "",
    status: "Active",
    length: "",
    levels: [],
    teacher: "",
    teacherID: "",
    schedule: {
        days: [],
        time: ""
    },
    tuition: {
        type: "class",
        money: "100"
    },
    maxStudent: 9,
    minStudent: 0,
    trialStudent: 0,
    minAgeRequire: 0,
    maxAgeRequire: 100,
    makeupStudent: 0,
    makeupClassFee: 5,
    genderRequire: "All",
    makeup:{},
    trial:{},
    numberOfRegistered: 0
};


function am_pm_to_hours(time) {
    if(!time){
        console.error("time not exist");
        return null;
    }
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/([ampm]*)$/)[1];

    //console.log(AMPM);
    //console.log(hours);
    //console.log(minutes);

    // If AMPM exist
    if(AMPM){
        AMPM = AMPM.toLowerCase();
        if (AMPM == "pm" && hours < 12) hours = hours + 12;
        if (AMPM == "am" && hours == 12) hours = hours - 12;
    }

    var sHours = hours.toString();
    var sMinutes = minutes.toString();

    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;

    return (sHours +':'+sMinutes);
}

function hours_am_pm(time, split) {
    if(!split){
        split="";
    }
    if(!time){
        console.error("time not exist");
        return null;
    }
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/([ampm]*)$/)[1];
    if(AMPM){
        return time;
    }
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours>12){
        sHours = (hours-12).toString();
    }

    if (hours < 10||(hours-12)>0) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;

    if (hours < 12) {
        return sHours + ':' + sMinutes + split +'AM';
    } else {
        return sHours+ ':' + sMinutes + split +'PM';
    }
}

function transferDay(day){
    var dayMap = {
        "mon": "monday",
        "tue": "tuesday",
        "wed": "wednesday",
        "thu": "thursday",
        "fri": "friday",
        "sat": "saturday",
        "sun": "sunday"
    };
    if(day.toString().length == 3){
        day = dayMap[day.toLowerCase()];
    }

    return day.toLowerCase();
}

function getProgramID(programName){
    return _.snakeCase(programName);
}

function getSessionID(name){
    return _.snakeCase(name);
}

function getClassID(programName, sessionName, teacher, days, startTime){
    let id = programName+ "-"+sessionName+ "-"+teacher+ "-"+days.join()+ "-"+am_pm_to_hours(startTime);
    return _.snakeCase(id);
}

function getUserID(name){
    return _.snakeCase(name);
}

function getTeacherID(email){
    return _.snakeCase(email);
}

function getStudentID(userID, name){
    return _.snakeCase(userID+"_"+name);
}

function getPhoneNumber(phone){
    phone = phone.toString();
    return phone.replace(/[^\d]*/g, function(){return ''})
}

function getClassStudentID(classID, studentID){
    return _.snakeCase(classID+"_"+studentID);
}

function getRandomID() {
    return crypto.randomBytes(12).toString('hex');
}

function insertToArray(array, data){
    // Make sure don't have duplicate data

    let item = _.find(array, function(item){
        return item._id == data._id;
    });

    if(!item){
        array.push(data);
        item = data;
    }

    return item;
}

function updateNumberOfRegisteredInClass(){
  let classesData = jsonfile.readFileSync(outPutFolder+"/classes.json");
  let classStudents = jsonfile.readFileSync(outPutFolder+"/classStudents.json");

  let numberOfRegistered = {

  };

  for(let i =0; i<classStudents.length; i++){
    let classStudent = classStudents[i];
    let classID = 'classID';
    if(!numberOfRegistered[classStudent[classID]]){
      numberOfRegistered[classStudent[classID]] = 1;
    }else{
      numberOfRegistered[classStudent[classID]] = numberOfRegistered[classStudent[classID]]+1;
    }
  }

  for(let j =0; j<classesData.length; j++){
      classesData[j].numberOfRegistered = numberOfRegistered[classesData[j]['_id']]||0;
  }

  jsonfile.writeFileSync(outPutFolder+'/classes.json', classesData, {spaces: 2});

}

function cleanData(){
  // This array store all the datas that has error
  let error_classes = [];
  let error_classStudents = [];

  let classesData = jsonfile.readFileSync(outPutFolder+"/classes.json");
  let programsData = jsonfile.readFileSync(outPutFolder+"/programs.json");
  let sessionsData = jsonfile.readFileSync(outPutFolder+"/sessions.json");
  let classStudentsData = jsonfile.readFileSync(outPutFolder+"/classStudents.json");
  let accountsData = jsonfile.readFileSync(outPutFolder+"/customers.json");
  let studentsData = jsonfile.readFileSync(outPutFolder+"/students.json");



  // clean classes
  // following condition means this class isn't valid, need to remove to error_data
  // 1. programID, sessionID doesn't exist
  for(let i = 0; i< classesData.length; i++){
    let item = classesData[i];
    let programExist = _.find(programsData, {_id: item.programID});
    let sessionExist = _.find(sessionsData, {_id: item.sessionID});

    // this data should be removed
    if(!programExist || !sessionExist){
      let newItem = _.cloneDeep(item);
      newItem.ef_removed_reason = "programID or sessionID doesn't exist";
      error_classes.push(newItem);
      // remove this data
      classesData.splice(i, 1);
      i--;
    }
  }

  // clean classStudents
  // following condition means this classStudent isn't valid, need to remove to error_data
  // 1. programID, accountID, classID, studentID
  for(let i = 0; i< classStudentsData.length; i++){
    let item = classStudentsData[i];

    let programExist = _.find(programsData, {_id: item.programID});
    let accountExist = _.find(accountsData, {_id: item.accountID});
    let classExist = _.find(classesData, {_id: item.classID});
    let studentExist = _.find(studentsData, {_id: item.studentID});

    // this data should be removed
    if(!programExist || !accountExist || !classExist || !studentExist){
      let newItem = _.cloneDeep(item);
      newItem.ef_removed_reason = "programID, accountID, classID, studentID doesn't exist";
      error_classStudents.push(newItem);
      // remove this data
      classStudentsData.splice(i, 1);
      i--;
    }
  }

  jsonfile.writeFileSync(outPutFolder+'/classStudents.json', classStudentsData, {spaces: 2});
  jsonfile.writeFileSync(outPutFolder+'/classes.json', classesData, {spaces: 2});

  jsonfile.writeFileSync(errorOutputFolder+'/error-classes.json', error_classes, {spaces: 2});
  jsonfile.writeFileSync(errorOutputFolder+'/error-classStudents.json', error_classStudents, {spaces: 2});

}


// excel('data/cca/cca-class.xlsx', function (err, datas) {
// //excel('data/example-of-class.xlsx', function (err, datas) {
//     if (err) throw err;
//
//     // datas[0] is header, not used
//     datas = datas.splice(1);
//
//     let repeatDatas = [];
//     repeatDatas=repeatDatas.concat(datas);
//
//     // repeat data for presure test
//     for(let i=1;i < repeat_time_class; i++){
//         let cloneDatas = _.cloneDeep(datas);
//         let programName={
//
//         };
//
//         for(let j=0; j< cloneDatas.length; j++){
//             let data = cloneDatas[j];
//             if(!programName[_.kebabCase(data[0])]){
//                 programName[_.kebabCase(data[0])] = data[0]+i;
//                 data[0] = data[0]+i;
//             }else{
//                 data[0] = programName[_.kebabCase(data[0])];
//             }
//         }
//
//         repeatDatas = repeatDatas.concat(cloneDatas);
//     }
//
//     datas = repeatDatas;
//
//     let programs = [];
//     let classes = [];
//     let sessions = [];
//
//     insertToArray(sessions, spring_2016_session);
//
//     // the first item is title, so skip first item
//     for(let i=0; i<datas.length; i++){
//         let data = datas[i];
//
//         //console.log(data);
//
//         // Generate programs
//         let nProgram = _.cloneDeep(program);
//         nProgram.name = data[0];
//         nProgram._id = getProgramID(data[0]);
//         insertToArray(programs, nProgram);
//
//         // Generate Session
//         let nSession = _.cloneDeep(session);
//         nSession.name = data[1];
//         nSession._id = getSessionID(nSession.name);
//         insertToArray(sessions, nSession);
//
//         // Generate Class
//         let nClass = _.cloneDeep(classData);
//         nClass.programID = nProgram._id ;
//         nClass.sessionID = nSession._id;
//         nClass.status = "Active";
//         nClass.length = data[5];
//         nClass.teacher = data[2];
//         nClass.schedule.day = data[3];
//         nClass.schedule.time = hours_am_pm(data[4]);
//         nClass.tuition.money = programPrices[nProgram._id]||40;
//         nClass._id = getClassID(data[0], data[1], data[2], data[3], data[4]);
//         nClass.tuition.money = data[8];
//         insertToArray(classes, nClass);
//
//         // Add all class for Spring 2016
//         let spring2016Class = _.cloneDeep(nClass);
//         spring2016Class._id = getClassID(data[0], spring_2016_session.name, data[2], data[3], data[4]);
//         spring2016Class.sessionID = spring_2016_session._id;
//         insertToArray(classes, spring2016Class);
//
//     }
//
//     jsonfile.writeFileSync(outPutFolder+'/programs.json', programs, {spaces: 2});
//
//     jsonfile.writeFileSync(outPutFolder+'/classes.json', classes, {spaces: 2});
//
//     jsonfile.writeFileSync(outPutFolder+'/sessions.json', sessions, {spaces: 2});
//
//
//     console.log("===========================");
//     console.log("Add Data summary");
//     console.log("programs: ", programs.length);
//     console.log("classes: ", classes.length);
//     console.log("sessions: ", sessions.length);
//
//     excel('data/cca/cca-student.xlsx', function(err, datas){
//         if (err) throw err;
//
//         // datas[0] is header, not used
//         datas = datas.splice(2);
//
//         let repeatDatas = [];
//         repeatDatas=repeatDatas.concat(datas);
//         for(let i=1;i < repeat_time_student; i++){
//             let cloneDatas = _.cloneDeep(datas);
//             let programName={
//
//             };
//
//             let studentName={
//
//             };
//
//             let primaryEmail={
//
//             };
//
//             for(let j=0; j< cloneDatas.length; j++){
//                 let data = cloneDatas[j];
//                 if(!programName[_.kebabCase(data[9])]){
//                     programName[_.kebabCase(data[9])] = data[9]+i;
//                     data[9] = data[9]+i;
//                 }else{
//                     data[9] = programName[_.kebabCase(data[9])];
//                 }
//
//                 if(!studentName[_.kebabCase(data[1])]){
//                     studentName[_.kebabCase(data[1])] = data[1]+i;
//                     data[1] = data[1]+i;
//                 }else{
//                     data[1] = studentName[_.kebabCase(data[1])];
//                 }
//
//                 if(!primaryEmail[_.kebabCase(data[7])]){
//                     primaryEmail[_.kebabCase(data[7])] = data[7]+i;
//                     data[7] = i+data[7];
//                 }else{
//                     data[7] = primaryEmail[_.kebabCase(data[7])];
//                 }
//             }
//
//             repeatDatas = repeatDatas.concat(cloneDatas);
//         }
//
//         datas = repeatDatas;
//
//
//         let classStudents = [];
//         let accounts = [];
//         let customers = [];
//         let students = [];
//         let adminUsers = [];
//
//         // Add admin
//         accounts.push(admin);
//         adminUsers.push(adminUser);
//
//         for(var i=0; i<datas.length; i++){
//             let data = datas[i];
//
//             if(!data[7]){
//                 console.log("Canceled data, ", data);
//                 continue;
//             }
//
//             let nTeacherUser = _.cloneDeep(teacherUser);
//             nTeacherUser.emails[0].address = _.camelCase(data[11])+"@classforth.com";
//             nTeacherUser.username = nTeacherUser.emails[0].address;
//             nTeacherUser._id = getTeacherID(nTeacherUser.emails[0].address);
//             insertToArray(accounts, nTeacherUser);
//
//             let nTacherAdminUser = _.cloneDeep(tacherAdminUser);
//             nTacherAdminUser.nickName = data[11];
//             nTacherAdminUser.email = _.camelCase(data[11])+"@classforth.com";
//             nTacherAdminUser._id = getTeacherID(nTacherAdminUser.email );
//             insertToArray(adminUsers, nTacherAdminUser);
//
//             let nUser = _.cloneDeep(user);
//             nUser._id = getUserID(data[7]);
//             nUser.username = data[7];
//             nUser.username = nUser.username.toLowerCase();
//             nUser.emails[0].address = nUser.username;
//
//             insertToArray(accounts, nUser);
//
//             let nCustomer = _.cloneDeep(customer);
//             nCustomer._id = getUserID(data[7]);
//             nCustomer.name = data[7];
//             nCustomer.email = data[7];
//             nCustomer.phone = getPhoneNumber(data[4]);
//             nCustomer = insertToArray(customers, nCustomer);
//             nCustomer.schoolCredit += Number(data[19]);
//
//             let nStudent = _.cloneDeep(student);
//             nStudent._id = getStudentID(nUser._id, data[1]);
//             nStudent.name = data[1];
//             nStudent.accountID = nUser._id;
//             if(data[4]){
//                 nStudent.profile.gender = _.capitalize(data[4]);
//             }else{// Add default value
//                 nStudent.profile.gender = "Male";
//             }
//
//             if(data[3]){
//                 nStudent.profile.birthday = new Date(data[3]);
//             }else{// Add default value
//                 // This is the default value for student
//                 nStudent.profile.birthday = default_birthday;
//             }
//             insertToArray(students, nStudent);
//
//             let nClassStudent = _.cloneDeep(classStudent);
//             nClassStudent.accountID = nUser._id;
//             nClassStudent.classID = getClassID(data[9], data[10], data[11], data[12], data[13]);
//             nClassStudent.programID = getProgramID(data[9]);
//             nClassStudent.studentID = nStudent._id;
//             nClassStudent._id=getClassStudentID(nClassStudent.classID,nClassStudent.studentID);
//             insertToArray(classStudents, nClassStudent);
//
//         }
//
//         jsonfile.writeFileSync(outPutFolder+'/accounts.json', accounts, {spaces: 2});
//         jsonfile.writeFileSync(outPutFolder+'/adminUsers.json', adminUsers, {spaces: 2});
//         jsonfile.writeFileSync(outPutFolder+'/customers.json', customers, {spaces: 2});
//         jsonfile.writeFileSync(outPutFolder+'/students.json', students, {spaces: 2});
//         jsonfile.writeFileSync(outPutFolder+'/classStudents.json', classStudents, {spaces: 2});
//
//         console.log("accounts: ", accounts.length);
//         console.log("adminUsers: ", adminUsers.length);
//         console.log("customers: ", customers.length);
//         console.log("students: ", students.length);
//         console.log("classStudents: ", classStudents.length);
//         console.log("===========================");
//         updateNumberOfRegisteredInClass();
//         cleanData();
//
//     });
//
// });

let classLevels = [];
let classStudents = [];
let accounts = [];
let customers = [];
let students = [];
let adminUsers = [];

let programs = [];
let classes = [];
let sessions = [];

function processClassLevel(data) {
    // Level	sub-level	abbrev.	tuition per class	during	min age	max age	min student	max student
    let levelOrder = 1;
    for (let i=1; i<data.length; i++) {
        let row = data[i];
        let subLevels = row[1].split(',');
        if (subLevels.length == 0) {
            // no sub levels;
            let name = row[0];
            classLevels.push({
                name,
                alias: row[2],
                order: levelOrder++,
                majorName: row[0],
                majorAlias: row[2],
                subLevel: null,

                tuition : row[3],
                duration : row[4],
                minAge : row[5] || 0,
                maxAge : row[6] || 100,
                minStudent : row[7],
                maxStudent : row[8],
                _id: _.snakeCase(name)
            })
        }
        else {
            // add a classLevel for each sub level
            _.forEach(subLevels, function(level) {
                let name = row[0] + ' ' + level;
                classLevels.push({
                    name,
                    alias: row[2] + ' ' + level,
                    order: levelOrder++,
                    majorName: row[0],
                    majorAlias: row[2],
                    subLevel: level,

                    tuition : row[3],
                    duration : row[4],
                    minAge : row[5] || 0,
                    maxAge : row[6] || 100,
                    minStudent : row[7],
                    maxStudent : row[8],

                    _id: _.snakeCase(name)
                })
            })
        }
    }
}

function processTeachers(data) {
    for (let idx = 1; idx < data.length; idx++) {
        let row = data[idx];

        let nTeacherUser = _.cloneDeep(teacherUser)
        nTeacherUser.username = nTeacherUser.emails[0].address = row[1];
        nTeacherUser._id = getTeacherID(nTeacherUser.emails[0].address);
        insertToArray(accounts, nTeacherUser);

        let nTacherAdminUser = _.cloneDeep(tacherAdminUser);
        nTacherAdminUser.nickName = row[0];
        nTacherAdminUser.email = row[1];
        nTacherAdminUser._id = getTeacherID(nTacherAdminUser.email );
        insertToArray(adminUsers, nTacherAdminUser);
    }
}

function getClassLevels(levelStr) {
    let nameAndLevels = levelStr.split(' ');
    let levelIDs = [];
    if (nameAndLevels.length == 1) {
        // Sprinter/Racer
        let levels = nameAndLevels[0].split('/');

        _.forEach(classLevels, function(level) {
            if (_.find(levels, level.majorName))
                levelIDs.push(level._id);
        })
    }
    else
    if (nameAndLevels.length == 2) {
        // Glider 1/2/3
        let subLevels = nameAndLevels[1].split('/');
        _.forEach(subLevels, function(subLevel){
            let classLevel = _.find(classLevels, {name: nameAndLevels[0] + ' ' + subLevel});
            classLevel && levelIDs.push(classLevel._id);
        })
    }

    return levelIDs;
}

function getClassTeacherID(teacherName) {
    let teacher = _.find( adminUsers, {nickName: teacherName});
    if (!teacher) {
        console.log('Teacher not found:' + teacherName);
        return null;
    }
    return teacher._id;
}

function getClassDays(days) {
    return days.split(',')
}

function processClasses(rows) {
    // the first item is title, so skip first item
    for(let i=1; i<rows.length; i++){
        let data = rows[i];

        // Generate programs
        let nProgram = _.cloneDeep(program);
        nProgram.name = data[0];
        nProgram._id = getProgramID(data[0]);
        insertToArray(programs, nProgram);

        // Generate Session
        let nSession = _.cloneDeep(session);
        nSession.name = data[1];
        nSession._id = getSessionID(nSession.name);
        insertToArray(sessions, nSession);

        // Generate Class
        let nClass = _.cloneDeep(classData);
        nClass.levels = getClassLevels(data[2]);
        nClass.programID = nProgram._id ;
        nClass.sessionID = nSession._id;
        nClass.status = "Active";
        nClass.length = data[7];
        nClass.teacher = data[3];
        nClass.teacherID = getClassTeacherID(nClass.teacher);
        nClass.schedule.days = getClassDays(data[4]);
        nClass.schedule.time = hours_am_pm(data[5]);
        nClass.tuition.money = Number(data[9]);

        nClass._id = getClassID(nClass.programID, nClass.sessionID, nClass.teacher, nClass.schedule.days, nClass.schedule.time);
        insertToArray(classes, nClass);
    }
}

function getStudentLevel(level) {
    let classLevel = _.find(classLevels, {name: level});
    return classLevel ? classLevel._id : null;
}

function processStudents(rows) {
    for (let i=1; i<rows.length; i++) {
        let data = rows[i];

        let nUser = _.cloneDeep(user);
        nUser._id = getUserID(data[9]);
        nUser.username = data[9];
        nUser.username = nUser.username.toLowerCase();
        nUser.emails[0].address = nUser.username;

        insertToArray(accounts, nUser);

        let nCustomer = _.cloneDeep(customer);
        nCustomer._id = getUserID(data[9]);
        nCustomer.name = data[9];
        nCustomer.email = data[9];
        nCustomer.phone = getPhoneNumber(data[6]);
        nCustomer = insertToArray(customers, nCustomer);
        nCustomer.schoolCredit += Number(data[19]);

        let nStudent = _.cloneDeep(student);
        nStudent._id = getStudentID(nUser._id, data[1]);
        nStudent.name = data[1];
        nStudent.accountID = nUser._id;
        if(data[4]){
            nStudent.profile.gender = _.capitalize(data[4]);
        }else{// Add default value
            nStudent.profile.gender = "Male";
        }
        nStudent.level = getStudentLevel(data[3]);

        if(data[5]){
            nStudent.profile.birthday = new Date(data[5]);
        }else{// Add default value
            // This is the default value for student
            nStudent.profile.birthday = default_birthday;
        }
        insertToArray(students, nStudent);

        let nClassStudent = _.cloneDeep(classStudent);
        nClassStudent.accountID = nUser._id;
        nClassStudent.classID = getClassID(data[11], data[12], data[13], data[14].split(','), data[16]);
        nClassStudent.programID = getProgramID(data[11]);
        nClassStudent.studentID = nStudent._id;
        nClassStudent._id =  getClassStudentID(nClassStudent.classID,nClassStudent.studentID);//getRandomID();
        insertToArray(classStudents, nClassStudent);
    }
}

function writeJsonFiles() {
    jsonfile.writeFileSync(outPutFolder+'/programs.json', programs, {spaces: 2});
    jsonfile.writeFileSync(outPutFolder+'/classes.json', classes, {spaces: 2});
    jsonfile.writeFileSync(outPutFolder+'/sessions.json', sessions, {spaces: 2});

    jsonfile.writeFileSync(outPutFolder+'/classLevels.json', classLevels, {spaces: 2});
    jsonfile.writeFileSync(outPutFolder+'/accounts.json', accounts, {spaces: 2});
    jsonfile.writeFileSync(outPutFolder+'/adminUsers.json', adminUsers, {spaces: 2});
    jsonfile.writeFileSync(outPutFolder+'/customers.json', customers, {spaces: 2});
    jsonfile.writeFileSync(outPutFolder+'/students.json', students, {spaces: 2});
    jsonfile.writeFileSync(outPutFolder+'/classStudents.json', classStudents, {spaces: 2});

    console.log("accounts: ", accounts.length);
    console.log("adminUsers: ", adminUsers.length);
    console.log("customers: ", customers.length);
    console.log("students: ", students.length);
    console.log("classStudents: ", classStudents.length);
    console.log("===========================");

    cleanData();
    updateNumberOfRegisteredInClass();
}

// a helper function to parse excel file and return a Q promise
function excelParse(path) {
    var deferred = Q.defer();
    excel(path, function(err,data) {
        err ? deferred.reject(err) : deferred.resolve(data);
    })

    return deferred.promise;
}

// load classLevels
excelParse("data/calphi/classLevel.xlsx")
    .then(function(data){
        console.log('Processing class levels...');
        processClassLevel(data);

        // proceed to load teachers
        return excelParse("data/calphi/teacher.xlsx")
    })
    .then(function(data){
        console.log('Processing teacher data...');
        processTeachers(data);
        // proceed to load classes
        return excelParse("data/calphi/class.xlsx")
    })
    .then(function(data){
        console.log('Processing class data...');
        processClasses(data);
        // proceed to load students
        return excelParse("data/calphi/student.xlsx")
    })
    .then(function(data){
        console.log('Processing student data...');
        processStudents(data);

        console.log('Saving files');
        writeJsonFiles();

        console.log("Data import complete");
    })
    .catch(function(err){
        console.log(err);
    })

