/**
 * calculate age
 * @param dob {Date||String||Number}
 * @returns {Number}
 */
EdminForce.utils.calcAge = function (dob) {
    return moment().diff(moment(dob),'y');
};

/**
 * Get class name from program, session, class day & time
 */
EdminForce.utils.getClassName = function(programName, sessionName, classData){
    return `${programName} ${sessionName} ${classData.schedule.day} ${classData.schedule.time}`;
};

EdminForce.utils.getShortClassName = function(sessionName, classData){
    return `${sessionName} ${classData.schedule.day} ${classData.schedule.time}`;
};

// EdminForce.utils.getClassName = function(programName, sessionName, day, time){
//     return `${programName} ${sessionName} ${day} ${time}`;
// };

EdminForce.utils.isValidDate = function(dateStr) {
    let dateObj = new Date(dateStr);
    let regex = /^\s*[0,1]{0,1}[0-9]\/[0,1,2,3]{0,1}[0-9]\/[1,2][0,9][0-9]{2}\s*$/;
    if (!regex.test(dateStr) || dateObj.toString() == "Invalid Date")
        return false;
    else
        return true;
}

EdminForce.utils.postActionRedirect = function(redirectUrl) {
    if (redirectUrl && redirectUrl.r) {
        FlowRouter.go(FlowRouter.path(redirectUrl.r, null, _.omit(redirectUrl, 'r')));
        return true;
    }
    return false;
}

EdminForce.utils.compareTime = function (ts1, ts2) {
    if (!ts1 || !ts2) return false;

    let reg = /^(\d{1,2})\s*:\s*(\d{1,2})\s*(\w{2})$/;
    let result1 = reg.exec(ts1);
    let result2 = reg.exec(ts2);

    if (!result1 || !result2)  return false;

    if (result1[3].toLowerCase() != result2[3].toLowerCase())
        return false;

    return (parseInt(result1[1]) == parseInt(result2[1]) && parseInt(result1[2]) == parseInt(result2[2]));
}


EdminForce.utils.dateFormat = 'YYYY-MM-DDTHH:mm:ss';

EdminForce.utils.parseLessonDate = function(lessons) {
    lessons.forEach( (l) => {
        l.lessonDate = moment(l.lessonDate, EdminForce.utils.dateFormat).toDate();
    })
}

EdminForce.utils.getDocumentFromCache = function(documentName, id, cache) {
    let doc = lodash.find(cache, {_id:id});
    if (!doc) {
        doc = Collections[documentName].findOne({_id:id});
        doc && (cache.push(doc));
    }
    return doc;
}


/*
 * getSessionByDate
 *  Find a single session that covers the specified date. If date is specified, current date is used instead.
 */
EdminForce.utils.getSessionByDate = function(date) {
    let dateTz = moment.tz(date || new Date(), EdminForce.Settings.timeZone).toDate();
    return Collections.session.findOne({
        $and: [
            {startDate:{$lte: dateTz}},
            {endDate: {$gte: dateTz}}
        ]
    });
}

/*
 * registration query
 */
EdminForce.utils.registrationQuery = {
    type: {$in: ['register', 'trial', 'makeup']},
    $or: [ {status: 'checkouted'}, {$and:[{status: 'pending'}, {pendingFlag:true}]} ],
}