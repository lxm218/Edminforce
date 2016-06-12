/*
 * Confirmation email templates
 */

function extractTemplate(htmlWithTemplate, tag) {
    let startMark = `<!--${tag}-->`;
    let endMark = `<!--${tag}End-->`;
    
    let startMarkPos = htmlWithTemplate.indexOf(startMark);
    let endMarkPos = htmlWithTemplate.lastIndexOf(endMark);

    return {
        template: htmlWithTemplate.substring(startMarkPos + startMark.length, endMarkPos),
        start: startMarkPos,
        end: endMarkPos+endMark.length-1
    }
}

function formatLessonDate(lessonDate, classSchedule) {
    return moment(lessonDate).tz(EdminForce.Settings.timeZone).format("dddd, MMMM D, YYYY  ") + classSchedule.time;    
}

EdminForce.Registration.sendRegistrationConfirmationEmail = function(order) {
    let emailHtml = Assets.getText('emailTemplates/cca/registration.html');
    if (!emailHtml) return;
    
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
        sc.session = EdminForce.Registration.getDocumentFromCache('session', classData.sessionID, sessions);
        sc.program = EdminForce.Registration.getDocumentFromCache('program', classData.programID, programs);
        sc.schedule = classData.schedule;
        sc.sessionID = sc.session._id;
    });

    let groupBySession = lodash.groupBy(scs, "sessionID");
    
    let emailTemplate = extractTemplate(emailHtml, 'template');
    let tSession = extractTemplate(emailTemplate.template, 'session');
    let tRegular = extractTemplate(emailTemplate.template, 'regular');
    let tMakeup = extractTemplate(emailTemplate.template, 'makeup');
    let tRegularStudent = extractTemplate(tRegular.template, 'student');
    let tMakeupStudent = extractTemplate(tMakeup.template, 'student');

    let emailBody = '';
    lodash.forOwn(groupBySession, (sessionClasses, sessionID) => {
        let s = sessionClasses[0].session;
        let sessionDateRange = s.name + ' ' + moment(s.startDate).tz(EdminForce.Settings.timeZone).format("MMM D") + " - " + moment(s.endtDate).tz(EdminForce.Settings.timeZone).format("MMM D");
        let sessionHtml = tSession.template.replace('{sessionDateRange}', sessionDateRange);
        emailBody += sessionHtml;

        let regularClasses = lodash.filter(sessionClasses, {type:'register'});
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
        
        let makeupClasses = lodash.filter(sessionClasses, {type:'makeup'});
        if (makeupClasses.length >0) {
            let studentHtml = '';
            makeupClasses.forEach( (cls) => {
                studentHtml += tRegularStudent.template.replace("{name}", cls.student.name)
                    .replace("{className}", cls.program.name)
                    .replace("{lessonDate}", formatLessonDate(cls.lessonDate,cls.schedule) );
            })

            emailBody += tMakeup.template.substring(0, tMakeupStudent.start) +
                studentHtml +
                tMakeup.template.substr(tMakeupStudent.end+1);
        }
    });

    let emailHeader = emailHtml.substring(0, emailTemplate.start);
    let emailFooter = emailHtml.substr(emailTemplate.end+1);

    //amount = orderTotal(including registrationFee) - discount
    //paymentTotal = amount + paymentFee (depends on paymentType) - schoolCredit
    let total = order.amount + order.discount;
    emailFooter = emailFooter.replace('{totalCost}', total.toFixed(2));
    emailFooter = emailFooter.replace('{discount}', order.discount.toFixed(2));
    emailFooter = emailFooter.replace('{grandTotal}', order.amount.toFixed(2));

    let emailContent = emailHeader + emailBody + emailFooter;
    
    EdminForce.utils.sendEmailHtml(Meteor.user().emails[0].address, 'CalColor Academy Registration Confirmation!', emailContent);
}

EdminForce.Registration.sendTrialClassConfirmationEmail = function(studentID, classID, lessonDate) {
    let emailHtml = Assets.getText('emailTemplates/cca/trial.html');
    if (!emailHtml) return;

    let classData = Collections.class.findOne({_id: classID}, {fields:{programID:1, schedule:1}}) || {};
    let program = Collections.program.findOne({_id: classData.programID}) || {};
    let student = Collections.student.findOne({_id: studentID}, {fields:{name:1}}) || {};
    
    let tStudent = extractTemplate(emailHtml, 'student');

    let studentHtml = tStudent.template
        .replace("{name}", student.name)
        .replace("{className}", program.name)
        .replace("{lessonDate}", formatLessonDate(lessonDate,classData.schedule))

    let emailHeader = emailHtml.substring(0, tStudent.start);
    let emailFooter = emailHtml.substr(tStudent.end+1);

    let email = emailHeader + studentHtml + emailFooter;
    
    EdminForce.utils.sendEmailHtml(Meteor.user().emails[0].address, 'CalColor Academy Trial Class Confirmation!',email);
}

