/**
 * Created by Jeffreyfan on 11/21/15.
 */


Meteor.publish("waitingListByAccount", function (id) {
    var accountId = id || this.userId
    return DB.WaitingList.find({
        accountId:accountId
    });
});