

let Base = class{


    constructor(name){
        this._name = name;
        this._db = null;
        this._schema = null;

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

    defineServerMethod(){
        return {};
    }

    defineClientMethod(){
        return {};
    }

    _initDB(){
        this.initDB();
        this.initDBSchema();
        this.initDBEnd();
    }

    initDBSchema(){
        this._schema = this.defineDBSchema();

    }

    defineDBSchema(){}
    getDBSchema(){}

    initDB(){
        this._db = new Mongo.Collection(this._name);
    }

    getDB(){
        return this._db;
    }

    initDBEnd(){
        let schema = new SimpleSchema(this._schema);
        this._db.attachSchema(schema);
    }

    initVar(){

    }

    initStart(){}

    _initEnd(){
        let self = this;

        this.initEnd();

        if(Meteor.isServer){
            Meteor.startup(function(){
                self.addTestData.call(self);
            });
        }

    }

    initEnd(){}
    addTestData(){}

};


KG.define('Base', Base);