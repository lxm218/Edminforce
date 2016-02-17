Meteor.startup(function () {
    var MyLogger = function(opts) {
      // console.log('Level', opts.level);
      // console.log('Message', opts.message);
      // console.log('Tag', opts.tag);
    }

    SyncedCron.config({
      logger: MyLogger
    });
    // Expired the pending book classes
    SyncedCron.add({
        name: 'Expired classStudent',
        schedule: function (parser) {
            // Every 1 send to execute expired job
            return parser.text('every 1 seconds');
        },
        job: function () {
            // current time
            let now = new Date();
            // valid date
            let validCreateTime = new Date(now.getTime() - EdminForce.settings.bookClassexpiredTime);
            //console.log(validCreateTime);

            EdminForce.Collections.classStudent.update({
                status: "pending",
                createTime: {
                    $lt: validCreateTime
                }
            }, {
                $set: {
                    status: "expired",
                    updateTime: now
                }
            }, {multi:true});
        }
    });

    // 1. When an order is "checkouting", make sure the status of classStudent in this order is change to "checkouting"
    // 2. When an order is "expired", make sure we change the status of classStudent from "checkouting" to "pending"
    // 3. When an order is "checkouted", make sure we change the status of classStudent from "checkouting" to "checkouted"
    // Why server side need to do this?
    // In case, when user add order, but for some reason it didn't update the classStudent successful. For example, not network, browser crash. So we run it in server side to make sure the status is correct set
    SyncedCron.add({
        name: "Sync up orders and classStudent",
        schedule: function (parser) {
            return parser.text('every 1 seconds');
        },
        job: function () {

            // 1. When an order is "checkouting", make sure the status of classStudent in this order is change to "checkouting"
            let inProgressOrders = EdminForce.Collections.orders.find({
                status: "checkouting"
            }).fetch();

            inProgressOrders && inProgressOrders.forEach(function (order, key) {
                let classStudentsID = order && order.details;

                console.log(classStudentsID);

                EdminForce.Collections.classStudent.update({
                    status: "pending",
                    "_id": {
                        $in: classStudentsID
                    }
                }, {
                    $set: {
                        status: "checkouting"
                    }
                }, {multi:true}, function (err, res) {
                    if (err) {
                        console.error("[Error], update classStudent error: ", err);
                    }
                });
            });


            // 2. When an order is "expired", make sure we change the status of classStudent from "checkouting" to "pending"
            let expiredOrders = EdminForce.Collections.orders.find({
                status: "expired"
            }).fetch();

            expiredOrders && expiredOrders.forEach(function (order, key) {
                let classStudentsID = order && order.details;

                EdminForce.Collections.classStudent.update({
                    status: "checkouting",
                    "_id": {
                        $in: classStudentsID
                    }
                }, {
                    $set: {
                        status: "pending"
                    }
                }, {multi: true}, function (err, res) {
                    if (err) {
                        console.error("[Error], update classStudent error: ", err);
                    }
                });
            });

            // 3. When an order is "checkouted", make sure we change the status of classStudent from "checkouting" to "checkouted"
            let checkoutedOrders = EdminForce.Collections.orders.find({
                status: "checkouted"
            }).fetch();

            checkoutedOrders && checkoutedOrders.forEach(function (order, key) {
                let classStudentsID = order && order.details;

                EdminForce.Collections.classStudent.update({
                    status:{
                        $nin:['checkouted']
                    },
                    _id: {
                        $in: classStudentsID
                    }
                }, {
                    $set: {
                        status: "checkouted"
                    }
                }, {multi: true}, function (err, res) {
                    if (err) {
                        console.error("[Error], update classStudent error: ", err);
                    }
                });
            });
        }
    });

    // Expired the order
    SyncedCron.add({
        name: 'Expired orders',
        schedule: function (parser) {
            // Every 1 send to execute expired job
            return parser.text('every 1 seconds');
        },
        job: function () {
            // current time
            let now = new Date();
            // valid date
            let validCreateTime = new Date(now.getTime()-EdminForce.settings.paymentExpiredTime);
            //console.log(validCreateTime);

            EdminForce.Collections.orders.update({
                status: "checkouting",
                createTime: {
                    $lt: validCreateTime
                }
            }, {
                $set: {
                    status: "expired",
                    updateTime: now
                }
            }, {multi: true}, function (err, res) {
                if (err) {
                    console.error("[Error]Expired order error:", err)
                }
            });
        }
    });


    SyncedCron.start();

});
