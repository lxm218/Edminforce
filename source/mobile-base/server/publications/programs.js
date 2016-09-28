// publish all programs
Meteor.publish('programs', function() {
    return Collections.program.find({},{sort:{displayOrder:1}});
});

Meteor.publish('school', function() {
    return Collections.school.find({},{limit:1});
});
