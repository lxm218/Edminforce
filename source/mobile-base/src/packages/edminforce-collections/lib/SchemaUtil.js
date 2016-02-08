SchemaUtil = class SchemaUtil{

    static _instance;

    constructor(){
        if (!SchemaUtil._instance) {
            // Store this instance
            SchemaUtil._instance = this;
        }

        return SchemaUtil._instance;
    }

    /**
     *
     * @param opts
     * @returns {*}
     */
    createTime(opts){
        return _.extend({
            type: Date,
            optional : true,
            autoValue: function(){
                if (this.isInsert){
                    return new Date();
                }
            }
        }, opts||{});
    }

    /**
     *
     * @param opts
     * @returns {*}
     */
    updateTime (opts){
        return _.extend({
            type: Date,
            optional : true,
            autoValue: function(){
                if (this.isInsert){
                    return new Date();
                }
                if (this.isUpdate){
                    return new Date();
                }
            }
        }, opts||{});
    }
};