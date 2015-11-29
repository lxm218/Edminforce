/**
 * Created by Jeffreyfan on 11/29/15.
 */



DB.Requests.allow({

    insert: function (userId, doc) {

        return userId;
    }

})