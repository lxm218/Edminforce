Meteor.startup(function () {
    Meteor.publish("EF-Program", ()=> {
        return EdminForce.Collections.program.find({});
    });
});