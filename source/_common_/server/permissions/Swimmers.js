/**
 * Created on 9/27/15.
 */


DB.Swimmers.allow({

    insert: function (userId, doc) {

        return userId;
    }

})