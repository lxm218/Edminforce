/**
 * @name ProgramCollection
 * @description store the program information
 * @type {Mongo.Collection}
 */

CustomerCollection = class extends BaseCollection {

    /**
     * Collection instance should be singleton.
     * Most of case you should reinstanced, but if you really want to do it. set this value to null, then instance again
     */
    static _instance;

    constructor(name, options){
        if(!CustomerCollection._instance){
            super(name, options);
            // Store this instance
            CustomerCollection._instance = this;
        }

        return CustomerCollection._instance;
    }

    defineCollectionSchema() {
        let Schema = {};

        Schema.Contact = {
            name: {
                type: String,
                optional: true
            },
            email: {
                type: String,
                regEx: SimpleSchema.RegEx.Email,
                optional: true
            },
            phone: {
                type: String,
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

        Schema.Customer = {
            name : {
                label : 'Account Name',
                type : String
            },
            nickName : {
                optional : true,
                type : String
            },
            email : {
                regEx: SimpleSchema.RegEx.Email,
                type : String
            },
            phone : {
                optional : true,
                type : String
            },
            location : {
                optional : true,
                type : String
            },
            image : {
                optional : true,
                type : String
            },
            alternativeContact : {
                optional : true,
                type : new SimpleSchema(Schema.Contact)
            },
            emergencyContact : {
                optional : true,
                type : new SimpleSchema(Schema.Contact)
            },
            status : {
                allowedValues : ['Active', 'Inactive'],
                defaultValue : 'Active',
                optional : true,
                type : String
            },

            createTime: EdminForce.utils.schemaUtil.createTime(),
            updateTime: EdminForce.utils.schemaUtil.updateTime()
        };

        return Schema.Customer;
    }
}
