Meteor.startup(function () {
    var MyLogger = function(opts) {
        // console.log('Level', opts.level);
        // console.log('Message', opts.message);
        // console.log('Tag', opts.tag);
    };

    SyncedCron.config({
        logger: MyLogger,
        
        // set collection TTL to a day 
        collectionTTL: 86400
    });

    // Expire the pending class registrations and release spaces.
    SyncedCron.add({
        name: 'Expired classStudent',
        schedule: function (parser) {
            // execute the job every 5 minutes
            return parser.text('every 5 mins');
        },
        job: function () {
            console.log(`Expiration check of pending registrations (${Meteor.settings.public.pendingRegistrationTTL}).`);
            
            // current time
            let now = new Date();
            // valid date
            let validCreateTime = new Date(now.getTime() - Meteor.settings.public.pendingRegistrationTTL);

            // get a list of registrations that pass expiration time
            let expiredRegistrations = Collections.classStudent.find({
                status: 'pending',
                pendingFlag: false,
                type: {$in: ['register', 'makeup']},
                createTime: {
                    $lt: validCreateTime
                }
            }, {
                fields: {
                    type: 1,
                    classID: 1,
                    lessonDate: 1
                },
                sort: {
                    createTime: 1
                },
                limit: 100
            }).fetch();

            // process each one, set it to expired and release space held
            expiredRegistrations.forEach( (sc) => {
                console.log('expired: ', sc._id);
                EdminForce.Registration.expirePendingRegistration(sc);
            })
        }
    });

    SyncedCron.add({
        name: 'EmailReminder',
        schedule: function (parser) {
            // execute the job every 15 minutes
            return parser.text('every 15 mins');
        },
        job: function () {
            console.log('Process reminder emails');

            let reminderHours = settings.public.reminderHours || 24;
            let now = moment();
            let reminderTime = now.add(reminderHours, 'h');

            let reminderTemplate = Assets.getText('emailTemplates/cca/reminder.html');
            let compiledReminderTemplate = template.compile(decodeURIComponent(reminderTemplate));

            // session reminder
            let reminderSession = Collections.session.findOne( {
                startTime: {$gte: now, $lte: reminderTime},
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
                
                let customers = Collections.Customer.find({
                    remindedSession: {$ne: reminderSession._id}
                }, {
                    fields: {
                        email: 1
                    },
                    limit: 100
                }).fetch();

                customers.forEach( (c) => {
                    // check if this customer has class in current session
                    let nRegistered = Collections.classStudent.find({
                        accountID: c._id,
                        classID: {$in: classIDs}
                    }).count();

                    if (!nRegistered) return;

                    //our Summer 2016 Session starts on Saturday, April 2, 2016 at CalColor Academy.
                    let sessionDate = moment.tz(reminderSession.startDate,EdminForce.Settings.timeZone).format("dddd, MMMM D, YYYY");
                    let reminder = `our ${reminderSession.name} Session starts on ${sessionDate} at CalColor Academy.`;
                    let email = compiledReminderTemplate({
                        studentName: '',
                        reminderType: 'New Session Start',
                        reminder
                    });
                    // testing only
                    c.email = 'jinlie@gmail.com';

                    EdminForce.utils.sendEmailHtml(c.email, 'CalColor Academy - New Session Start Reminder', email);
                    Collections.Customer.update({_id:c._id}, {$set: {remindedSession: reminderSession._id}});
                })
            }
            
            // trial & makeup reminder
            let trialAndMakeups = Collections.classStudent.find({
                lessonDate: {$gte: now, $lte: reminderTime},
                type: {$in: ['trial','makeup']},
                reminded: false,
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
                    let lessonDate = moment.tz(lesson.lessonDate, EdminForce.Settings.timeZone).format('dddd, MMMM D, YYYY');
                    let reminder = `your ${classType} class with CalColor Academy on ${lessonDate} ${classData.schedule.time}.`;

                    let email = compiledReminderTemplate({
                        studentName: student.name,
                        reminderType: 'Class',
                        reminder
                    });
console.log(email);
                    customer.email = 'jinlie@gmail.com';
                    EdminForce.utils.sendEmailHtml(customer.email, 'CalColor Academy - Class Reminder', email);

                    // update the classStudentRecord
                    Collections.classStudent.update({_id:lesson._id}, {$set: {reminded:true}});
                }
            })
        }
    });

    SyncedCron.start();
});

