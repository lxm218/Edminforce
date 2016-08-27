
let Base = KG.getClass('Base');
KG.define('Account', class extends Base{
    defineDBSchema(){
        return Schema.Account;
    }

    defineDB(){

        Meteor.users.attachSchema(new SimpleSchema(this._schema));

        if(Meteor.isServer){
            //delete Meteor.users username index
            //Meteor.users._dropIndex('username_1');
            //Meteor.users._ensureIndex({username:1, role:1}, {unique:1});

        }


        return Meteor.users;
    }

    publishMeteorData(){
        //TODO call Accounts.addAutopublishFields, why not work?


        Meteor.publish('userData', function(){
            let profile = KG.DataHelper.getDepModule().AdminUser.getDB().findOne({_id : this.userId});
            //console.log(this.userId);
            let one = Meteor.users.find({
                _id : this.userId
            }, {
                fields : _.object(_.map(Accounts._autopublishFields.loggedInUser, function(field){
                    return [field, 1];
                }))
            });

            return one;
        })


    }

    initEnd(){

        if(Meteor.isClient){
            Meteor.subscribe('userData');
        }

    }

    addTestData(){

    }

    checkIsLogin(){
        return !!Meteor.user() ? Meteor.user() : false;
    }

    defineMeteorMethod(){
        let self = this;
        return {
            createUser(data){
                try{
                    let uid = Accounts.createUser(data);
                    console.log(uid);

                    return uid;
                }catch(e){
                    //console.log(e);
                    // error=403 email is already
                    // insert to Meteor.user directly
                    if(false && e.error === 403){
                        //TODO how to insert?
                        //try{
                        //    return Meteor.users.insert(data);
                        //}catch(err){
                        //    console.log(err);
                        //    throw err;
                        //}

                    }
                    else{
                        throw e;
                    }


                }

            }
        };
    }

    login(opts){
        opts = _.extend({
            username : null,
            password : null,
            keepLogin : true,
            success : function(){},
            error : function(e){
                alert(e.reason);
            }
        }, opts);

        if(!opts.username){
            opts.error(new Meteor.Error(-1, 'userID is required'));
            return;
        }
        if(!opts.password){
            opts.error(new Meteor.Error(-2, 'password is required'));
            return;
        }

        Meteor.loginWithPassword({
            username : opts.username,
            role : 'admin'
        }, opts.password, function(err){
            if(err){
                opts.error(err);
                return false;
            }

            if(Meteor.user()){

                // status must be admin
                if(Meteor.user().role !== 'admin'){
                    //TODO add error message
                }

                KG.DataHelper.getDepModule().AdminUser.callMeteorMethod('getUserById', [Meteor.user()._id], {
                    success : function(u){
                        console.log(u);

                        if(u.status === 'inactive'){
                            return opts.error(new Meteor.Error(600, 'This account is not active, please check.'))
                        }

                        if(!opts.keepLogin){
                            Accounts._unstoreLoginToken();
                        }

                        //add log
                        KG.RequestLog.addByType('login', {
                            operatorID : Meteor.user()._id,
                            operatorName : opts.username
                        });

                        opts.success(Meteor.user());
                    }
                });







            }


        });
    }

    changePassword(opts){
        opts = _.extend({
            oldPassword : null,
            newPassword : null,
            confirmPassword : null,
            success : function(){},
            error : function(e){
                alert(e.reason);
            }
        }, opts);

        if(opts.newPassword !== opts.confirmPassword){
            opts.error(new Meteor.Error('-1', 'twice password is not equal'));
            return false;
        }

        Accounts.changePassword(opts.oldPassword, opts.newPassword, function(err){
            if(err){
                opts.error(err);
                return false;
            }

            //update adminUser password
            let _id = Meteor.user()._id;
            KG.DataHelper.getDepModule().AdminUser.getDB().update({_id : _id}, {
                $set : {
                    password : opts.newPassword
                }
            });

            opts.success();
        });
    }

});
