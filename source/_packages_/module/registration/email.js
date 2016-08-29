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
    EdminForce.utils.getTZ();
    return moment(lessonDate).tz(EdminForce.Settings.timeZone).format("dddd, MMMM D, YYYY  ") + classSchedule.time;    
}

EdminForce.Registration.sendRegistrationConfirmationEmail = function(order) {
    let emailHtml = Assets.getText('emailTemplates/cca/registration.html');
    if (!emailHtml) return;

    EdminForce.utils.getTZ();

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
    let makeupOnly = true;
    scs.forEach( (sc) => {
        
        if (sc.type != 'makeup') makeupOnly = false;
        
        let student = Collections.student.findOne({_id: sc.studentID}, {fields:{name:1}});
        sc.student = student || {name:''};
        let classData = Collections.class.findOne({_id: sc.classID});
        sc.session = EdminForce.utils.getDocumentFromCache('session', classData.sessionID, sessions);
        sc.program = EdminForce.utils.getDocumentFromCache('program', classData.programID, programs);
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
        let regularClasses = lodash.filter(sessionClasses, {type:'register'});
        let makeupClasses = lodash.filter(sessionClasses, {type:'makeup'});

        // only show session part if there are regular classes
        if (!makeupOnly) {
            let s = sessionClasses[0].session;
            let sessionDateRange = s.name + ' ' + moment(s.startDate).tz(EdminForce.Settings.timeZone).format("MMM D") + " - " + moment(s.endDate).tz(EdminForce.Settings.timeZone).format("MMM D");
            let sessionHtml = tSession.template.replace('{sessionDateRange}', sessionDateRange);
            emailBody += sessionHtml;
        }

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
        
        if (makeupClasses.length >0) {
            let studentHtml = '';
            makeupClasses.forEach( (cls) => {
                studentHtml += tMakeupStudent.template.replace("{name}", cls.student.name)
                    .replace("{className}", cls.program.name)
                    .replace("{lessonDate}", formatLessonDate(cls.lessonDate,cls.schedule) );
            })

            emailBody += tMakeup.template.substring(0, tMakeupStudent.start) +
                studentHtml +
                tMakeup.template.substr(tMakeupStudent.end+1);
        }
    });

    let emailHeader = emailHtml.substring(0, emailTemplate.start);
    emailHeader = emailHeader.replace('{confirmationType}', makeupOnly ? 'Make up Class' : 'Registration');

    let emailFooter = emailHtml.substr(emailTemplate.end+1);

    //amount = orderTotal(including registrationFee) - discount
    //paymentTotal = amount + paymentFee (depends on paymentType) - schoolCredit
    order.discount = order.discount || 0;
    let total = order.amount + order.discount;
    emailFooter = emailFooter.replace('{totalCost}', total.toFixed(2));
    emailFooter = emailFooter.replace('{discount}', order.discount.toFixed(2));
    emailFooter = emailFooter.replace('{grandTotal}', order.amount.toFixed(2));

    let emailContent = emailHeader + emailBody + emailFooter;
    
    EdminForce.utils.sendEmailHtml(Meteor.user().emails[0].address, makeupOnly ? 'CalColor Academy Make up Class Confirmation!':'CalColor Academy Registration Confirmation!', emailContent);
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

// send reminder email for session start and trial & makeup classes
EdminForce.Registration.sendReminderEmails = function() {

    let reminderHours = Meteor.settings.public.reminderHours || 24;

    EdminForce.utils.getTZ();

    let now = moment();
    let reminderTime = moment().add(reminderHours, 'h');

    let reminderTemplate = Assets.getText('emailTemplates/cca/reminder.html');
    let compiledReminderTemplate = template.compile(decodeURIComponent(reminderTemplate));

    // session reminder
    let reminderSession = Collections.session.findOne( {
        schoolID: Meteor.user().schoolID,
        startDate: {$gte: now.toDate(), $lte: reminderTime.toDate()},
    });

    if (reminderSession) {
        let sessionClasses = Collections.class.find({
            sessionID: reminderSession._id
        }, {
            fields: {
                status:1
            }
        }).fetch();
        let classIDs = sessionClasses.map ((cls) => cls._id);

        // send maximum of 100 emails in each run
        let customers = Collections.Customer.find({
            remindedSession: {$ne: reminderSession._id}
        }, {
            fields: {
                email: 1
            },
            limit: 400
        }).fetch();

        //our Summer 2016 Session starts on Saturday, April 2, 2016 at CalColor Academy.
        let sessionDate = moment.tz(reminderSession.startDate,EdminForce.Settings.timeZone).format("dddd, MMMM D, YYYY");
        let templateData = {
            studentName: '',
            reminderType: 'New Session Start',
            reminder:`our ${reminderSession.name} Session starts on ${sessionDate} at CalColor Academy.`
        }

        customers.forEach( (c) => {
            // check if this customer has class in current session
            let nRegistered = Collections.classStudent.find({
                accountID: c._id,
                $or: [ {status: 'checkouted'}, {$and:[{status: 'pending'}, {pendingFlag:true}]} ],
                type: {$in: ['trial','register']},
                classID: {$in: classIDs}
            }).count();

            if (!nRegistered) return;

            let email = compiledReminderTemplate(templateData);
            EdminForce.utils.sendEmailHtml(c.email, 'CalColor Academy - New Session Start Reminder', email);
            Collections.Customer.update({_id:c._id}, {$set: {remindedSession: reminderSession._id}});
        })
    }

    // trial & makeup reminder
    let trialAndMakeups = Collections.classStudent.find({
        lessonDate: {$gte: now.toDate(), $lte: reminderTime.toDate()},
        type: {$in: ['trial','makeup']},
        reminded: {$ne:true},
        $or: [ {status: 'checkouted'}, {$and:[{status: 'pending'}, {pendingFlag:true}]} ],
    },{
        fields: {
            type:1,
            lessonDate:1,
            classID:1,
            studentID:1,
            accountID:1
        }
    }).fetch();

    trialAndMakeups.forEach( (lesson) => {
        let student = Collections.student.findOne({
            _id: lesson.studentID
        }, {
            fields:{
                name:1
            }
        });
        let classData = Collections.class.findOne({
            _id: lesson.classID
        }, {
            fields: {
                schedule:1
            }
        });

        let customer = Collections.Customer.findOne({
            _id: lesson.accountID
        }, {
            fields: {
                email:1,
                alternativeContact:1,
                emergencyContact:1
            }
        });

        if (student && classData && customer) {
            let classType = lesson.type == 'trial' ? 'trial' : 'make up';
            EdminForce.utils.getTZ();
            let lessonDate = moment.tz(lesson.lessonDate, EdminForce.Settings.timeZone).format('dddd, MMMM D, YYYY');
            let reminder = `your ${classType} class with CalColor Academy on ${lessonDate} ${classData.schedule.time}.`;

            let email = compiledReminderTemplate({
                studentName: student.name,
                reminderType: 'Class',
                reminder
            });

            EdminForce.utils.sendEmailHtml(customer.email, 'CalColor Academy - Class Reminder', email);

            // update the classStudentRecord
            Collections.classStudent.update({_id:lesson._id}, {$set: {reminded:true}});
        }
    })    
}