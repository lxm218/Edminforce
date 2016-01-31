
Schema = {};

Schema.const = {
    day : ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
    tuitionType : ['each', 'total'],
    status : ['Active', 'Inactive'],
    level : ['Beginner', 'Intermediate', 'Advanced'],
    genderRequire : ['All', 'Male', 'Female']
    //length : ['30 min', '45 min', '1 hr', '1.5 hr', '2 hr']
};

Schema.ClassSchedule = {
    day : KG.schema.default({
        allowedValues : Schema.const.day
    }),
    time : KG.schema.default()
};
Schema.ClassTuition = {
    type : KG.schema.default({
        allowedValues : Schema.const.tuitionType
    }),
    money : KG.schema.default({
        label : 'Tuition money'
    })
};

Schema.Class = {
    name : KG.schema.default({
        optional : true
    }),

    programID : KG.schema.default(),
    sessionID : KG.schema.default(),
    status : KG.schema.default({
        allowedValues: Schema.const.status
    }),
    length : KG.schema.default(),
    level : KG.schema.default({
        allowedValues : Schema.const.level,
        defaultValue : 'Beginner'
    }),
    teacher : KG.schema.default({}),
    schedule : {
        type : new SimpleSchema(Schema.ClassSchedule)
    },
    tuition : {
        type : new SimpleSchema(Schema.ClassTuition)
    },
    numberOfClass : KG.schema.default({
        type : Number
    }),
    maxStudent : KG.schema.default({
        type : Number,
        label : 'Maximum Student'
    }),
    minStudent : KG.schema.default({
        defaultValue : 0,
        type : Number,
        label : 'Minimum Student'
    }),
    trialStudent : KG.schema.default({
        defaultValue : 0,
        type : Number,
        label : 'Trial Student'
    }),

    minAgeRequire : KG.schema.default({
        type : Number,
        defaultValue : 0,
        optional : true,
        label : 'Minimum Age'
    }),
    maxAgeRequire : KG.schema.default({
        type : Number,
        optional : true,
        label : 'Maximum Age'
    }),
    genderRequire : KG.schema.default({
        allowedValues : Schema.const.genderRequire,
        defaultValue : 'All'
    }),

    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()
};

Schema.ClassStudentPayment = {

};
Schema.ClassStudent = {};