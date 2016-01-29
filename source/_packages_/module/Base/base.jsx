

let Base = class{


    constructor(name, option){
        this._name = name;
        this._db = null;
        this._schema = null;

        this.option = _.extend({
            DBName : ''
        }, option||{});

        this._extendMethod();

        this.initVar();
        this.initStart();

        this._initDB();



        this._initEnd();

    }

    _extendMethod(){
        var self = this;
        var sm = this.defineServerMethod(),
            cm = this.defineClientMethod();
        _.each(sm, function(method, key){
            self[key] = method.bind(self);
        });
        _.each(cm, function(method, key){
            self[key] = method.bind(self);
        });
    }

    /*
    * define server side method
    * @return: function map
    * */
    defineServerMethod(){
        return {};
    }

    /*
    * define client side method
    * @return: function map
    * */
    defineClientMethod(){
        return {};
    }

    _initDB(){

        this.initDBSchema();
        this.initDB();
        this.initDBEnd();
    }

    initDBSchema(){
        this._schema = this.defineDBSchema();
    }

    /*
    * define DB schema if DB exist
    * @return: DB schema
    *
    * */
    defineDBSchema(){
        return {};
    }

    getDBSchema(){
        return this._schema;
    }

    /*
    * define db object
    * if you do not have a DB, you can override and return null or any object you want.
    *
    * */
    defineDB(){
        let db = new Mongo.Collection(this.option.DBName || this._name);
        if(this._schema){
            let schema = new SimpleSchema(this._schema);
            db.attachSchema(schema);
        }

        return db;

    }

    initDB(){
        this._db = this.defineDB();
    }

    getDB(){
        return this._db;
    }

    initDBEnd(){}

    initVar(){

    }

    initStart(){}

    _initEnd(){
        let self = this;

        this.initEnd();

        if(Meteor.isServer){
            Meteor.startup(function(){
                self.addTestData.call(self);

                self._publishMeteorData.call(self);
            });
        }

    }

    _publishMeteorData(){
        var self = this;
        Meteor.publish(this._name, function(){
            return self._db.find({});
        });

        console.log(`[${this._name} Data] is publish`);
    }

    initEnd(){}
    addTestData(){}

    getSchemaConst(key){

        //TODO has error
        if(_.isUndefined(Schema) || _isUndefined(Schema.const)){
            throw new Error(`[${this._name} module] is not define Schema.const`);
        }
        let d = Schema.const;

        if(key) return d[key] || null;
        else return d;
    }

};


KG.define('Base', Base);