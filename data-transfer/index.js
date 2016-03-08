'use strict';

let excel = require('excel');
let jsonfile = require('jsonfile');
let fs = require('fs');
let Q = require('q');
let _ = require('lodash');

var adminUser = {
    "email": "admin@classforth.com",
    "nickName": "ClassForth Administrator",
    "role": "admin",
    "school": {
        "name": "Test School",
        "email": "test@school.com",
        "phone": "5101234567",
        "address": "XXXX",
        "city": "Fremont",
        "state": "CA",
        "zipcode": "94537"
    },
    "title": "Administrator",
    "status": "active",
    "gender": "Male",
    "createTime": new Date(1456611427057),
    "updateTime": new Date(1456611427057)
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
        "password": {//calphin
            "bcrypt": "$2a$10$JxR7RAR6uHArlUx0CowVxO1nPUZIWSuS4Qxp/Cm9LNC73KzjQzjSm"
        }
    }
};

var customer = {
    "name": "",
    "email": "",
    "phone": "",
    "location": "Fremont",
    "status": "Active"
};

var classStudent = {
  "accountID": "",
  "classID": "",
  "programID": "",
  "studentID": "",
  "status": "checkouted",
  "type": "register"
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
        "birthday": ""
    },
    "status": "Active"
};

var session = {
    "name": "",
    "startDate": new Date("2016-03-31T21:00:00-0700"),
    "endDate": new Date("2016-06-29T21:00:00-0700"),
    "registrationStartDate": new Date("2016-01-31T21:00:00-0800"),
    "registrationStatus": "Yes",
    "blockOutDay": [
        new Date("2016-03-30T21:00:00-0700")
    ],
    "registrationEndDate": new Date("2016-06-29T21:00:00-0700"),
    "createTime": new Date(1456611846902),
    "updateTime": new Date(1456611846902)
};

var program = {
    name:"",
    description: '',
    availableTrial: true
};

var classData = {
    programID: "",
    sessionID: "",
    status: "",
    length: "",
    levels: [],
    teacher: "",

    schedule: {
        day: '',
        time: ""
    },

    tuition: {
        type: "",
        money: ""
    },
    maxStudent: 10,

    minStudent: 0,
    trialStudent: 0,

    minAgeRequire: 0,
    maxAgeRequire: 100,
    genderRequire: "All"
};


function am_pm_to_hours(time) {

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

function transferDay(day){
    var dayMap = {
        "mon": "monday",
        "tue": "tuesday",
        "wed": "wednesday",
        "thu": "thursday",
        "fri": "friday",
        "sat": "saturday",
        "sun": "sunday"
    }
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

function getClassID(programName, sessionName, teacher, day, startTime){
    let id = programName+ "-"+sessionName+ "-"+teacher+ "-"+transferDay(day)+ "-"+am_pm_to_hours(startTime);
    return _.snakeCase(id);
}

function getUserID(name){
    return _.snakeCase(name);
}

function getStudentID(userID, name){
    return _.snakeCase(userID+"_"+name);
}

function getPhoneNumber(phone){
    phone = phone.toString();
    return phone.replace(/[^\d]*/g, function(){return ''})
}

function insertToArray(array, data){
    // Make sure don't have duplicate data

    let item = _.find(array, function(item){
        return item._id == data._id;
    });

    if(!item){
        array.push(data);
    }
}

excel('data/cca/cca-class.xlsx', function (err, datas) {
//excel('data/example-of-class.xlsx', function (err, datas) {
    if (err) throw err;

    //console.log(datas);

    let programs = [];
    let classes = [];
    let sessions = [];

    // the first item is title, so skip first item
    for(let i=1; i<datas.length; i++){
        let data = datas[i];

        //console.log(data);

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
        nClass.programID = nProgram._id ;
        nClass.sessionID = nSession._id;
        nClass.status = "Active";
        nClass.length = data[5];
        nClass.teacher = data[2];
        nClass.schedule.day = data[3];
        nClass.schedule.time = data[4];
        nClass.tuition.type = "total";
        nClass.tuition.money = "100";
        nClass._id = getClassID(data[0], data[1], data[2], data[3], data[4]);
        insertToArray(classes, nClass);

    }

    jsonfile.writeFile('output/programs.json', programs, {spaces: 2}, function (err) {
        console.error(err);
    });

    jsonfile.writeFile('output/classes.json', classes, {spaces: 2}, function (err) {
        console.error(err);
    });

    jsonfile.writeFile('output/sessions.json', sessions, {spaces: 2}, function (err) {
        console.error(err);
    });

});

excel('data/cca/cca-student.xlsx', function(err, datas){
    if (err) throw err;

    let classStudents = [];
    let accounts = [];
    let customers = [];
    let students = [];

    for(let i=2; i<datas.length; i++){
        let data = datas[i];
        if(i ==2){
            console.log(data);
        }

        let nUser = _.cloneDeep(user);
        nUser._id = getUserID(data[7]);
        nUser.emails[0].address = data[7];
        nUser.username = data[7];
        insertToArray(accounts, nUser);

        let nCustomer = _.cloneDeep(customer);
        nCustomer._id = getUserID(data[7]);
        nCustomer.name = "";
        nCustomer.email = data[7];
        nCustomer.phone = getPhoneNumber(data[4]);
        insertToArray(customers, nCustomer);

        let nStudent = _.cloneDeep(student);
        nStudent._id = getStudentID(nUser._id, data[1]);
        nStudent.name = data[1];
        nStudent.accountID = nUser._id;
        nStudent.profile.gender = data[2];
        nStudent.profile.birthday = new Date(data[3]);
        insertToArray(students, nStudent);

    }

    jsonfile.writeFile('output/accounts.json', accounts, {spaces: 2}, function (err) {
        console.error(err);
    });
    jsonfile.writeFile('output/customers.json', customers, {spaces: 2}, function (err) {
        console.error(err);
    });
    jsonfile.writeFile('output/students.json', students, {spaces: 2}, function (err) {
        console.error(err);
    });


});
