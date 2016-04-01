
Meteor.methods({
    'program.getTrialClasses': function (programID, startDt, endDt) {
        // TODO: validate arguments
        return EdminForce.Registration.getAvailableTrialLessons(programID, startDt, endDt);
    },
    
    'program.getTrialStudents': function(classID) {
        // TODO: validate arguments
        return EdminForce.Registration.getTrialStudents(this.userId, classID);
    }
});
