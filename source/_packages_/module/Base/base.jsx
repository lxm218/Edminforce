

let Base = class{


    constructor(name){
        this._name = name;
        this._db = null;
        this._schema = null;

        this.initVar();
        this.initStart();

        this._initDB();



        this._initEnd();

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

    defineDB(){}
    getDB(){}

    initDBEnd(){
        this._db.attachSchema(this._schema);
    }

    initVar(){

    }

    initStart(){}

    _initEnd(){
        var self = this;

        this.initEnd();

        Meteor.startup(function(){
            self.addTestData();
        });
    }

    initEnd(){}
    addTestData(){}

};


KG.define('Base', Base);