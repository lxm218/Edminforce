
Schema = {};
Validate = {};

Schema.Coupon = {
    _id : KG.schema.default({}),
    discount : KG.schema.default(),
    maxCount : KG.schema.default({
        type : Number,
        defaultValue : 9999999999,
        optional : true
    }),
    description : KG.schema.default({
        optional : true
    }),
    useFor : KG.schema.default({
        //allowedValues : ['all', 'program', 'session', 'class'],
        type : [String],
        defaultValue : ['all']
    }),
    overRequire : KG.schema.default({
        optional : true
    }),
    startDate : KG.schema.default({
        type : Date
    }),
    endDate : KG.schema.default({
        type : Date
    }),
    weekdayRequire : KG.schema.default({
        defaultValue : ['all'],
        //allowedValues : ['all', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        type : [String]
    }),
    validForNoBooked : {
        type : Boolean,
        defaultValue : false
    },

    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()

};

Schema.CustomerCoupon = {
    customerID : KG.schema.default(),
    couponID : KG.schema.default(),
    status : KG.schema.default({
        optional: false,
        allowedValues : ['pending', 'checkouted',  'canceled']
    }),
    isValid : KG.schema.default({
        type : Boolean,
        defaultValue : true
    }),

    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()

};