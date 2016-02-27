/**
 * @name ProgramCollection
 * @description store the program information
 * @type {Mongo.Collection}
 */

CouponCollection = class CouponCollection extends BaseCollection {

    /**
     * Collection instance should be singleton.
     * Most of case you should reinstanced, but if you really want to do it. set this value to null, then instance again
     */
    static _instance;

    constructor(name, options) {
        if (!CouponCollection._instance) {
            super(name, options);
            // Store this instance
            CouponCollection._instance = this;
        }

        return CouponCollection._instance;
    }

    defineCollectionSchema() {
        return {
            discount : {
                type : String,
                optional : false
            },
            maxCount : {
                type : Number,
                defaultValue : 1,
                optional : true
            },
            description : {
                type : String,
                optional : true
            },
            useFor : {
                //allowedValues : ['all', 'program', 'session', 'class'],
                type : [String],
                defaultValue : ['all']
            },
            overRequire : {
                type : String,
                optional : true
            },
            startDate : {
                type : Date
            },
            endDate : {
                type : Date
            },
            weekdayRequire : {
                defaultValue : ['all'],
                //allowedValues : ['all', 'Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
                type : [String]
            },
            validForNoBooked : {
                type : Boolean,
                defaultValue : false
            },
            createTime: EdminForce.utils.schemaUtil.createTime(),
            updateTime: EdminForce.utils.schemaUtil.updateTime()

        }
    }
};
