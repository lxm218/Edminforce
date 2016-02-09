/**
 * @name ClassStudentCollection
 * @description store the register class information
 * @type {Mongo.Collection}
 */

ClassStudentCollection = class ClassStudentCollection extends BaseCollection {

    /**
     * Collection instance should be singleton.
     * Most of case you should reinstanced, but if you really want to do it. set this value to null, then instance again
     */
    static _instance;

    constructor(name, options) {
        if (!ClassStudentCollection._instance) {
            super(name, options);
            // Store this instance
            ClassStudentCollection._instance = this;
        }

        return ClassStudentCollection._instance;
    }

    defineCollectionSchema() {
        return {
            classID: {
                type: String
            },
            studentID: {
                type: String
            },
            programID: {
                type: String
            },
            payment: {
                type: new SimpleSchema({
                    time: {
                        type: Date,
                        optional: true,
                        autoValue: function (doc) {
                            if (this.isInsert || this.isUpdate) {
                                if (doc.payment && doc.payment.status === 'success') {
                                    return new Date()
                                }
                            }
                        }
                    },
                    status: {
                        type: String,
                        optional: true
                    },
                    money: {
                        type: String,
                        optional: true
                    },
                    type: {
                        type: String,
                        optional: true
                    }
                }),
                optional: true
            },
            lessonDate: {
                type: Date,
                optional: true
            },
            status: {
                type: String,
                allowedValues : ['trial', 'register', 'wait', 'makeup']
            },
            createTime: EdminForce.utils.schemaUtil.createTime(),
            updateTime: EdminForce.utils.schemaUtil.updateTime()
        }
    }
}


