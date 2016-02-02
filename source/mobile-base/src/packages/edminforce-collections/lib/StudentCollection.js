/**
 * @name ProgramCollection
 * @description store the program information
 * @type {Mongo.Collection}
 */

StudentCollection = class StudentCollection extends BaseCollection {

    /**
     * Collection instance should be singleton.
     * Most of case you should reinstanced, but if you really want to do it. set this value to null, then instance again
     */
    static _instance;

    constructor(name, options) {
        if (!StudentCollection._instance) {
            super(name, options);
            // Store this instance
            StudentCollection._instance = this;
        }

        return StudentCollection._instance;
    }

    defineCollectionSchema() {
        return {
            name: {
                type: String
            },

            accountID: {
                type: String
            },

            profile: {
                type: new SimpleSchema({
                    birthday: {
                        type: Date
                    },
                    gender: {
                        type: String,
                        allowedValues: ["Male", "Female"]
                    }
                })
            },

            status: {
                type: String,
                allowedValues: ["Active", "Inactive"]
            },

            skillLevel: {
                type: String,
                optional: true
            },

            createTime: {
                type: Date,
                optional: true,
                autoValue: function () {
                    if (this.isInsert) {
                        return new Date();
                    }
                }
            },

            updateTime: {
                type: Date,
                optional: true,
                autoValue: function () {
                    if (this.isInsert) {
                        return new Date();
                    }
                    if (this.isUpdate) {
                        return new Date();
                    }
                }
            },

            note: {
                type: String,
                optional: true
            }
        }
    }
};
