
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


    //api
    login(opts){
        let userID = opts.userID,
            pwd = opts.password;
        var one = this._db.findOne({
            userID : userID
        });

        if(one){

            //TODO password需要加密
            if(one.password === pwd){
                return KG.result.out(true, one);
            }
            else{
                return KG.result.out(false, {}, '用户密码错误');
            }
        }
        else{
            return KG.result.out(false, {}, '用户不存在');
        }
    }

    changePassword(opts){
        let old = opts.oldPassword,
            userID = opts.userID,
            newPwd = opts.newPassword,
            confirmPwd = opts.newsPassword2;

        if(newPwd !== confirmPwd){
            return KG.result.out(false, {}, '二次输入的密码不一致');
        }

        //TODO 处理修改密码的逻辑

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


};

KG.define('EF-AdminUser', AdminUser);