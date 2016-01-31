/**
 * `BaseCollection` is the base class of collection
 */
// Export `BaseCollection` inside package
BaseCollection = class BaseCollection extends Mongo.Collection {

    /**
     * when we create a collection, need to pass name and schema
     * @param name the collection name
     * @param options the configure options for the collection
     * @returns {*}
     */
    constructor(name, options) {

        // step 1: validation
        if (!name) {
            throw "You must pass collection name";
        }

        if (_.isObject(options)) {
            // add validation
        }

        // Call Mongo.Collection to create
        super(name, options);

        /**
         * Store the timestap when this class is created an instance
         * Private
         * @type {Number}
         */
        let _createdTime;

        // step 2: store collection name
        /**
         * Collection Name
         * @type {String}
         */
        let _name = name;

        // step 3: initial collection Schema
        this.initCollectionSchema();

        // step 4: store the created time
        createdTime = new Date().getTime();

        /**
         * Get the timestap when this class is instanced
         * @returns {Number}
         */
        this.getCreatedTime = function(){
            return createdTime;
        }

        /**
         * Get mongodb collection name
         * @returns {String|*}
         */
        this.getName = function(){
            return _name;
        }
    }

    /**
     * define your schema
     * @returns {Object}
     */
    defineCollectionSchema() {
        console.error("[Error]You must overwrite this function, and return correct schema object of your collection!");
        return {}
    }

    /**
     * Get the SimpleSchema instance
     * @returns {SimpleSchema/null}
     */
    getSchema() {
        // if schema isn't exist
        if(!this.schema){
            console.error("[Error]Collection's schema isn't initialled");
        }

        return this.schema;
    }

    /**
     * Initial Collection Schema
     * @returns {}
     */
    initCollectionSchema() {
        // Get schema object
        let schema = this.defineCollectionSchema();

        if(!_.isObject(schema)){
            console.error("[Error]Collection Schema should be a valid object, and follow format defined in SimpleSchema. [schema]:", schema);
        }

        // initial collection schema
        this.schema = new SimpleSchema(schema);

        // attach schema to collection
        this.attachSchema(this.schema);
    }


}

