
DB.classesRegister = new Mongo.Collection('classesRegister');


DB.Schema.classesRegister = new SimpleSchema({
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

DB.classesRegister.attachSchema(DB.Schema.classesRegister)