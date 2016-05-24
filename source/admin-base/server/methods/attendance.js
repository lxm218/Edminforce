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
        // all teachers
        result.teachers = KG.get('EF-AdminUser').getDB().find({role : 'teacher'}).fetch();
        // all current classes
        result.classes = KG.get('EF-Class').getDB().find({sessionID:result.currentSession._id}).fetch();
        
        return result;
    },

    'attendance.getStudents': function(classID) {
        let students = KG.get('EF-ClassStudent').getDB().find({classID,status:'checkouted'}).fetch();
        students.forEach( (s) => {
            let studentInfo = KG.get('EF-Student').getDB().findOne({_id:s.studentID}, {fields:{name:1, profile:1}}) || {}
            s.name = studentInfo.name;
            s.profile = studentInfo.profile;
        });
        
        return students;
    },

    'attendance.updateStudentAttendance': function() {
        
    }
})
