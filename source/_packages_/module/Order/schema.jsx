
Schema = {};
Schema.Order = {
    accountID : KG.schema.default(),
    studentID : KG.schema.default({
        optional:true
    }),
    details:{
        type:[String]   // ClassStudentID
    },
    paymentType : KG.schema.default({
        allowedValues : ['credit card', 'echeck', 'check', 'cash', 'school credit']
    }),
    paymentSource : KG.schema.default({
        allowedValues : ['admin', 'mobile']
    }),
    type : KG.schema.default({
        allowedValues : ['register class', 'change class', 'cancel class', 'makeup class'],
        optional : true,
        defaultValue : 'register class'
    }),
    status: {
        type: String,
        allowedValues : ['waiting', 'success', 'fail']
    },
    amount:{
        type: Number,
        decimal: true,
    },
    discount:{
        type: Number,
        optional: true,
        decimal: true,
        defaultValue: 0
    },
    registrationFee:{
        type: Number,
        optional: true,
        defaultValue: 0
    },
    //amount = orderTotal(including registrationFee) - discount
    //paymentTotal = amount + paymentFee (depends on paymentType)
    paymentTotal:{
        type: Number,
        decimal: true,
        optional: true
    },
    poundage : {
        type : String,
        optional : true,
        defaultValue : '0'
    },
    couponID:{
        type: String,
        optional: true
    },
    customerCouponID: {
        type: String,
        optional: true
    },
    schoolCredit:{
        type: Number,
        optional: true
    },
    createTime: KG.schema.createTime(),
    updateTime: KG.schema.updateTime()
};