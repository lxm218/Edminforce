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

EdminForce.Registration.sendChangeClassEmail = function(order) {
    let email = ''
    EdminForce.utils.sendEmailHtml(Meteor.user().emails[0].address, 'CalColor Academy - Change Class Confirmation',email);
}

EdminForce.Registration.sendCancelClassEmail = function(order) {
    let email = ''
    EdminForce.utils.sendEmailHtml(Meteor.user().emails[0].address, 'CalColor Academy - Cancel Class Confirmation',email);
}

EdminForce.Registration.sendSessionStartReminderEmail = function() {
    
}

EdminForce.Registration.sendClassReminderEmail = function(classStudent) {
    
}