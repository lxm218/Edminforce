/**
 * @name ProgramCollection
 * @description store the program information
 * @type {Mongo.Collection}
 */

CustomerCouponCollection = class CustomerCouponCollection extends BaseCollection {

    /**
     * Collection instance should be singleton.
     * Most of case you should reinstanced, but if you really want to do it. set this value to null, then instance again
     */
    static _instance;

    constructor(name, options) {
        if (!CustomerCouponCollection._instance) {
            super(name, options);
            // Store this instance
            CustomerCouponCollection._instance = this;
        }

        return CustomerCouponCollection._instance;
    }

    defineCollectionSchema() {
        return {
            customerID : {
                type : String,
                optional : false
            },
            couponID : {
                type : String,
                optional : false
            },
            status : {
                type : String,
                optional : false,
                //allowedValues : ['valid', 'success', 'fail']
                defaultValue : 'valid'
            },
            isValid : {
                type : Boolean,
                defaultValue : true
            },
            createTime: EdminForce.utils.schemaUtil.createTime(),
            updateTime: EdminForce.utils.schemaUtil.updateTime()

        }
    }
};
