
Schema = {};
Validate ={};

Schema.Contact = {
    name : KG.schema.default({
        optional : true
    }),
    phone : KG.schema.default({
        optional : true,
        label : 'Contact Phone',
        custom : function(){
            if(this.value && !/^[0-9]*$/g.test(this.value)){
                return '601';
            }
        }
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
    '601' : '[label] must be a number'
};

Schema.Customer = {
    name : KG.schema.default({
        label : 'Account Name'
    }),
    nickName : KG.schema.default({
        optional : true
    }),
    email : KG.schema.default({
        regEx: SimpleSchema.RegEx.Email,
        //optional : true
    }),
    phone : KG.schema.default({
        //optional : true,
        custom : function(){
            if(this.value && !/^[0-9]*$/g.test(this.value)){
                return '601';
            }
        }
    }),
    location : KG.schema.default({
        //optional : true
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
        defaultValue : 0
    }),
    //for payment
    hasRegistrationFee : {
        type : Boolean,
        optional : true,
        defaultValue : true
    },

    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()
};