Meteor.methods({
    'dailyRoster.getData': function (dateStr) {
        let result = {
            //session
            //programs
        }

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
            'schedule.day': weekDay
        }, {
            fields: {
                programID:1,
                sessionID: 1,
                teacher: 1,
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
                fields:{name:1}
            }).fetch();

            c.students = [];
            students.forEach( (s) => {
                let stdInfo = _.find(names, {_id:s.studentID});
                stdInfo && (s.name = stdInfo.name);
                c.students.push({
                    name: stdInfo ? stdInfo.name : '',
                    type: s.type,
                    unpaid: s.status == 'pending' && s.pendingFlag
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