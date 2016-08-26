// publish all programs
Meteor.publish('programs', function() {
    return Collections.program.find({schoolID:EdminForce.utils.getSchoolIDByCustomerID(this.userId)},{sort:{displayOrder:1}});
});
