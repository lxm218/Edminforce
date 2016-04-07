

let Base = class{


    constructor(name, option){
        this._name = name;
        this._db = null;
        this._schema = null;

        this.option = _.extend({
            DBName : ''
        }, option||{});

        this.initVar();
        this._extendMethod();


        this.initStart();

        this._initDB();



        this._initEnd();

    }

    _extendMethod(){
        var self = this;
        var sm = this.defineServerMethod(),
            cm = this.defineClientMethod();

        if(Meteor.isServer){
            _.each(sm, function(method, key){
                self[key] = method;
            });
        }

        if(Meteor.isClient){
            _.each(cm, function(method, key){
                self[key] = method;
            });
        }


        if(Meteor.isServer){
            let mm = this.defineMeteorMethod();
            let mms = {};
            _.each(mm, (item, key)=>{
                mms[this._name+':'+key] = item.bind(this);
            });
            Meteor.methods(mms);
        }
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

    defineMeteorMethod(){
        return {};
    }

    callMeteorMethod(methodName, args, opts){
        let self = this;
        opts = _.extend({
            error : function(err){
                console.error(err);
            },
            success : function(rs){
                console.log(rs);
            },
            context : self
        }, opts||{});
console.log('['+this._name+':'+methodName+' call]');
        Meteor.apply(this._name+':'+methodName, args, function(error, rs){
            if(error){
                opts.error.call(opts.context, error);
                return;
            }

            opts.success.call(opts.context, rs);
        });
    }
    //callMeteorMethodAsync(methodName, args){
    //    let fn = (param, callback)=>{
    //        Meteor.apply(this._name+'__'+methodName, param, callback);
    //    };
    //
    //    fn = Meteor.wrapAsync(fn);
    //
    //    let tmp = fn(args);
    //    console.log(tmp);
    //    return tmp;
    //}

    /*
    * return dependent module
    *
    * */
    defineDepModule(){
        return {};
    }

    _initDB(){

        this.initDBSchema();
        this.initDB();
        this.initDBPermission();
        this.initDBEnd();
    }

    initDBSchema(){
        this._schema = this.defineDBSchema();
    }

    defineDBPermission(){
        return {
            insert : function(){
                return true;
            },
            update : function(){
                return true;
            },
            remove : function(){
                return true;
            }
        };
    }

    initDBPermission(){
        var perm = this.defineDBPermission();
        this._db.allow(perm);
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
        return this._db ? this._db.simpleSchema() : null;
    }

    defineSchemaValidateMessage(){
        return {};
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
            schema.messages(this.defineSchemaValidateMessage());
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
        this.module = this.defineDepModule();

    }


    initStart(){}

    _initEnd(){
        let self = this;

        this.initEnd();

        if(Meteor.isServer){
            Meteor.startup(function(){
                //self.addTestData.call(self);

                self._publishMeteorData.call(self);
            });
        }

    }

    _publishMeteorData(){
        let self = this;
        Meteor.publish(this._name, function(opts){
            opts = _.extend({
                query : {},
                sort : {},
                pageSize : 999,
                pageNum : 1,
                field : null
            }, opts||{});
            _.mapObject(opts.query || {}, (item, key)=>{
                if(_.isObject(item)){
                    if(item.type === 'RegExp'){
                        opts.query[key] = new RegExp(item.value, 'i');
                    }
                }
            });

            let skip = opts.pageSize * (opts.pageNum-1);
            let option = {
                sort : opts.sort,
                skip : skip,
                limit : opts.pageSize
            };
            if(opts.field){
                option.fields = opts.field;
            };

            Counts.publish(this, self._name+'-count', self._db.find(opts.query));
            return self._db.find(opts.query, option);
        });


        this.publishMeteorData();

    }
    publishMeteorData(){}
    initEnd(){}
    addTestData(){}

    /*
    * use schema validate the doc
    * @return true/error
    *   if pass, return true
    *   if not, return a error include reason
    * */
    validateWithSchema(doc){
        try{
            this.getDBSchema().validate(doc);
        }catch(e){
            return e;
        }

        return true;
    }

    //db method
    insert(data){
        try{
            let rs = this._db.insert(data, function(err){
                if(err) throw err;
            });
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.reason||e.toString());
        }
    }


};


KG.define('Base', Base);