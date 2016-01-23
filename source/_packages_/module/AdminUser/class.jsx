
let UserProfileSchema = new SimpleSchema({
    nickName : KG.schema.default(),
    email : KG.schema.default({
        regEx: SimpleSchema.RegEx.Email,
        optional : true
    }),
    title : KG.schema.default({
        optional : true
    }),
    group : KG.schema.default(),
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
        allowedValues: ['male', 'female']
    }),
    birthday : KG.schema.default({
        optional : true,
        type : Date
    }),
    employmentDate : KG.schema.default({
        optional : true,
        type : Date
    })
});

let Base = KG.getClass('Base');
let AdminUser = class extends Base{
    defineDBSchema(){
        return {
            userID : {
                type : String
            },
            password : {
                type : String
            },
            userProfile : KG.schema.default({
                type : UserProfileSchema
            }),
            status : KG.schema.default({

            }),
            createTime : KG.schema.default({
                type: Date,
                autoValue: function(){
                    if (this.isInsert){
                        return new Date();
                    }
                }
            })

        };
    }

    initEnd(){
        var self = this;

        if(Meteor.isServer){
            Meteor.methods({
                findUserById : self.findUserById
            });
        }

    }

    addTestData(){
        if(this._db.find({}).count() > 0){
            return false;
        }
        let data = {
            userID : 'jacky@calphin.com',
            password : 'calphin',
            status : 'active',
            userProfile : {
                nickName : 'Jacky',
                email : 'liyangwood@gmail.com',
                title : '管理员',
                group : 'admin',
                gender : 'male'
            }
        };
        this._db.insert(data);

    }


    addUser(param){
        //TODO add user
    }

    deleteUser(opts){
        let query = {
            _id : opts.id
        };

        //TODO delete user
    }

    defineServerMethod(){
        return {
            findUserById : function(id){

                let rs = this._db.findOne({_id:id});
                //console.log(rs);
                return rs;
            }
        };
    }

    defineClientMethod(){
        return {
            login : function(opts){
                let userID = opts.userID,
                    pwd = opts.password;
                let one = this._db.findOne({
                    userID : userID
                });

                if(one){

                    //TODO password需要加密
                    if(one.password === pwd){
                        KG.user.isLogin = true;
                        KG.user.current = one;

                        //TODO coypto
                        Meteor._localStorage.setItem(KG.const.USERTOKEN, one._id);

                        return KG.result.out(true, one);
                    }
                    else{
                        return KG.result.out(false, {}, '用户密码错误');
                    }
                }
                else{
                    return KG.result.out(false, {}, '用户不存在');
                }
            },
            checkLogin : function(callback){
                var self = this;
                if(KG.user.isLogin){
                    callback(true);
                    return;
                }

                let token = Meteor._localStorage.getItem(KG.const.USERTOKEN);

                if(!token){
                    callback(false);
                    return;
                }

                Meteor.call('findUserById', token, function(err, rs){
                    console.log(err, rs);
                    if(rs){
                        KG.user.loginWithUser(rs);
                        callback(true);
                    }
                    else{
                        callback(false);
                    }
                });

            },
            logout : function(){
                Meteor._localStorage.removeItem(KG.const.USERTOKEN);
                KG.user.reset();
                return true;
            },

            changePassword : function(opts){
                let old = opts.oldPassword,
                    userID = opts.userID,
                    newPwd = opts.newPassword,
                    confirmPwd = opts.newPassword2;

                if(newPwd.length < 6){
                    return KG.result.out(false, {}, '密码的长度不能小于6');
                }
console.log(opts);
                if(newPwd !== confirmPwd){
                    return KG.result.out(false, {}, '二次输入的密码不一致');
                }

                //TODO 处理修改密码的逻辑
                KG.result.out(true, 'comming soon');
            }
        }


    }


};

KG.define('EF-AdminUser', AdminUser);