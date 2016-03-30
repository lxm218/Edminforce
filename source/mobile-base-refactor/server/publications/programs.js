// publish all programs
Meteor.publish('programs', function() {
    return EdminForce.Collections.program.find();
});
