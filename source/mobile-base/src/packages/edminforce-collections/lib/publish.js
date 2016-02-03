Meteor.startup(function () {
    // Get all program list
    Meteor.publish("EF-Program", ()=> {
        return EdminForce.Collections.program.find({});
    });

    // Get Trial Class list based on programID
    Meteor.publish("EF-Class-programID", function(programID){
        console.log(programID);
        return EdminForce.Collections.class.find({
            programID: programID
        });
    });

});