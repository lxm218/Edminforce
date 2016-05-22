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

    SyncedCron.start();
});

