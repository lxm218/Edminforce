
Meteor.methods({
    // get a list of trial classes for a program, within specified date range
    'program.getTrialClasses': function (programID, startDt, endDt) {
        check(programID, String);
        check([startDt,endDt] [Date]);
        return EdminForce.Registration.getAvailableTrialLessons(programID, startDt, endDt);
    },
    'program.getTrialClassesSchedule':function(programID){
        check(programID, String);
        return EdminForce.Registration.getAvailableTrialLessonsSchedule(programID);

    },
    
    // get a list of students who are eligible for trial class
    'program.getTrialStudents': function(classID) {
        check(classID, String);
        return EdminForce.Registration.getTrialStudents(this.userId, classID);
    },

    // book a trial class for a student
    'program.bookTrial': function(studentID, classID, className, lessonDate) {
        check([studentID,classID,className], [String]);
        check(lessonDate, Date);
        EdminForce.Registration.bookTrial(this.userId, studentID, classID, className, lessonDate);
    },

    // get a list of trial classes for a program, within specified date range
    'program.getClasses': function (studentID, programID, sessionID) {
        studentID && check(studentID, String);
        programID && check(programID, String);
        sessionID && check(sessionID, String);

        return EdminForce.Registration.getClasesForRegistration(this.userId,studentID, programID, sessionID);
    },

    'program.bookClasses': function(studentID, classIDs) {
        check(studentID, String);
        check(classIDs, [String]);
        
        return EdminForce.Registration.bookClasses(this.userId, studentID, classIDs);
    },

    'program.getMakeupClasses': function (studentID, classID, startDt, endDt) {
        check([studentID,classID], [String]);
        check([startDt,endDt] [Date]);
        return EdminForce.Registration.getAvailableMakeupLessons(this.userId, studentID, classID, startDt, endDt);
    },
    'program.getMakeupClassesSchedule':function(studentID, classID){
        check([studentID,classID], [String]);
        return EdminForce.Registration.getAvailableMakeupLessonsSchedule(this.userId, studentID, classID);

    },
    
    'program.bookMakeup': function(studentID, classID, lessonDate) {
        check(studentID, String);
        check(classID, String);
        check(lessonDate, Date);
        
        return EdminForce.Registration.bookMakeup(this.userId, studentID, classID, lessonDate);
    },
});
