
EdminForce.utils.sendEmailText = function (to, subject, text) {
    check([to, subject, text], [String]);
    Email.send({
        to: to,
        // all we need to maintain is the domain name. We can change the user to whatever
        // from: "admin@sandbox581a4fe7e1b54295be84ebc6ec8d93ea.mailgun.org",
        from: "admin@classforth.com",

        subject: subject,
        text: text
    });
}

EdminForce.utils.sendEmailHtml = function (to, subject, html) {
    check([to, subject, html], [String]);
    Email.send({
        to: to,
        // all we need to maintain is the domain name. We can change the user to whatever
        // from: "admin@sandbox581a4fe7e1b54295be84ebc6ec8d93ea.mailgun.org",
        from: "admin@classforth.com",
        subject: subject,
        html: html
    });
}

EdminForce.utils.getPaymentConfirmEmailTemplate = function(data) {
    let school = {
        "name": "CalColor Academy"
    }
    let tpl = [
        '<h4>Hello,</h4>',
        '<p>Thank for booking trial class. The following course is successfully booked.</p>',
        '<table border=\"1\">',
        '<tr>',
        '<td>Name</td>',
        '<td>Class</td>',
        '<td>Date</td>',
        '</tr>'
    ].join('')

    for (var studentName in data) {
        var count = 0
        var l = ""
        var chosenClass = data[studentName]
        for (var name in chosenClass) {
            if (count != 0) {
                var line = [
                    '<tr>',
                    '<td>', name, '</td>',
                    '<td>', moment(chosenClass[name]).format('YYYY-MM-DD'), '</td>',
                    '</tr>',
                ].join('')
                l = l + line
            } else {
                var line = [
                    '<td>', name, '</td>',
                    '<td>', moment(chosenClass[name]).format('YYYY-MM-DD'), '</td>',
                    '</tr>',
                ].join('')
                l = l + line
            }
            count++
        }
        var fCol = [
            '<tr>',
            '<td rowspan=', count, '>', studentName, '</td>',
        ].join('')
        tpl = tpl + fCol + l
    }

    tpl = tpl + [
            '</table>',
            '<br/><br/>',
            '<b>', school.name, '</b>'
        ].join('')
    return tpl
}

/*
 * Update trial or makeup count in class record
 * returns
 *  null - no space available for trial or makeup
 *  class record - space is available and count is updated
 */
// EdminForce.utils.updateTrialAndMakeupCount = function(trialOrMakeup, classID, lessonDate) {
//     // [trial | makeup].YYYY-MM-DD, trial.2015-01-01, makeup.2015-01-01
//     // we have to include some non-digit characters in lesson data
//     // otherwise mongodb would treat field name like '20160406' as number
//     let strLessonDate = moment(lessonDate).format('YYYY-MM-DD');
//     let lessonDateField = trialOrMakeup + '.' + strLessonDate;
//     // class.trialStudent or class.makeupStudent
//     let maxFieldName = trialOrMakeup + 'Student'; 
//     let retry = 2;
//     let nUpdated = 0;
//     let classData = null;
//     while (retry > 0 && nUpdated == 0) {
//         classData = Collections.class.findOne({_id:classID});
//         if (!classData) {
//             throw new Meteor.Error(500, 'Class not found','Invalid class id: ' + classID);
//         }
//
//         // check if trial/makeup is allowed
//         if (classData[maxFieldName] <= 0) break;
//
//         let query;
//         if (classData.hasOwnProperty(trialOrMakeup)) {
//             // class record has trial field, increase it by 1, and make sure it is under the max limit
//             let orData = [{},{}];
//             orData[0][lessonDateField] = {$exists: false};
//             orData[1][lessonDateField] = {$lt: classData[maxFieldName]};
//             query = {_id: classID, $or:orData};
//
//             let incData = {};
//             incData[lessonDateField] = 1;
//
//             nUpdated = Collections.class.update(query, {$inc: incData});
//
//             // no need to retry if the class record already has trial field
//             // if update fails, that means there is no space available, because
//             // the update query has conditions for checking max limit
//             retry = 0;
//         }
//         else {
//             // in case the class record does not have a trial field
//             // we will retry if the update fails in this case, it's possible
//             // that the trial or makeup field is added by method calls from other users
//             query = {_id: classID};
//             query[trialOrMakeup] = {$exists: false};
//
//             let setData = {};
//             setData[trialOrMakeup] = {};
//             setData[trialOrMakeup][strLessonDate] = 1;
//            
//             nUpdated = Collections.class.update(query, {$set: setData});
//         }
//
//         --retry;
//     }
//    
//     return nUpdated == 0 ? null : classData;
// }

/*
 * release makeup/trial space
 */
EdminForce.utils.releaseTrialAndMakeupSpace = function(trialOrMakeup, classID, lessonDate) {
    let query = {
        _id: classID,
    }

    let strLessonDate = moment(lessonDate).format('YYYY-MM-DD');
    let lessonDateField = trialOrMakeup + '.' + strLessonDate;
    query[lessonDateField] = {$gt: 0};

    let incData = {};
    incData[lessonDateField] = -1;
    return Collections.class.update(query, {$inc: incData});
}

/*
 * Sync classStudent collection and class collection
 */
EdminForce.utils.updateClassRegistration = function() {

    // db['EF-ClassStudent'].aggregate( [ {$match: {status:'checkouted', type:'register'}}, {$group: {_id: {classID: "$classID", type: "$type"}, count:{$sum:1}}} ]);
    // db['EF-ClassStudent'].aggregate( [ {$match: {status:'checkouted'}}, {$group: {_id: {classID: "$classID", type: "$type"}, count:{$sum:1}}} ]);
    // db['EF-ClassStudent'].aggregate( [ {$match: {classID: classItem._id, status: 'checkouted', type: 'trial'}}, {$group: {_id: "$lessonDate", count:{$sum:1}}} ]);
    // db['EF-ClassStudent'].aggregate( [ {$match: {status: 'checkouted', type: 'trial'}}, {$group: {_id: {classID: "$classID", lessonDate:"$lessonDate"}, count:{$sum:1}}} ]);
    console.log('update class registration data')

    let classes = Collections.class.find({},{fields:{_id:1}}).fetch();
    console.log('Number of classes: ' + classes.length);

    classes.forEach( (classItem) => {

        console.log('Update class ' + classItem._id);

        // get number of registered regular students
        let numberOfRegistered = Collections.classStudent.find({classID: classItem._id, status: 'checkouted', type:'register'}).count();
        let updateData = {
            numberOfRegistered,
            trial: {},
            makeup: {}
        }

        // use mongo aggregate pipeline to get trial & make up info for each class day
        let pipeline = [
            {$match: {classID: classItem._id, status: 'checkouted', type: {$in:['trial','makeup']}}},
            {$group: {_id: {lessonDate: "$lessonDate", type: "$type"}, count:{$sum:1}}}
        ];
        let trialAndMakeups = Collections.classStudent.aggregate(pipeline);
        if (trialAndMakeups.ok) {
            trialAndMakeups.forEach( (res) => {
                let lessonDateStr = moment(res.lessonDate).format('YYYY-MM-DD');
                updateData[res._id.type][lessonDateStr] = res.count;
            })
        }

        Collections.class.update({_id: classItem._id}, {$set: updateData});
    });
}
