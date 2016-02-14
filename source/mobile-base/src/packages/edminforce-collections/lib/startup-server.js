Meteor.startup(function () {

    // Expired the pending class order
    SyncedCron.add({
        name: 'Expired classStudent',
        schedule: function(parser) {
            // Every 1 send to execute expired job
            return parser.text('every 1 seconds');
        },
        job: function() {
            // current time
            let now = new Date();
            // valid date
            let validCreateTime = new Date(now.getTime()-EdminForce.settings.expiredTime);
            console.log(validCreateTime);
            EdminForce.Collections.classStudent.update({
                payment:{
                    status: "pending"
                },
                createTime:{
                    $lt:new Date()
                }
            }, {
                $set:{
                    payment:{
                        status:"expired"
                    },
                    updateTime:now
                }
            });
        }
    });

    SyncedCron.start();

});