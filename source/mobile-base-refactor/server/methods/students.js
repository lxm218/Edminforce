Meteor.methods({
    "students.upsertStudent": function(student) {
        student.accountID = this.userId;

        console.log('update student', student);

        if (student._id)
            Collections.student.update({_id:student._id}, {$set: _.omit(student, ['_id'])});
        else
            Collections.student.insert(student);
    }
});