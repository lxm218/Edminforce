Meteor.methods({
    'attendance.getInitialData': function() {
        let result = {}
        // get currentSession
        let currentDate = new Date();
        result.currentSession = KG.get('EF-Session').getDB().findOne({
            $and: [
                {startDate:{$lte: currentDate}},
                {endDate: {$gte: currentDate}}
            ]
        }) || {};

        // all programs
        result.programs = KG.get('EF-Program').getDB().find({}).fetch();

        // get all levels
        result.levels = KG.get('EF-ClassLevel').getDB().find({}, {fields: {
            name:1,
            alias:1,
            order:1
        }}).fetch();

        // teachers. 
        // admin can view all teachers, teacher can only view herself/himself
        let currentUser = KG.get('EF-AdminUser').getDB().findOne({_id: this.userId}) || {};
        let query = {role : 'teacher'};
        if (currentUser.role != "admin")
            query._id = this.userId;
        result.teachers = KG.get('EF-AdminUser').getDB().find(query).fetch();

        // all current classes
        result.classes = KG.get('EF-Class').getDB().find({sessionID:result.currentSession._id}).fetch();
        
        return result;
    },

    'attendance.getStudents': function(classID) {
        let students = KG.get('EF-ClassStudent').getDB().find({
            classID,
            type: {$in: ['register','trial','makeup']},
            status:'checkouted'}, {
            fields: {
                studentID: 1,
                type: 1,
                attendance: 1,
                lessonDate: 1
            }
        }).fetch();
        let today = moment();
        students.forEach( (s) => {
            let studentInfo = KG.get('EF-Student').getDB().findOne({_id:s.studentID}, {fields:{name:1, profile:1}}) || {}
            s.name = studentInfo.name;
            s.gender = studentInfo.profile.gender;
            s.age = today.diff(moment(studentInfo.profile.birthday),'y');
        });
        
        return students;
    },

    'attendance.updateStudentsAttendance': function(students) {
        if (!students || !students.length) return;
        
        let classStudentDB = KG.get('EF-ClassStudent').getDB();
        students.forEach( (s) =>{
            classStudentDB.update({
                _id: s._id
            }, {
                $set : {
                    attendance: s.attendance
                }
            });
        })
    }
})
