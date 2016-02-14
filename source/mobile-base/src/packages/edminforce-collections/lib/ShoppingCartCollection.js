/**
 * @name ProgramCollection
 * @description store the program information
 * @type {Mongo.Collection}
 */

ShoppingCartCollection = class ShoppingCartCollection extends BaseCollection {

    /**
     * Collection instance should be singleton.
     * Most of case you should reinstanced, but if you really want to do it. set this value to null, then instance again
     */
    static _instance;

    constructor(name, options){
        if(!ShoppingCartCollection._instance){
            super(name, options);
            // Store this instance
            ShoppingCartCollection._instance = this;
        }

        return ShoppingCartCollection._instance;
    }

    defineCollectionSchema() {
        return {
            accountID:{
                type: String
            },
            classID:{
                type: String
            },
            programID:{
                type: String
            },
            paymentID: {
                type: String,
                optional: true
            },
            studentID:{
                type: String
            },
            classStudentID:{
                type: String
            },
            /**
             * 1. pending: [default] when create a cart it's status is pending
             * 2. checkouting: user start checkout checkout process
             * 3. checkouted: user finish checkout process
             * 4. expiring: system start expire process
             * 5. expired: system finish expire process
             * 6. canceling: user start cancel process
             * 7. canceled: user finish cancel process
             */
            status: {
                type: String,
                allowedValues : ['pending', 'checkouting', 'checkouted', 'expiring', 'expired', 'canceling', 'canceled']
            },
            createTime: EdminForce.utils.schemaUtil.createTime(),
            updateTime: EdminForce.utils.schemaUtil.updateTime()
        }
    }
}
