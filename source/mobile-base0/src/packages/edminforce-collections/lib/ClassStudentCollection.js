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
            accountID:{
                type: String
            },
            classID: {
                type: String
            },
            studentID: {
                type: String
            },
            programID: {
                type: String
            },
            status: {
                type: String,
                allowedValues : ['pending', 'checkouting', 'checkouted', 'expiring', 'expired', 'canceling', 'canceled']
            },
            type: {
                type: String,
                allowedValues : ['trial', 'register', 'wait', 'makeup']
            },
            orderID: {
                type: String,
                optional: true
            },
            lessonDate: {
                type: Date,
                optional: true
            },
            createTime: EdminForce.utils.schemaUtil.createTime(),
            updateTime: EdminForce.utils.schemaUtil.updateTime()
        }
    }
}


