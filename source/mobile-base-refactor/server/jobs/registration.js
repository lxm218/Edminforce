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
            // current time
            let now = new Date();
            // valid date
            let validCreateTime = new Date(now.getTime() - Meteor.settings.public.pendingRegistrationTTL);

            Collections.classStudent.update({
                status: "pending",
                createTime: {
                    $lt: validCreateTime
                }
                }, {
                    $set: {
                        status: "expired",
                        updateTime: now
                    }
                }, {
                multi:true}
            );
        }
    });

    SyncedCron.start();
});

