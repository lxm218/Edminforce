
Meteor.methods({
    // get a list of trial classes for a program, within specified date range
    'program.getTrialClasses': function (programID, startDt, endDt) {
        // TODO: validate arguments
        return EdminForce.Registration.getAvailableTrialLessons(programID, startDt, endDt);
    },
    
    // get a list of students who are eligible for trial class
    'program.getTrialStudents': function(classID) {
        // TODO: validate arguments
        return EdminForce.Registration.getTrialStudents(this.userId, classID);
    },

    // book a trial class for a student
    'program.bookTrial': function(programID, studentID, classID, lessonDate) {
        Collections.classStudent.insert({
            accountID: this.userId,
            classID,
            studentID,
            programID,
            lessonDate,
            status: "checkouted",
            type: "trial",
            createTime: new Date()
        });
    }
});