// /*
//  * Get class data for email
//  */
// EdminForce.Registration.getClassesForEmail = function(classStudentIDs) {
//     let res = {}
//     for (let i = 0; i < classStudentIDs.length; i++) {
//         let sc = Collections.classStudent.findOne({
//             _id: classStudentIDs[i]
//         }, {
//             fields: {
//                 classID:1, 
//                 studentID:1, 
//                 type: 1,
//                 fee:1
//             }
//         });
//        
//         let student = Collections.student.findOne({_id: sc.studentID}, {fields:{name:1}});
//         res[student.name] = res[student.name] || {};
//        
//         let doc = res[student.name];
//        
//         let classData = Collections.class.findOne({_id: sc.classID});
//         let session = Collections.session.findOne({_id: classData.sessionID});
//         let program = Collections.program.findOne({_id: classData.programID});
//
//         // let classFee = 0;
//         // if (sc.type === 'makeup') {
//         //     classFee = _.isNumber(classData.makeupClassFee) ? classData.makeupClassFee : 5;
//         // }
//         // else {
//         //     classFee = EdminForce.Registration.calculateRegistrationFee(classData, session);
//         // }
//        
//         let className = EdminForce.utils.getClassName(program.name, session.name, classData);
//         doc[className] = sc.fee;
//     }
//
//     return res
// }
//
// EdminForce.Registration.getMakeupClassesForEmail = function (classStudentIDs) {
//     let res = {}
//     for (let i = 0; i < classStudentIDs.length; i++) {
//         let sc = Collections.classStudent.findOne({_id: classStudentIDs[i]});
//         let student = Collections.student.findOne({_id: sc.studentID});
//         res[student.name] = res[student.name] || {};
//         var doc = res[student.name];
//         var classData= Collections.class.findOne({_id: sc.classID});
//         let session = Collections.session.findOne({_id: classData.sessionID});
//         let program = Collections.program.findOne({_id: classData.programID});
//
//         let className = EdminForce.utils.getClassName(program.name, session.name, classData);
//         doc[className] = [classData.makeupClassFee, moment(sc.lessonDate).tz(EdminForce.Settings.timeZone).format('YYYY-MM-DD')];
//     }
//     return res
// }
//
//
// EdminForce.Registration.getTrialConfirmationEmailTemplate = function (data) {
//     let school = {
//         "name": "CalColor Academy"
//     }
//     let tpl = [
//         '<h4>Hello,</h4>',
//         '<p>Thank for booking trial class. The following course is successfully booked.</p>',
//         '<table border=\"1\">',
//         '<tr>',
//         '<td>Name</td>',
//         '<td>Class</td>',
//         '<td>Date</td>',
//         '</tr>'
//     ].join('')
//
//     for (var studentName in data) {
//         var count = 0
//         var l = ""
//         var chosenClass = data[studentName]
//         for (var name in chosenClass) {
//             if (count != 0) {
//                 var line = [
//                     '<tr>',
//                     '<td>', name, '</td>',
//                     '<td>', moment(chosenClass[name]).tz(EdminForce.Settings.timeZone).format('YYYY-MM-DD'), '</td>',
//                     '</tr>',
//                 ].join('')
//                 l = l + line
//             } else {
//                 var line = [
//                     '<td>', name, '</td>',
//                     '<td>', moment(chosenClass[name]).tz(EdminForce.Settings.timeZone).format('YYYY-MM-DD'), '</td>',
//                     '</tr>',
//                 ].join('')
//                 l = l + line
//             }
//             count++
//         }
//         var fCol = [
//             '<tr>',
//             '<td rowspan=', count, '>', studentName, '</td>',
//         ].join('')
//         tpl = tpl + fCol + l
//     }
//
//     tpl = tpl + [
//             '</table>',
//             '<br/><br/>',
//             '<b>', school.name, '</b>'
//         ].join('')
//     return tpl
// }
//
//
// EdminForce.Registration.getMakeupConfirmEmailTemplate = function (data) {
//     let school = {
//         "name": "CalColor Academy"
//     }
//     let tpl = [
//         '<h3>Hello,</h3>',
//         '<p>This is your Make Up Class detail: </p>',
//         '<table border=\"1\">',
//         '<tr>',
//         '<td>Name</td>',
//         '<td>Class</td>',
//         '<td>Date</td>',
//         '<td>Fee</td>',
//         '</tr>'
//     ].join('')
//     var classes = data.classes
//
//     for (var studentName in classes) {
//         var count = 0
//         var l = ""
//         var chosenClass = classes[studentName]
//         for (var name in chosenClass) {
//             if (count != 0) {
//                 var line = [
//                     '<tr>',
//                     '<td>', name, '</td>',
//                     '<td>', chosenClass[name][1], '</td>',
//                     '<td>$', chosenClass[name][0], '</td>',
//                     '</tr>',
//                 ].join('')
//                 l = l + line
//             } else {
//                 var line = [
//                     '<td>', name, '</td>',
//                     '<td>', chosenClass[name][1], '</td>',
//                     '<td>$', chosenClass[name][0], '</td>',
//                     '</tr>',
//                 ].join('')
//                 l = l + line
//             }
//             count++
//         }
//         var fCol = [
//             '<tr>',
//             '<td rowspan=', count, '>', studentName, '</td>',
//         ].join('')
//         tpl = tpl + fCol + l
//     }
//
//     if (data.couponDiscount != 0) {
//         tpl = tpl + [
//                 '<tr>',
//                 '<td colspan=\"3\">Coupon Discount</td>',
//                 '<td>-$', data.couponDiscount.toFixed(2), '</td>',
//                 '</tr>',].join('')
//     }
//     if (data.registrationFee != 0) {
//         tpl = tpl + [
//                 '<tr>',
//                 '<td colspan=\"3\">Registration</td>',
//                 '<td>$', data.registrationFee.toFixed(2), '</td>',
//                 '</tr>',].join('')
//     }
//     tpl = tpl + [
//             '<tr>',
//             '<td colspan=\"3\">Credit Process Fee</td>',
//             '<td>$', data.processFee.toFixed(2), '</td>',
//             '</tr>',
//             '<tr>',
//             '<td colspan=\"3\">Total</td>',
//             '<td>$', data.total.toFixed(2), '</td>',
//             '</tr>',
//
//             '</table>',
//
//             '<h4>See details, please <a href="https://calcolor.classforth.com/" target="_blank">Login Your Account</a></h4>',
//
//             '<br/><br/>',
//             '<b>', school.name, '</b>'
//         ].join('')
//     return tpl
// }
//
//
// EdminForce.Registration.getRegularClassConfirmEmailTemplate = function (data) {
//     let school = {
//         "name": "CalColor Academy"
//     }
//     let tpl = [
//         '<h3>Hello,</h3>',
//         '<p>This is your registration detail: </p>',
//         '<table border=\"1\">',
//     ].join('')
//     var classes = data.classes
//
//     for (var studentName in classes) {
//         var count = 0
//         var l = ""
//         var chosenClass = classes[studentName]
//         for (var name in chosenClass) {
//             if (count != 0) {
//                 var line = [
//                     '<tr>',
//                     '<td>', name, '</td>',
//                     '<td>$', chosenClass[name], '</td>',
//                     '</tr>',
//                 ].join('')
//                 l = l + line
//             } else {
//                 var line = [
//                     '<td>', name, '</td>',
//                     '<td>$', chosenClass[name], '</td>',
//                     '</tr>',
//                 ].join('')
//                 l = l + line
//             }
//             count++
//         }
//         var fCol = [
//             '<tr>',
//             '<td rowspan=', count, '>', studentName, '</td>',
//         ].join('')
//         tpl = tpl + fCol + l
//     }
//
//     if (data.couponDiscount != 0) {
//         tpl = tpl + [
//                 '<tr>',
//                 '<td colspan=\"2\">Coupon Discount</td>',
//                 '<td>-$', data.couponDiscount.toFixed(2), '</td>',
//                 '</tr>',].join('')
//     }
//     if (data.registrationFee != 0) {
//         tpl = tpl + [
//                 '<tr>',
//                 '<td colspan=\"2\">Registration</td>',
//                 '<td>$', data.registrationFee.toFixed(2), '</td>',
//                 '</tr>',].join('')
//     }
//     tpl = tpl + [
//             '<tr>',
//             '<td colspan=\"2\">Credit Process Fee</td>',
//             '<td>$', data.processFee.toFixed(2), '</td>',
//             '</tr>',
//             '<tr>',
//             '<td colspan=\"2\">Total</td>',
//             '<td>$', data.total.toFixed(2), '</td>',
//             '</tr>',
//
//             '</table>',
//
//             '<h4>See details, please <a href="https://calcolor.classforth.com/" target="_blank">Login Your Account</a></h4>',
//
//             '<br/><br/>',
//             '<b>', school.name, '</b>'
//         ].join('')
//     return tpl
// }
