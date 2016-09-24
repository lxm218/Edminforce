// publish all programs
Meteor.publish('programs', function(sid) {
    return Collections.program.find({schoolID:EdminForce.utils.sid2schoolID(sid)},{sort:{displayOrder:1}});
});
