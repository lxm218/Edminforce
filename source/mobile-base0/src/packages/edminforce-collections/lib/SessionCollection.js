/**
 * @name ProgramCollection
 * @description store the program information
 * @type {Mongo.Collection}
 */

SessionCollection = class SessionCollection extends BaseCollection {

    /**
     * Collection instance should be singleton.
     * Most of case you should reinstanced, but if you really want to do it. set this value to null, then instance again
     */
    static _instance;

    constructor(name, options) {
        if (!SessionCollection._instance) {
            super(name, options);
            // Store this instance
            SessionCollection._instance = this;
        }

        return SessionCollection._instance;
    }

    defineCollectionSchema() {
        return {
            name: {
                type: String,
                optional: false
            },
            startDate: {
                type: Date,
                optional: false
            },
            endDate: {
                type: Date,
                optional: false
            },
            registrationStartDate : {
                type: Date,
                optional: false
            },
            registrationEndDate : {
                type: Date,
                optional: true
            },
            registrationStatus :{
                type: String,
                allowedValues : ['Yes', 'No']
            },
            createTime : {
                type: Date,
                optional : true,
                autoValue: function(){
                    if (this.isInsert){
                        return new Date();
                    }
                }
            },
            updateTime: EdminForce.utils.schemaUtil.updateTime(),
            blockOutDay : {
                type : [Date],
                optional : true
            }
        }
    }
}
