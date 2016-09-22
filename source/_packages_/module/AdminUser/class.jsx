
//_id equal account _id
let AdminUserSchema = new SimpleSchema({
    nickName : KG.schema.default(),
    email : KG.schema.default({
        regEx: SimpleSchema.RegEx.Email,
        label : 'User ID'
    }),
    password : KG.schema.default({
        optional : true
    }),
    title : KG.schema.default({
        optional : true,
        defaultValue : 'Administrator'
    }),
    role : KG.schema.default({
        allowedValues: ['superadmin', 'admin', 'teacher'],
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

    /*
    * role
    * status
    * group
    * employmentDate
    * nickName
    * */
    schoolID : KG.schema.default({
        type: Object,
        optional: true,
        blackbox: true
    }),
    currentSchoolID : KG.schema.default({
        optional : true
    }),
    createTime : KG.schema.createTime(),
    updateTime : KG.schema.updateTime()
});

let Base = KG.getClass('Base');
let AdminUser = class extends Base{
    defineDBSchema(){
        return AdminUserSchema;
    }


    addTestData(){
        //this._db.remove({});
        if(this._db.find({email : 'superadmin@classforth.com'}).count() > 0){
            return false;
        }

        const schoolInfo = {
            AdminSchoolID : {
                role : 'superadmin',
                nickName : 'Administrator',
                status : 'active'
            }
        };

        let data = {
            email : 'superadmin@classforth.com',
            password : 'admin',
            status : 'active',
            nickName : 'Administrator',
            role : 'superadmin',
            schoolID : schoolInfo
        };

        let accountData = {
            username : data.email,
            email : data.email,
            password : data.password,
            profile : {},
            role : 'admin',
            schoolID : 'AdminSchoolID',
            status : 'active'
        };



        let uid = KG.get('Account').callMeteorMethod('createUser', [accountData]);
        data._id = uid;
        this._db.insert(data);

    }

    initEnd(){

        this.pm = KG.create('EF-AdminPermission');

        if(Meteor.isClient){
            Meteor.subscribe('AdminUserData');
        }
    }

    getAll(query, option){
        let rs = this._db.find(query||{}, option||{}).fetch();

        let result = _.map(rs, (item)=>{


            return item;

        });

        return result;
    }


    updateById(data, id){
        this.module = KG.DataHelper.getDepModule();

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
        this.module = KG.DataHelper.getDepModule();

        let pwd = data.password || null;
        //delete data.password;

        const sid = data.schoolID;

        let schoolInfo = {};
        schoolInfo[sid] = {
            nickName : data.nickName,
            role : data.role,
            status : 'active'
        };
        data.schoolID = schoolInfo;

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
            profile : {a : 1},
            role : 'admin',
            schoolID : sid || 'AdminSchoolID',
            status : 'active'
        };


        console.log(accountData);




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

    publishMeteorData(){
        let self = this;
        Meteor.publish('AdminUserData', function(){
            if(this.userId){
                return self._db.find({
                    _id : this.userId
                })
            }
        });
    }

    defineClientMethod(){
        let self = this;
        return {
            user : function(){
                let x = Meteor.subscribe('AdminUserData');
                return Meteor.user()?self._db.findOne({_id : Meteor.user()._id}):null;

            }
        };
    }

    defineMeteorMethod(){
        let self = this;

        return {
            getUserById : function(id){
                let m = KG.DataHelper.getDepModule();

                return self._db.findOne({_id : id});
            },

            getCurrentUser : function(callback){
                let m = KG.DataHelper.getDepModule();

                let user = Meteor.user();
                if(!user){
                    return false;
                }
                else{
                    let u = self._db.findOne({_id : user._id});
                    let role = self.pm.getDB().findOne({role : u.role});
                    u.permission = role;

                    return u;
                }
            },

            getAllPermissionList : function(role){
                let o = self.pm.getDB().findOne({role : 'admin'}),
                    s = self.pm.getDB().findOne({role : role});
                if(!s){
                    throw new Meteor.Error('error', `${role} is not valid`);
                }


                let rs = {};


                let loop = function(type){
                    let pmStr = type+'Permission';
                    rs[pmStr] = {};
                    _.each(o[pmStr], (val, key)=>{
                        rs[pmStr][key] = s[pmStr][key] || false;
                    });
                }

                _.each(['view', 'edit', 'insert', 'delete'], (key)=>{
                    loop(key);
                });

                return rs;
            },
            updatePermissionByRole : function(role, data){
                let nd = this.pm.getDB().update({role : role}, {
                    $set : data
                });
                return nd;
            }
        };


    }







};

KG.define('EF-AdminUser', AdminUser);