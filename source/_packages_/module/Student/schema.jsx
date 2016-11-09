
Schema = {};

Schema.StudentProfile = {
    birthday : KG.schema.default({
        type : Date,
        optional: true
    }),
    gender : KG.schema.default({
        allowedValues: ['Male', 'Female'],
        optional: true
    })

};

let list = [
    'email','firstName','lastName','image','phone','location',
    'emergencyPhone', 'emergencyContact', 'alternativePhone', 'alternativeContact',
    'school', 'note', 'medicalInfo'
];

_.each(list, function(item){
    Schema.StudentProfile[item] = KG.schema.default({
        optional : true
    });
});

Schema.Student = {
    accountID : KG.schema.default(),
    //accountName : KG.schema.default(),
    nickName : KG.schema.default({
        optional : true,
        label : 'Student Name'
    }),
    name : KG.schema.default({
        //optional : true,
        label : 'Student Name'
    }),
    //email : KG.schema.default({
    //    optional : true
    //}),
    profile : {
        type : new SimpleSchema(Schema.StudentProfile)
    },
    status : KG.schema.default({
        allowedValues : ['Active', 'Inactive']
    }),

    level : KG.schema.default({
        //TODO
        defaultValue : '',
        optional : true
    }),

    isImport : KG.schema.default({
        type : Boolean,
        optional : true,
        defaultValue : false
    }),

    // the following two fields are merged from mobile schema, required by mobile
    school: KG.schema.default({
        optional:true
    }),
    note: KG.schema.default({
        optional:true
    }),

    lastRegistrationDate : {
        type : Date,
        optional : true
    },

    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()
};

Schema.StudentComment = {
    studentID : KG.schema.default(),
    studentName : KG.schema.default(),
    fromID : KG.schema.default(),
    fromName : KG.schema.default(),
    comment : KG.schema.default({
        optional : true
    }),

    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()
};

Schema.StudentLevel = {
    studentID : KG.schema.default(),
    studentName : KG.schema.default(),
    level : KG.schema.default(),
    oldLevel : KG.schema.default(),

    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()
}
