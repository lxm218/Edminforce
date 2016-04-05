// A composite publish that returns all (or optionally filtered by a single studentID)
// students for the currently logged-in user.
// For each student, returns all classes, sessions, programs.
Meteor.publishComposite("StudentsWithClasses", function(studentID) {
    const userId = this.userId;
    return {
        // all students of the logged-in user
        find () {
            let query = {
                accountID: userId
            }
            studentID && (query._id = studentID);
            return Collections.student.find(query);
        },

        children: [
            {
                // registered classes for each student (not started, in-session, or completed )
                find (student) {
                    return Collections.classStudent.find({
                        studentID: student._id,
                        type: {
                            $in: ['register', 'trial']
                        },
                        status: {
                            $in: ['checkouted']
                        },
                        $or:[{lessonDate:{$exists:false}}, {lessonDate:{$gte:new Date()}}]
                    })
                },
                children: [
                    {
                        // class info
                        find(studentClass) {
                            return Collections.class.find({_id:studentClass.classID})
                        },
                        children: [
                            {
                                // session info for the class
                                find(classDoc) {
                                    return Collections.session.find({_id:classDoc.sessionID})
                                }
                            },
                            {
                                // program info for the class
                                find(classDoc) {
                                    return Collections.program.find({_id:classDoc.programID})
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
