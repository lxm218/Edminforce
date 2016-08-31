
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
        allowedValues : ['credit card', 'echeck', 'check', 'cash', 'school credit', 'holding']
    }),
    paymentSource : KG.schema.default({
        allowedValues : ['admin', 'mobile']
    }),
    type : KG.schema.default({
        allowedValues : ['register class', 'change class', 'cancel class', 'makeup class', 'cancel makeup', 'change school credit', 'mixed'],
        optional : true,
        defaultValue : 'register class'

    }),
    status: {
        type: String,
        allowedValues : ['waiting', 'success', 'fail']
    },
    amount:{
        type: Number,
        decimal: true
    },

    monthlyAmount : {
        type : Number,
        optional : true,
        decimal : true
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
    //paymentTotal = amount + paymentFee (depends on paymentType) - schoolCredit
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
        decimal: true,
        type: Number,
        optional: true,
        defaultValue : 0
    },
    // recurring order
    recurring: {
        type: Boolean,
        optional: true,
        defaultValue: false
    },
    // authorize auto pay subscription info
    autoPayRefID: {
        type: String,
        optional: true
    },
    autoPaySubscriptionID: {
        type: String,
        optional: true
    },
    schoolID : KG.schema.default({
        optional : true
    }),

    dynamic : {
        type: Object,
        optional: true,
        blackbox: true
    },

    createTime: KG.schema.createTime(),
    updateTime: KG.schema.updateTime()
};


Schema.Payment = {
    accountID : KG.schema.default(),
    orderID: {
        type : String
    },
    paymentType : KG.schema.default({
        allowedValues : ['credit card', 'echeck', 'check', 'cash', 'school credit', 'holding']
    }),
    status: {
        type: String,
        allowedValues : ['waiting', 'success', 'fail']
    },
    amount:{
        type: Number,
        decimal: true
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
    //paymentTotal = amount + paymentFee (depends on paymentType) - schoolCredit
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
        decimal: true,
        type: Number,
        optional: true,
        defaultValue : 0
    },
    month : KG.schema.default({
        //2016-08
        optional : true,
        autoValue: function(){
            if(this.value){
                return this.value;
            }
            if(this.isInsert || this.isUpdate || this.isUpsert){
                return moment(this.field('createTime').value || new Date()).format('YYYY-MM');
            }
        }
    }),
    schoolID : KG.schema.default({
        optional : true
    }),
    createTime: KG.schema.createTime(),
    updateTime: KG.schema.updateTime()
}
