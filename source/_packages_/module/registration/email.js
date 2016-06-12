/*
 * Confirmation email templates
 */

/*
 makeup:

 return {
 "amount": amt,
 "classes": classes,
 "registrationFee" : registrationFee,
 "couponDiscount": couponDiscount,
 "processFee": processFee,
 "total": total
 }

 return {
 "amount": amt,
 "classes": classes,
 "registrationFee" : registrationFee,
 "couponDiscount": couponDiscount,
 "processFee": processFee,
 "total": total
 }


 */

function extractTemplate(htmlWithTemplate, tag) {
    let startMark = `<!--${tag}-->`;
    let endMark = `<!--${tag}End-->`;
    
    console.log(startMark, endMark);

    let startMarkPos = htmlWithTemplate.indexOf(startMark);
    let endMarkPos = htmlWithTemplate.lastIndexOf(endMark);

    console.log(startMarkPos, endMarkPos);

    return {
        template: htmlWithTemplate.substring(startMarkPos + startMark.length, endMarkPos),
        start: startMarkPos,
        end: endMarkPos+endMark.length-1
    }
}

EdminForce.Registration.sendRegistrationConfirmationEmail = function(order) {
    let emailTemplate = Assets.getText('emailTemplates/cca/registration.html');
    if (!emailTemplate) return;
    
    let scs = Collections.classStudent.find({
        _id: {$in: order.details}
    },{
        fields: {
            classID:1,
            studentID:1,
            type:1,
            lessonDate:1
        }
    }).fetch();

    let sessions=[], programs =[];
    scs.forEach( (sc) => {
        let student = Collections.student.findOne({_id: sc.studentID}, {fields:{name:1}});
        sc.student = student || {name:''};
        let classData = Collections.class.findOne({_id: sc.classID});
        sc.session = getDocumentFromCache('session', classData.sessionID, sessions);
        sc.program = getDocumentFromCache('program', classData.programID, programs);
        sc.schedule = classData.schedule;
        sc.sessionID = sc.session._id;
    });

    let groupBySession = _.groupBy(scs, "sessionID");
    
    let template = extractTemplate(emailTemplate, 'template');
    let tSession = extractTemplate(template, 'session');
    let tRegular = extractTemplate(template, 'regular');
    let tMakeup = extractTemplate(template, 'makeup');
    let tRegularStudent = extractTemplate(tRegular.template, 'student');
    let tMakeupStudent = extractTemplate(tMakeup.template, 'student');

    let emailBody = '';
    _.forOwn(groupBySession, (sessionClasses, sessionID) => {
        let s = sessionClasses[0].session;
        let sessionDateRange = moment(s.startDate).tz(EdminForce.Settings.timeZone).format("MMM D") + " - " + moment(s.endtDate).tz(EdminForce.Settings.timeZone).format("MMM D");
        let sessionHtml = tSession.template.replace('{sessionDateRange}', sessionDateRange);
        emailBody += sessionHtml;

        let regularClasses = _.filter(sessionClasses, {type:'register'});
        if (regularClasses.length > 0) {
            let studentHtml = '';
            regularClasses.forEach( (cls) => {
                let className = cls.program.name + ',' + cls.schedule.day + ' ' + cls.schedule.time;
                studentHtml += tRegularStudent.template.replace("{name}", cls.student.name).replace("{className}", className);
            })

            emailBody += tRegular.template.substring(0, tRegularStudent.start) +
                studentHtml +
                tRegular.template.substr(tRegularStudent.end+1);
        }
        
        let makeupClasses = _.filter(sessionClasses, {type:'makeup'});
        if (makeupClasses.length >0) {
            let studentHtml = '';
            makeupClasses.forEach( (cls) => {
                let lessonDate = moment(cls.lessonDate).tz(EdminForce.Settings.timeZone).format("dddd,MMMM D,YYYY ") + cls.schedule.time;
                studentHtml += tRegularStudent.template.replace("{name}", cls.student.name)
                    .replace("{className}", cls.program.name)
                    .replace("{lessonDate}", lessonDate);
            })

            emailBody += tMakeup.template.substring(0, tMakeupStudent.start) +
                studentHtml +
                tMakeup.template.substr(tMakeupStudent.end+1);
        }
    });

    let emailHeader = emailTemplate.substring(0, template.start);
    let emailFooter = emailTemplate.substr(template.end+1);
    //emailFooter = emailFooter.replace('{totalCost}', order);

    return emailHeader + emailBody + emailFooter;
}

/*
 * Get class data for email
 */
EdminForce.Registration.getClassesForEmail = function(classStudentIDs) {
    let res = {}
    for (let i = 0; i < classStudentIDs.length; i++) {
        let sc = Collections.classStudent.findOne({
            _id: classStudentIDs[i]
        }, {
            fields: {
                classID:1, 
                studentID:1, 
                type: 1,
                fee:1
            }
        });
        
        let student = Collections.student.findOne({_id: sc.studentID}, {fields:{name:1}});
        res[student.name] = res[student.name] || {};
        
        let doc = res[student.name];
        
        let classData = Collections.class.findOne({_id: sc.classID});
        let session = Collections.session.findOne({_id: classData.sessionID});
        let program = Collections.program.findOne({_id: classData.programID});

        // let classFee = 0;
        // if (sc.type === 'makeup') {
        //     classFee = _.isNumber(classData.makeupClassFee) ? classData.makeupClassFee : 5;
        // }
        // else {
        //     classFee = EdminForce.Registration.calculateRegistrationFee(classData, session);
        // }
        
        let className = EdminForce.utils.getClassName(program.name, session.name, classData);
        doc[className] = sc.fee;
    }

    return res
}

