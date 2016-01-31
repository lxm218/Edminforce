/**
 * @name edminforce_program
 * @description store the program information
 * @type {Mongo.Collection}
 */

ProgramCollection = class ProgramCollection extends BaseCollection {

    /**
     * Collection instance should be singleton.
     * Most of case you should reinstanced, but if you really want to do it. set this value to null, then instance again
     */
    static _instance;

    constructor(name, options){
        if(!ProgramCollection._instance){
            super(name, options);
            // Store this instance
            ProgramCollection._instance = this;
        }

        return ProgramCollection._instance;
    }

    defineCollectionSchema() {
        return {
            name: {
                type: String
            },
            description: {
                type: String
            },
            availableTrial: {
                type: Boolean,
                defaultValue: true
            }
        }
    }
}
