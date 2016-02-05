
Schema = {};

Schema.Contact = {
    name : KG.schema.default({

    }),
    phone : KG.schema.default({
        optional : true
    })
};

Schema.Customer = {
    name : KG.schema.default({
        optional : true
    }),
    nickName : KG.schema.default({
        optional : true
    }),
    email : KG.schema.default({
        regEx: SimpleSchema.RegEx.Email,
        optional : true
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
        defaultValue : 'Active'
    }),

    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()
};