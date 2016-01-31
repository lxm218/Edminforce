
Schema = {};
Validate = {};

Schema.const = {
    day : ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
    tuitionType : ['each', 'total'],
    status : ['Active', 'Inactive'],
    level : ['Beginner', 'Intermediate', 'Advanced'],
    genderRequire : ['All', 'Male', 'Female'],
    //length : ['30 min', '45 min', '1 hr', '1.5 hr', '2 hr']

    registrationStatus : ['register', 'wait']
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


Validate.Class = {
    'MinStudentMoreThanMaxStudent' : 'max student is must more than minimum student!'
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
        label : 'Maximum Student',
        custom : function(){
            let min = this.field('minStudent');
            //console.log(min, this.value);
            if(this.value < min.value){
                //throw new Error('max student is must more than minimum student');
                return 'MinStudentMoreThanMaxStudent';
            }

        }
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
    time : KG.schema.default({
        type : Date,
        optional : true,
        autoValue : function(doc){
            if(this.isInsert || this.isUpdate){
                if(doc.payment.status === 'success'){
                    return new Date()
                }
            }
        }
    }),
    status : KG.schema.default({
        optional : true
    }),
    money : KG.schema.default({
        optional : true
    }),
    type : KG.schema.default({
        optional : true
    })
};
Schema.ClassStudent = {
    classID : KG.schema.default(),
    studentID : KG.schema.default(),
    status : KG.schema.default({
        allowedValues : Schema.const.registrationStatus
    }),
    payment : {
        type : new SimpleSchema(Schema.ClassStudentPayment)
    },
    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime(),
    dynamicKey : KG.schema.default({
        optional : true
    })
};