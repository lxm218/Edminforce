Meteor.methods({
    'dailyRoster.getPrograms': function() {
        let programs = KG.get('EF-Program').getDB().find({}, {fields:{name:1}}).fetch();
        return programs;
    },

    'dailyRoster.getData': function (dateStr) {
        let result = {
            //session
            //programs
            //levels
        }

        // get all levels
        result.levels = KG.get('EF-ClassLevel').getDB().find({}, {fields: {
            name:1,
            alias:1,
            order:1
        }}).fetch();

        // get all programs
        let programs = KG.get('EF-Program').getDB().find({}).fetch();

        // get school timezone setting
        let school = KG.get('EF-School').getDB().findOne();
        let schoolTz = school && school.timezoneString ? school.timezoneString : 'America/Los_Angeles';

        // parse requestDate in school timezone
        let requestDate = moment.tz(dateStr, "YYYYMMDD",schoolTz);
        let weekDay = requestDate.format("ddd");

        // find requested session
        result.session = KG.get('EF-Session').getDB().findOne({
                $and: [
                    {startDate:{$lte: requestDate.toDate()}},
                    {endDate: {$gte: requestDate.toDate()}}
                ]
            });

        if (!result.session) return result;

        // check if the requested date is a blockout day
        let isBlockoutDay = false;
        if (result.session.blockOutDay && result.session.blockOutDay.length > 0) {
            isBlockoutDay = _.find(result.session.blockOutDay, (bd) => moment(bd).tz(schoolTz).format("YYYYMMDD") === dateStr);
        }
        if (isBlockoutDay) return result;

        // find all classes in this session
        let classes = KG.get('EF-Class').getDB().find({
            sessionID: result.session._id,
            //'schedule.days': {$elemMatch: {$eq:weekDay}}
            // use $or to search both schedule.day and schedule.days
            // once all classes are updated to use schedule.days, we can remove the 'schedule.day' part
            $or: [{'schedule.day':weekDay},{'schedule.days': {$elemMatch: {$eq:weekDay}}}]
        }, {
            fields: {
                programID:1,
                sessionID: 1,
                teacher: 1,
                level:1,
                levels:1,
                schedule: 1
            }
        }).fetch();

        // get all students
        classes.forEach( (c) => {
            let students = KG.get('EF-ClassStudent').getDB().find({
                classID: c._id,
                $or: [ {status: 'checkouted'}, {$and:[{status: 'pending'}, {pendingFlag:true}]} ],
                type: {$in : ['trial', 'register', 'makeup']}
            }, {
                fields: {
                    studentID:1,
                    lessonDate:1,
                    type:1,
                    status:1,
                    pendingFlag:1
                }
            }).fetch();

            // filter out trial/makeup students that are not on the requested date
            students = _.filter(students, (s) => {
                return s.type == 'register' || moment.tz(s.lessonDate, schoolTz).format("YYYYMMDD") == dateStr;
            });

            // get students name
            let studentIDs = students.map( s => s.studentID);
            let names = KG.get('EF-Student').getDB().find({
                _id: {$in: studentIDs}
            },{
                fields:{
                    name:1,
                    level:1
                }
            }).fetch();

            c.students = [];
            students.forEach( (s) => {
                // get student name and level
                let stdInfo = _.find(names, {_id:s.studentID});

                // get the number of classes this student has registered
                // use this to determine if the student is new
                let numClasses = KG.get('EF-ClassStudent').getDB().find({
                    studentID: s.studentID,
                    $or: [ {status: 'checkouted'}, {$and:[{status: 'pending'}, {pendingFlag:true}]} ],
                    type: 'register'
                }).count();

                //stdInfo && (s.name = stdInfo.name);
                c.students.push({
                    studentID: s.studentID,
                    name: stdInfo ? stdInfo.name : '',
                    type: s.type,
                    unpaid: s.status == 'pending' && s.pendingFlag,
                    level: stdInfo ? stdInfo.level : '',
                    numClasses
                })
            });
        })

        let groupByPrograms = _.groupBy(classes, 'programID');
        result.programs = _.keys(groupByPrograms).map( (k) => {
            let p = _.find(programs, {_id:k}) || {name:k, _id:k};
            p.classes = groupByPrograms[k];
            return p;
        })

        return result;
    }
});