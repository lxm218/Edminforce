/**
 * Created by Jeffreyfan on 10/18/15.
 */

DB.Waiver.allow({

    insert: function (userId, doc) {

        return userId;
    }

})