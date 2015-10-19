/**
 * Created on 9/16/15.
 */


//Todo add real logic
DB.ClassesRegister.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fields, modifier) {

        return true;
    },
    remove: function (userId, doc) {

        return true;
    }
});