EdminForce.Registration.getMakeupClassesForEmail = function (classStudentIDs) {
    let res = {}
    for (let i = 0; i < classStudentIDs.length; i++) {
        let sc = Collections.classStudent.findOne({_id: classStudentIDs[i]});
        let student = Collections.student.findOne({_id: sc.studentID});
        res[student.name] = res[student.name] || {};
        var doc = res[student.name];
        var classData= Collections.class.findOne({_id: sc.classID});
        let session = Collections.session.findOne({_id: classData.sessionID});
        let program = Collections.program.findOne({_id: classData.programID});

        let className = EdminForce.utils.getClassName(program.name, session.name, classData);
        doc[className] = [classData.makeupClassFee, moment(sc.lessonDate).tz(EdminForce.Settings.timeZone).format('YYYY-MM-DD')];
    }
    return res
}


EdminForce.Registration.getTrialConfirmationEmailTemplate = function (data) {
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
                    '<td>', moment(chosenClass[name]).tz(EdminForce.Settings.timeZone).format('YYYY-MM-DD'), '</td>',
                    '</tr>',
                ].join('')
                l = l + line
            } else {
                var line = [
                    '<td>', name, '</td>',
                    '<td>', moment(chosenClass[name]).tz(EdminForce.Settings.timeZone).format('YYYY-MM-DD'), '</td>',
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


EdminForce.Registration.getMakeupConfirmEmailTemplate = function (data) {
    let school = {
        "name": "CalColor Academy"
    }
    let tpl = [
        '<h3>Hello,</h3>',
        '<p>This is your Make Up Class detail: </p>',
        '<table border=\"1\">',
        '<tr>',
        '<td>Name</td>',
        '<td>Class</td>',
        '<td>Date</td>',
        '<td>Fee</td>',
        '</tr>'
    ].join('')
    var classes = data.classes

    for (var studentName in classes) {
        var count = 0
        var l = ""
        var chosenClass = classes[studentName]
        for (var name in chosenClass) {
            if (count != 0) {
                var line = [
                    '<tr>',
                    '<td>', name, '</td>',
                    '<td>', chosenClass[name][1], '</td>',
                    '<td>$', chosenClass[name][0], '</td>',
                    '</tr>',
                ].join('')
                l = l + line
            } else {
                var line = [
                    '<td>', name, '</td>',
                    '<td>', chosenClass[name][1], '</td>',
                    '<td>$', chosenClass[name][0], '</td>',
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

    if (data.couponDiscount != 0) {
        tpl = tpl + [
                '<tr>',
                '<td colspan=\"3\">Coupon Discount</td>',
                '<td>-$', data.couponDiscount.toFixed(2), '</td>',
                '</tr>',].join('')
    }
    if (data.registrationFee != 0) {
        tpl = tpl + [
                '<tr>',
                '<td colspan=\"3\">Registration</td>',
                '<td>$', data.registrationFee.toFixed(2), '</td>',
                '</tr>',].join('')
    }
    tpl = tpl + [
            '<tr>',
            '<td colspan=\"3\">Credit Process Fee</td>',
            '<td>$', data.processFee.toFixed(2), '</td>',
            '</tr>',
            '<tr>',
            '<td colspan=\"3\">Total</td>',
            '<td>$', data.total.toFixed(2), '</td>',
            '</tr>',

            '</table>',

            '<h4>See details, please <a href="https://calcolor.classforth.com/" target="_blank">Login Your Account</a></h4>',

            '<br/><br/>',
            '<b>', school.name, '</b>'
        ].join('')
    return tpl
}


EdminForce.Registration.getRegularClassConfirmEmailTemplate = function (data) {
    let school = {
        "name": "CalColor Academy"
    }
    let tpl = [
        '<h3>Hello,</h3>',
        '<p>This is your registration detail: </p>',
        '<table border=\"1\">',
    ].join('')
    var classes = data.classes

    for (var studentName in classes) {
        var count = 0
        var l = ""
        var chosenClass = classes[studentName]
        for (var name in chosenClass) {
            if (count != 0) {
                var line = [
                    '<tr>',
                    '<td>', name, '</td>',
                    '<td>$', chosenClass[name], '</td>',
                    '</tr>',
                ].join('')
                l = l + line
            } else {
                var line = [
                    '<td>', name, '</td>',
                    '<td>$', chosenClass[name], '</td>',
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

    if (data.couponDiscount != 0) {
        tpl = tpl + [
                '<tr>',
                '<td colspan=\"2\">Coupon Discount</td>',
                '<td>-$', data.couponDiscount.toFixed(2), '</td>',
                '</tr>',].join('')
    }
    if (data.registrationFee != 0) {
        tpl = tpl + [
                '<tr>',
                '<td colspan=\"2\">Registration</td>',
                '<td>$', data.registrationFee.toFixed(2), '</td>',
                '</tr>',].join('')
    }
    tpl = tpl + [
            '<tr>',
            '<td colspan=\"2\">Credit Process Fee</td>',
            '<td>$', data.processFee.toFixed(2), '</td>',
            '</tr>',
            '<tr>',
            '<td colspan=\"2\">Total</td>',
            '<td>$', data.total.toFixed(2), '</td>',
            '</tr>',

            '</table>',

            '<h4>See details, please <a href="https://calcolor.classforth.com/" target="_blank">Login Your Account</a></h4>',

            '<br/><br/>',
            '<b>', school.name, '</b>'
        ].join('')
    return tpl
}
