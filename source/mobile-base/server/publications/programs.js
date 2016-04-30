// publish all programs
Meteor.publish('programs', function() {
    return Collections.program.find({},{sort:{displayOrder:1}});
});
