
let Base = KG.getClass('Base');
KG.define('Account', class extends Base{
    defineDBSchema(){
        return Schema.Account;
    }

    defineDB(){

        Meteor.users.attachSchema(new SimpleSchema(this._schema));

        return Meteor.users;
    }

    publishMeteorData(){
        //TODO call Accounts.addAutopublishFields, why not work?


        Meteor.publish('userData', function(){
            //console.log(this.userId);
            return Meteor.users.find({
                _id : this.userId
            }, {
                fields : _.object(_.map(Accounts._autopublishFields.loggedInUser, function(field){
                    return [field, 1];
                }))
            });
        })


    }

    initEnd(){

        if(Meteor.isClient){
            Meteor.subscribe('userData');
        }

    }

    addTestData(){
        //this._db.remove({});
        if(true || this._db.find().count() > 0){
            return;
        }

        let data = [
            {
                profile : {a:1},
                username : 'jacky@calphin.com',
                email : 'jacky@calphin.com',
                password : 'calphin',
                schoolID : '1111111',
                role : 'admin'
            },
            {
                profile : {},
                username : 'liyangwood@gmail.com',
                email : 'liyangwood@gmail.com',
                schoolID : '2222222',
                password : 'aaaaaa',
                role : 'admin'
            }
        ];

        _.each(data, (item)=>{
            Accounts.createUser(item);
        });


    }

    checkIsLogin(){
        return !!Meteor.user() ? Meteor.user() : false;
    }

    defineMeteorMethod(){
        let self = this;
        return {
            createUser(data){
                return Accounts.createUser(data);
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
            username : opts.username
        }, opts.password, function(err){
            if(err){
                opts.error(err);
                return false;
            }

            if(Meteor.user()){

                if(!opts.keepLogin){
                    Accounts._unstoreLoginToken();
                }

                opts.success(Meteor.user());
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

            opts.success();
        });
    }

});
