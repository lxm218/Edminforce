
//_id equal account _id
let AdminUserSchema = new SimpleSchema({
    nickName : KG.schema.default(),
    email : KG.schema.default({
        regEx: SimpleSchema.RegEx.Email,
        label : 'User ID'
    }),
    title : KG.schema.default({
        optional : true,
        defaultValue : 'Administrator'
    }),
    role : KG.schema.default({
        allowedValues: ['admin', 'teacher'],
        defaultValue : 'teacher'
    }),
    status : KG.schema.default({
        //optional : true,
        allowedValues : ['active', 'inactive'],
        defaultValue: 'active'
    }),
    group : KG.schema.default({
        optional : true
    }),
    phone : KG.schema.default({
        optional : true
    }),
    supervisor : KG.schema.default({
        optional : true
    }),
    position : KG.schema.default({
        optional : true
    }),
    image : KG.schema.default({
        optional : true
    }),
    department : KG.schema.default({
        optional : true
    }),
    gender : KG.schema.default({
        optional : true,
        defaultValue : 'Male',
        allowedValues: ['Male', 'Female']
    }),
    birthday : KG.schema.default({
        optional : true,
        type : Date
    }),
    employmentDate : KG.schema.default({
        optional : true,
        type : Date
    }),
    //school : {
    //    type : Object
    //},
    //'school.name' : KG.schema.default({
    //    optional : true
    //}),
    //'school.email' : KG.schema.default({
    //    optional : true
    //}),
    //'school.phone' : KG.schema.default({
    //    optional : true
    //}),
    //'school.address' : KG.schema.default({
    //    optional : true
    //}),
    //'school.city' : KG.schema.default({
    //    optional : true
    //}),
    //'school.state' : KG.schema.default({
    //    optional : true
    //}),
    //'school.zipcode' : KG.schema.default({
    //    optional : true
    //}),
    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()
});

let Base = KG.getClass('Base');
let AdminUser = class extends Base{
    defineDBSchema(){
        return AdminUserSchema;
    }

    initEnd(){


    }

    addTestData(){
        //this._db.remove({});
        if(this._db.find({}).count() > 0){
            return false;
        }

        let data = {
            email : 'admin@classforth.com',
            password : 'admin',
            nickName : 'ClassForth Administrator',
            role : 'admin'
        };
        this.insert(data, function(rs){
            console.log(rs);
        });

    }

    getAll(query, option){
        let rs = this._db.find(query||{}, option||{}).fetch();

        let result = _.map(rs, (item)=>{


            return item;

        });

        return result;
    }

    defineDepModule(){
        return {
            Account : KG.get('Account'),
            School : KG.get('EF-School')
        };
    }

    updateById(data, id){

        if(data.school){
            let school = data.school;
            delete data.school;

            this.module.School.setInfo(school);
        }

        try{
            let rs = this._db.update({_id : id}, {'$set' : data});
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.toString());
        }
    }

    insert(data, callback){

        let pwd = data.password || null;
        delete data.password;

        let vd = this.validateWithSchema(data);
        if(vd !== true){
            return callback(KG.result.out(false, vd));
        }

        if(!pwd){
            return callback(KG.result.out(false, new Meteor.Error(-1, 'password is required')));
        }

        //create account
        let accountData = {
            username : data.email,
            email : data.email,
            password : pwd,
            profile : {},
            role : 'admin'
        };

        try{
            this.module.Account.callMeteorMethod('createUser', [accountData], {
                context : this,
                success : function(ars){
                    console.log(ars);
                    data._id = ars;
                    let rs = this._db.insert(data, function(err){
                        throw err;
                    });
                    return callback(KG.result.out(true, rs));
                },
                error : function(err){
                    return callback(KG.result.out(false, new Meteor.Error('-1', err.toString())));
                }
            });

        }catch(e){
            return callback(KG.result.out(false, e));
        }



    }






};

KG.define('EF-AdminUser', AdminUser);