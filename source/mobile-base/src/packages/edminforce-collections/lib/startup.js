// when meteor startup, create all collections
Meteor.startup(function () {
    // Initial ProgramCollection
    EdminForce.Collections.program = new ProgramCollection("EF-Program");
});