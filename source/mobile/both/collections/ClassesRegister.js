
DB.ClassesRegister = new Mongo.Collection('classesRegister');


DB.Schema.ClassesRegister = new SimpleSchema({
    classId: {
        type: String
    },
    swimmerId: {
        type: String
    },
    registerDate: {
        type: Date
    }

});

DB.ClassesRegister.attachSchema(DB.Schema.ClassesRegister)