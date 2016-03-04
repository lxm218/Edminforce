
Schema = {};

Schema.StudentProfile = {
    birthday : KG.schema.default({
        type : Date,
        optional : true
    }),
    gender : KG.schema.default({
        allowedValues: ['Male', 'Female']
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
    profile : {
        type : new SimpleSchema(Schema.StudentProfile)
    },
    status : KG.schema.default({
        allowedValues : ['Active', 'Inactive']
    }),
    skillLevel : KG.schema.default({
        //TODO
        //allowedValue : ['']
        optional : true
    }),
    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()
};