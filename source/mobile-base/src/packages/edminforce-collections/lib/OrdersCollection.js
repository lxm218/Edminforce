/**
 * @name ClassStudentCollection
 * @description store the register class information
 * @type {Mongo.Collection}
 */

OrdersCollection = class OrdersCollection extends BaseCollection {

    /**
     * Collection instance should be singleton.
     * Most of case you should reinstanced, but if you really want to do it. set this value to null, then instance again
     */
    static _instance;

    constructor(name, options) {
        if (!OrdersCollection._instance) {
            super(name, options);
            // Store this instance
            OrdersCollection._instance = this;
        }

        return OrdersCollection._instance;
    }

    defineCollectionSchema() {
        return {
            accountID:{
                type: String
            },
            details:{
                type:[String]   // ClassStudentID
            },
            status: {
                type: String,
                allowedValues : ['pending', 'checkouting', 'checkouted', 'expiring', 'expired', 'canceling', 'canceled', 'success']
            },
            amount:{
                type: Number
            },
            paymentTotal:{
                type: String,
                optional: true
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
            createTime: EdminForce.utils.schemaUtil.createTime(),
            updateTime: EdminForce.utils.schemaUtil.updateTime()
        }
    }
}


