Meteor.startup(function () {
    // Get all program list
    Meteor.publish("EF-Program", ()=> {
        return EdminForce.Collections.program.find({});
    });

    // Get Trial Class list based on programID
    Meteor.publishComposite("EF-Class-programID", function (programID) {
            return {
                find: function () {
                    console.log(programID);
                    return EdminForce.Collections.class.find({
                        programID: programID
                    });
                },
                children: [{
                    find: function () {
                        return EdminForce.Collections.session.find({}, {
                            sort: {
                                startDate: -1
                            }
                        });
                    }
                },
                    {
                        find: function () {
                            return EdminForce.Collections.classStudent.find({}, {
                                sort: {
                                    startDate: -1
                                }
                            });
                        }
                    }]
            }
        }
    );

});