
Schema = {};
Validate ={};

Schema.Contact = {
    name : KG.schema.default({
        optional : true
    }),
    phone : KG.schema.default({
        optional : true,
        label : 'Contact Phone'
    }),
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    relation: {
        type: String,
        optional: true
    },
    receive: {
        type: Boolean,
        optional: true,
        defaultValue: false
    }
};

Validate.Customer = {

};

Schema.Customer = {
    name : KG.schema.default({
        label : 'Account Name'
    }),
    nickName : KG.schema.default({
        optional : true
    }),
    email : KG.schema.default({
        regEx: SimpleSchema.RegEx.Email
        //optional : true
    }),
    phone : KG.schema.default({
        optional : true
    }),
    location : KG.schema.default({
        optional : true
    }),
    image : KG.schema.default({
        optional : true
    }),
    alternativeContact : {
        optional : true,
        type : new SimpleSchema(Schema.Contact)
    },
    emergencyContact : {
        optional : true,
        type : new SimpleSchema(Schema.Contact)
    },
    status : KG.schema.default({
        allowedValues : ['Active', 'Inactive'],
        defaultValue : 'Active',
        optional : true
    }),

    //for payment
    schoolCredit : KG.schema.default({
        type : Number,
        optional : true,
        decimal : true,
        defaultValue : 0
    }),
    //for payment
    hasRegistrationFee : {
        type : Boolean,
        optional : true,
        defaultValue : true
    },
    
    // the session id that this customer is sent a reminder email
    remindedSession: {
        type: String,
        optional: true
    },

    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()
};

Schema.CustomerSchoolCredit = {
    // _id is same to order _id
    customerID : KG.schema.default(),
    type : KG.schema.default({}),
    note : KG.schema.default({
        optional : true
    }),
    num : KG.schema.default({
        type : Number,
        optional : true,
        decimal : true,
        defaultValue : 0
    }),
    balance : KG.schema.default({
        type : Number,
        optional : true,
        decimal : true,
        defaultValue : 0
    }),
    createTime : KG.schema.createTime()
};