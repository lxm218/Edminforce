
Meteor.methods({
    "program.getTrialClasses": function (programID, startDt, endDt) {
        // TODO: validate arguments
        return EdminForce.Registration.getAvailableTrialLessons(programID, startDt, endDt);
    },
});
