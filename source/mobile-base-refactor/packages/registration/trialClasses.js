
/*
 * Returns the number of registered regular student in a class
 */
getClassRegularStudentCount(classID) {
    return Collections.classStudent.find({
        classID,
        status: {$in:['pending', 'checkouting', 'checkouted']},
        type: 'register'
    }).count();
}

/*
 * Returns number of trial student for class on a specified date
 */
getClassTrialStudentCount(classID, dt) {
    return Collections.classStudent.find({
        classID,
        lessonDate: moment(dt).toDate(),
        type: 'trial'
    }).count();
}

/*
 * Returns number of make up student for class on a specified date
 */
getClassMakeupStudentCount(classID, dt) {
    return Collections.classStudent.find({
        classID,
        lessonDate: moment(dt).toDate(),
        type: 'makeup'
    }).count();
}


/*
 * Returns a list of available trial classes of a given program
 * in the specified date range
 */
getAvailableTrialLessons(programId, startDt, endDt) {
    //!(session.startDate > endDt || session.endDate < startDt)  ==> session.startDate <= endDt && session.endDate >= startDt
    let sessions = Collections.session.find({
        $and: [{startDate : {$lte: endDt}},{ endDate : {$gte:startDt}}]
    }, {
        sort: {
            startDate: 1
        }
    }).fetch();

    let sessionIds = sessions.map( (s) => s._id );
    let classes = Collections.class.find({
        programID: programId,
        status: 'Active',
        trialStudent: {$ne: 0},
        sessionID: {$in: sessionIds}
    }, {
        sort: {
            createTime: 1
        }
    }).fetch();

    let availableLessons = [];

    // find all available lessons for each class
    for (let i = 0; i < classes.length; i++) {
        let item = classes[i];

        // already filtered in query
        // trialStudent === 0 means trial is not allowed
        // if (item.trialStudent === 0) continue;

        // already filtered in query
        // Following condition, skip this class
        // 1. class's status isn't Active
        // if (lodash.lowerCase(item.status) !== lodash.lowerCase(schemaConst.status[0])) {
        //     continue;
        // }

        // get number of registered regular
        let numRegularStudents = getClassRegularStudentCount(item._id);
        // check if the class is fully booked by regular students
        if (numRegularStudents >= item.maxStudent)
            continue;

        let classSession = _.find(sessions, {_id:item.sessionID});

        // cannot find class relative session, then skip this class
        if (!classSession) {
            console.error("getAvailableTrialClasses > session not found:" + item.sessionID);
            continue;
        }

        let classDate = getClassDate(item.schedule.day, item.schedule.time);
        if (!classDate) {
            continue;
        }

        // how many available lesson to show
        for (let j = 0; j < displayWeekNumber; j++) {

            let lessonDate = moment(classDate).toDate();
            if (lessonDate < classSession.startDate || lessonDate > classSession.endDate) continue;

            // check block out day
            if (_.find(classSession.blockOutDay, (bd) => {
                    return bd.getDate() == lessonDate.getDate() &&
                        bd.getMonth() == lessonDate.getMonth() &&
                        bd.getFullYear() == lessonDate.getFullYear() } ))
                continue;

            let trialNumber = getClassTrialStudentCount(item._id, classDate);

            // trial + regular <= maxStudent
            if (trialNumber + numRegularStudents >= item.maxStudent) continue;

            // check against maxTrialStudent, null means no limit
            if (item.trialStudent && trialNumber >= item.trialStudent) continue;

            // first clone it
            let lesson = _.cloneDeep(item);

            // available lesson
            lesson.key = btoa(lesson._id + ":" + j);
            lesson.lessonDate = lessonDate;

            availableLessons.push(lesson);

            let tmpDate = moment(classDate).add(7, 'days');
            classDate.year = tmpDate.year();
            classDate.month = tmpDate.month();
            classDate.date = tmpDate.date();
        }

    }

    return availableLessons;
}

/**
 * get an object can used by [moment](http://momentjs.com/docs/#/parsing/object/)
 * @param day
 * @param time
 * @returns {*}
 */
getClassDate(day, time) {
    // which week day this class has in every week
    let classWeekDay = day;
    // The time of this class
    let classTime = time;

    let today = new Date();

    // regular expression to get hour, min, am/pm
    let reg = /^(\d{1,2})\s*:\s*(\d{1,2})\s*(\w{2})$/;

    let result = reg.exec(classTime);

    let classHour = lodash.toNumber(result[1]);
    let classMin = lodash.toNumber(result[2]);
    let class12Clock = result[3];
    // if class 12 clock is pm, then need to plus 12
    if (lodash.lowerCase(class12Clock) == 'pm') {
        classHour += 12;
    }

    // we must get this value, any of them is null or undefined, console error, and skip this class
    if (!lodash.isNumber(classHour) || !lodash.isNumber(classMin)) {
        console.error("The class time format isn't correct! Support format like 08:09 pm. Currently value: ", classTime);
        return null;
    }

    classWeekDay = schemaConst.weekDay[lodash.lowerCase(classWeekDay)];

    // the week day of today
    let todayWeekDay = today.getDay();

    // next class date object
    let classDate = {
        year: null,
        month: null,
        date: null,
        hour: classHour,
        minute: classMin,
        second: 0,
        millisecond: 0
    };
    if (todayWeekDay >= classWeekDay) {  // if today's week day is big than or equal class week day, so it need to be next week
        let date = moment(today).add(7 - todayWeekDay + classWeekDay, 'days');
        classDate.year = date.year();
        classDate.month = date.month();
        classDate.date = date.date();
    } else if (todayWeekDay < classWeekDay) {    // if today's week day is less than class week day, so it should be in this week
        let date = moment(today).add(classWeekDay - todayWeekDay, 'days');
        classDate.year = date.year();
        classDate.month = date.month();
        classDate.date = date.date();
        //classDate
    } else {                                  // For this version, didn't let use to select today's trial class
        let date = moment(today);
        classDate.year = date.year();
        classDate.month = date.month();
        classDate.date = date.date();
    }

    return classDate;
}
